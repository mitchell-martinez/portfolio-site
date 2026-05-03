import type { RefObject } from 'react';
import { memo } from 'react';
import { Form, useNavigation } from 'react-router';
import { ButtonLink } from '~/components/ui/ButtonLink';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import type { ContactActionData } from '~/routes/contact';
import styles from './Contact.module.scss';

type ContactProps = {
  actionData?: ContactActionData;
};

const Contact = memo(({ actionData }: ContactProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className={`${styles.contact} ${isIntersecting ? styles.visible : ''}`}
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>Get In Touch</p>
            <h2 id="contact-heading" className={styles.heading}>
              Let's build a <span className={styles.headingAccent}>great</span> web experience
              together
            </h2>
            <p className={styles.description}>
              Whether you have a project in mind, want to collaborate, or just want to say hello -
              my inbox is always open.
            </p>
            <p className={styles.description}>
              You can either reach out to me on{' '}
              <a href="mailto:info@mitchellmartinez.tech" className={styles.inlineLink}>
                info@mitchellmartinez.tech
              </a>
              , connect with me on{' '}
              <a
                href="https://linkedin.com/in/mitchellmartinezadl"
                className={styles.inlineLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              , or fill out the form below. I'll get back to you as soon as possible!
            </p>

            <div className={styles.ctaGroup} role="group" aria-label="Contact options">
              <ButtonLink
                href="mailto:info@mitchellmartinez.tech"
                variant="primary"
                aria-label="Send Mitchell an email at info@mitchellmartinez.tech"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Send an Email
              </ButtonLink>
              <ButtonLink
                href="https://linkedin.com/in/mitchellmartinezadl"
                variant="secondary"
                external
                aria-label="Connect with Mitchell on LinkedIn (opens in new tab)"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                Connect on LinkedIn
              </ButtonLink>
            </div>

            {actionData && 'success' in actionData && actionData.success && (
              <div className={styles.successBanner} role="status">
                Message sent! I'll get back to you soon
              </div>
            )}

            {actionData && !actionData.success && (
              <div className={styles.errorBanner} role="alert">
                {actionData.error}
              </div>
            )}

            <Form method="post" className={styles.form} noValidate>
              {/* Honeypot field - hidden from real users */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
                <label htmlFor="company_url">Do not fill this out</label>
                <input
                  type="text"
                  id="company_url"
                  name="company_url"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-name" className={styles.label}>
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-email" className={styles.label}>
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  className={styles.input}
                  aria-invalid={
                    actionData && !actionData.success && actionData.fieldErrors?.email
                      ? true
                      : undefined
                  }
                  aria-describedby={
                    actionData && !actionData.success && actionData.fieldErrors?.email
                      ? 'email-error'
                      : undefined
                  }
                />
                {actionData && !actionData.success && actionData.fieldErrors?.email && (
                  <p id="email-error" className={styles.fieldError}>
                    {actionData.fieldErrors.email}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-enquiry-type" className={styles.label}>
                  Enquiry Type
                </label>
                <select
                  id="contact-enquiry-type"
                  name="enquiryType"
                  className={styles.input}
                  defaultValue=""
                >
                  <option value="">Select an enquiry type (optional)</option>
                  <option value="Website Development">Website Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Design & Marketing">Design & Marketing</option>
                  <option value="Employment Offer">Employment Offer</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Speaking Engagement">Speaking Engagement</option>
                  <option value="General Consulting">General Consulting</option>
                  <option value="General Enquiry">General Enquiry</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-message" className={styles.label}>
                  Message <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  maxLength={5000}
                  className={`${styles.input} ${styles.textarea}`}
                  aria-invalid={
                    actionData && !actionData.success && actionData.fieldErrors?.message
                      ? true
                      : undefined
                  }
                  aria-describedby={
                    actionData && !actionData.success && actionData.fieldErrors?.message
                      ? 'message-error'
                      : undefined
                  }
                />
                {actionData && !actionData.success && actionData.fieldErrors?.message && (
                  <p id="message-error" className={styles.fieldError}>
                    {actionData.fieldErrors.message}
                  </p>
                )}
              </div>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </button>
            </Form>
          </div>

          <div className={styles.decoration} aria-hidden="true">
            <div className={styles.decorCircle1} />
            <div className={styles.decorCircle2} />
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export { Contact };
