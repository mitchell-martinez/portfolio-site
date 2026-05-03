import type { RefObject } from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const contactEmail = 'info@mitchellmartinez.tech';
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isEmailModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEmailModalOpen(false);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [isEmailModalOpen]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  };

  const emailModal =
    isEmailModalOpen && typeof document !== 'undefined'
      ? createPortal(
          <div
            className={styles.emailModalBackdrop}
            role="presentation"
            onClick={() => setIsEmailModalOpen(false)}
          >
            <div
              ref={modalRef}
              className={styles.emailModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="email-modal-title"
              aria-describedby="email-modal-description"
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.emailModalHeader}>
                <div>
                  <p className={styles.emailModalEyebrow}>Direct Contact</p>
                  <h3 id="email-modal-title" className={styles.emailModalTitle}>
                    Email Mitchell
                  </h3>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className={styles.modalCloseButton}
                  onClick={() => setIsEmailModalOpen(false)}
                  aria-label="Close email options"
                >
                  <svg
                    className={styles.modalCloseIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 4l8 8M12 4 4 12"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <p id="email-modal-description" className={styles.emailModalText}>
                Use this address directly, or open your mail app with one click.
              </p>

              <p className={styles.emailAddress}>{contactEmail}</p>

              <div className={styles.emailModalActions}>
                <button
                  type="button"
                  className={styles.copyButton}
                  onClick={handleCopyEmail}
                  disabled={copyState === 'copied'}
                  aria-label={
                    copyState === 'copied'
                      ? 'Email copied to clipboard'
                      : 'Copy email address to clipboard'
                  }
                >
                  {copyState === 'copied' ? 'Email Copied' : 'Copy Email'}
                </button>
                <a
                  href={`mailto:${contactEmail}`}
                  className={styles.sendNowButton}
                  aria-label="Open your email app to send an email to Mitchell"
                >
                  Send Email Now
                </a>
              </div>

              {copyState === 'failed' && (
                <p className={styles.copyFeedbackError} role="alert">
                  Could not copy automatically. You can still copy it manually.
                </p>
              )}
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
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

            <div className={styles.ctaPanel}>
              <p className={styles.ctaTitle}>Prefer a quick chat?</p>
              <p className={styles.ctaDescription}>
                Use one of these direct channels, or send a full brief with the form below.
              </p>
              <div className={styles.ctaGroup} role="group" aria-label="Contact options">
                <button
                  type="button"
                  className={styles.emailCtaButton}
                  onClick={() => {
                    setCopyState('idle');
                    setIsEmailModalOpen(true);
                  }}
                  aria-label="Open email options for Mitchell"
                >
                  <span className={styles.ctaIconBadge} aria-hidden="true">
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
                  </span>
                  Email Options
                </button>
                <ButtonLink
                  href="https://linkedin.com/in/mitchellmartinezadl"
                  variant="secondary"
                  external
                  className={styles.secondaryCtaLink}
                  aria-label="Connect with Mitchell on LinkedIn (opens in new tab)"
                >
                  <span className={styles.ctaIconBadge} aria-hidden="true">
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
                  </span>
                  LinkedIn
                </ButtonLink>
              </div>
            </div>

            <div className={styles.formDivider} aria-hidden="true" />

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
                  Name <span className={styles.required}>*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
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
                  autoComplete="email"
                  inputMode="email"
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
                  autoComplete="on"
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

              <div className={styles.checkboxField}>
                <input
                  id="contact-send-copy"
                  name="sendCopy"
                  type="checkbox"
                  value="yes"
                  className={styles.checkbox}
                />
                <label htmlFor="contact-send-copy" className={styles.checkboxLabel}>
                  Send me a copy of this enquiry by email
                </label>
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
      {emailModal}
    </>
  );
});

Contact.displayName = 'Contact';

export { Contact };
