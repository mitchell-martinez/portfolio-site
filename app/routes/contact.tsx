import type { ActionFunctionArgs, MetaFunction } from 'react-router';
import { useActionData } from 'react-router';
import { Resend } from 'resend';
import { Contact } from '~/components/route/Contact/';
import { checkRateLimit } from '~/utils/rateLimit.server';

let resend: Resend;
function getResend() {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
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

  const { error } = await getResend().emails.send({
    from: 'Portfolio Contact Form <noreply@mitchellmartinez.tech>',
    to: ['info@mitchellmartinez.tech'],
    replyTo: email,
    subject: `[${enquiryType || 'Enquiry'}] New message from ${name || 'Anonymous'}`,
    text: `Name: ${name || 'Not provided'}\nEmail: ${email}\nEnquiry Type: ${enquiryType || 'Not specified'}\n\n${message}`,
  });

  if (error) {
    console.error('Resend error:', error);
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
