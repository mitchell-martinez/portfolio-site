import type { Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';
import type { ActionFunctionArgs, MetaFunction } from 'react-router';
import { useActionData } from 'react-router';
import { Contact } from '~/components/route/Contact/';
import { checkRateLimit } from '~/utils/rateLimit.server';

let transporter: Transporter | undefined;

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

export const meta: MetaFunction = () => [
  { title: 'Contact - Mitchell Martinez' },
  {
    name: 'description',
    content: 'Get in touch with Mitchell Martinez - send an email or connect on LinkedIn.',
  },
  { property: 'og:title', content: 'Contact - Mitchell Martinez' },
  {
    property: 'og:description',
    content: 'Reach out to discuss projects, collaborations, or just to say hello.',
  },
];

export type ContactActionData =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string> };

export async function action({ request }: ActionFunctionArgs) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

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
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const enquiryType = String(formData.get('enquiryType') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();
  const sendCopy = formData.get('sendCopy') === 'yes';

  const fieldErrors: Record<string, string> = {};
  if (!email) fieldErrors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = 'Invalid email address.';
  if (!message) fieldErrors.message = 'Message is required.';
  else if (message.length > 5000) fieldErrors.message = 'Message must be under 5,000 characters.';

  if (Object.keys(fieldErrors).length > 0) {
    return Response.json(
      {
        success: false,
        error: 'Please fix the errors below.',
        fieldErrors,
      } satisfies ContactActionData,
      { status: 400 }
    );
  }

  // Honeypot - hidden field that bots will fill
  const honeypot = String(formData.get('company_url') ?? '');
  if (honeypot) {
    // Silently succeed so bots think it worked
    return Response.json({ success: true } satisfies ContactActionData);
  }

  const fromEmail = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;
  const fromName = process.env.CONTACT_FROM_NAME || 'Portfolio Contact Form';
  const toEmail = process.env.CONTACT_TO_EMAIL || 'info@mitchellmartinez.tech';
  const senderName = name || 'Anonymous';
  const enquiryLabel = enquiryType || 'Enquiry';
  const enquiryText = `Name: ${senderName}\nEmail: ${email}\nEnquiry Type: ${enquiryType || 'Not specified'}\n\n${message}`;

  try {
    const transporter = getTransporter();

    const mailJobs = [
      transporter.sendMail({
        from: fromEmail ? `${fromName} <${fromEmail}>` : fromName,
        to: toEmail,
        replyTo: email,
        subject: `[${enquiryLabel}] New enquiry from ${senderName}`,
        text: enquiryText,
      }),
    ];

    if (sendCopy) {
      mailJobs.push(
        transporter.sendMail({
          from: fromEmail ? `${fromName} <${fromEmail}>` : fromName,
          to: email,
          replyTo: toEmail,
          subject: `Copy of your enquiry to Mitchell Martinez`,
          text:
            `Hi ${name || 'there'},\n\n` +
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
  const actionData = useActionData<ContactActionData>();
  return <Contact actionData={actionData} />;
}
