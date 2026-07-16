import type { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from 'react-router';
import { useActionData, useLoaderData } from 'react-router';
import { Contact } from '~/components/route/Contact/';
import
    {
        formatContactEmail,
        getProjectTypeLabel,
        parseContactFormData,
        parsePackageInterest,
        type ContactFormValues,
    } from '~/utils/contactForm';
import { checkRateLimit } from '~/utils/rateLimit.server';
import { buildSocialMeta } from '~/utils/socialMeta';

let transporter: Transporter | undefined;
const MIN_SUBMISSION_TIME_MS = 2500;
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000;

function getClientIp(request: Request) {
  return (
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}

function isSuspiciousSubmission(formRenderedAt: string) {
  const renderedAt = Number(formRenderedAt);

  if (!Number.isFinite(renderedAt) || renderedAt <= 0) {
    return true;
  }

  const elapsedMs = Date.now() - renderedAt;
  return elapsedMs < MIN_SUBMISSION_TIME_MS || elapsedMs > MAX_FORM_AGE_MS;
}

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST || 'smtp.zoho.com';
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === 'true'
    : port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const oauthClientId = process.env.SMTP_OAUTH2_CLIENT_ID;
  const oauthClientSecret = process.env.SMTP_OAUTH2_CLIENT_SECRET;
  const oauthRefreshToken = process.env.SMTP_OAUTH2_REFRESH_TOKEN;
  const oauthAccessUrl =
    process.env.SMTP_OAUTH2_ACCESS_URL || 'https://accounts.zoho.com/oauth/v2/token';
  const useOAuth2 = Boolean(oauthClientId && oauthClientSecret && oauthRefreshToken);

  if (!user) {
    throw new Error('SMTP user is missing. Set SMTP_USER.');
  }

  if (!useOAuth2 && !pass) {
    throw new Error(
      'No SMTP auth method configured. Set SMTP_PASS or SMTP_OAUTH2_CLIENT_ID/SECRET/REFRESH_TOKEN.'
    );
  }

  const auth = useOAuth2
    ? {
        type: 'OAuth2' as const,
        user,
        clientId: oauthClientId!,
        clientSecret: oauthClientSecret!,
        refreshToken: oauthRefreshToken!,
        accessUrl: oauthAccessUrl,
      }
    : {
        user,
        pass: pass!,
      };

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth,
  });

  return transporter;
}

export const meta: MetaFunction = () =>
  buildSocialMeta({
    title: 'Start a Website Project - Mitchell Martinez',
    description:
      'Tell me about your website, redesign, CMS or web app project, including your goals, budget and preferred launch window.',
    url: '/contact',
  });

export type ContactActionData =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string>;
      values?: ContactFormValues;
    };

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  return Response.json({
    formRenderedAt: Date.now().toString(),
    selectedPackage: parsePackageInterest(url.searchParams.get('package')),
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const ip = getClientIp(request);

  const { allowed, retryAfterSeconds } = checkRateLimit(ip);
  if (!allowed) {
    return Response.json(
      {
        success: false,
        error: `Too many requests. Please try again in ${Math.ceil((retryAfterSeconds ?? 3600) / 60)} minutes.`,
      } satisfies ContactActionData,
      { status: 429 }
    );
  }

  const formData = await request.formData();
  const { values, fieldErrors } = parseContactFormData(formData);
  const formRenderedAt = String(formData.get('formRenderedAt') ?? '');

  if (Object.keys(fieldErrors).length > 0) {
    return Response.json(
      {
        success: false,
        error: 'Please fix the errors below.',
        fieldErrors,
        values,
      } satisfies ContactActionData,
      { status: 400 }
    );
  }

  // Honeypot - hidden field that bots will fill
  const honeypot = String(formData.get('company_url') ?? '');
  if (honeypot || isSuspiciousSubmission(formRenderedAt)) {
    // Silently succeed so bots think it worked
    return Response.json({ success: true } satisfies ContactActionData);
  }

  const fromEmail = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;
  const fromName = process.env.CONTACT_FROM_NAME || 'Portfolio Contact Form';
  const toEmail = process.env.CONTACT_TO_EMAIL || 'info@mitchellmartinez.tech';
  const senderName = values.name.replace(/[\r\n]+/g, ' ');
  const enquiryLabel = getProjectTypeLabel(values.projectType);
  const enquiryText = formatContactEmail(values);

  try {
    const transporter = getTransporter();

    const mailJobs = [
      transporter.sendMail({
        from: fromEmail ? `${fromName} <${fromEmail}>` : fromName,
        to: toEmail,
        replyTo: values.email,
        subject: `[${enquiryLabel}] New enquiry from ${senderName}`,
        text: enquiryText,
      }),
    ];

    if (values.sendCopy) {
      mailJobs.push(
        transporter.sendMail({
          from: fromEmail ? `${fromName} <${fromEmail}>` : fromName,
          to: values.email,
          replyTo: toEmail,
          subject: `Copy of your enquiry to Mitchell Martinez`,
          text:
            `Hi ${senderName},\n\n` +
            `Thanks for getting in touch. This is a copy of the enquiry you submitted through the website.\n\n` +
            `${enquiryText}\n\n` +
            `Mitchell will reply as soon as possible.`,
        })
      );
    }

    await Promise.all(mailJobs);
  } catch {
    return Response.json(
      {
        success: false,
        error: 'Failed to send message. Please try again later.',
      } satisfies ContactActionData,
      { status: 500 }
    );
  }

  return Response.json({ success: true } satisfies ContactActionData);
}

export default function ContactRoute() {
  const { formRenderedAt, selectedPackage } = useLoaderData<typeof loader>();
  const actionData = useActionData<ContactActionData>();
  return (
    <Contact
      actionData={actionData}
      formRenderedAt={formRenderedAt}
      selectedPackage={selectedPackage ?? undefined}
    />
  );
}
