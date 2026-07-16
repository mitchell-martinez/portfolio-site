import type { RefObject } from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Form, useNavigation } from 'react-router';
import { ButtonLink } from '~/components/ui/ButtonLink';
import type { PackageSlug } from '~/data/freelanceServices';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import type { ContactActionData } from '~/routes/contact';
import
    {
        budgetOptions,
        launchWindowOptions,
        packageInterestOptions,
        projectTypeOptions,
        referralSourceOptions,
    } from '~/utils/contactForm';
import styles from './Contact.module.scss';

type ContactProps = {
  actionData?: ContactActionData;
  formRenderedAt?: string;
  selectedPackage?: PackageSlug;
};

const Contact = memo(({ actionData, formRenderedAt = '', selectedPackage }: ContactProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const failedAction = actionData && !actionData.success ? actionData : undefined;
  const submittedValues = failedAction?.values;
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
                Tell me what you are building, what is getting in the way, and when you would like
                to launch. You do not need a finished brief before getting in touch.
            </p>

            <div className={styles.ctaPanel}>
              <p className={styles.ctaTitle}>Prefer a quick chat?</p>
              <p className={styles.ctaDescription}>
                Use one of these direct channels, or send a full brief with the form below.
              </p>
              <div
                className={`${styles.ctaGroup} ${styles.equalWidthGroup}`}
                role="group"
                aria-label="Contact options"
              >
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

              <input type="hidden" name="formRenderedAt" value={formRenderedAt} />

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
                  defaultValue={submittedValues?.name}
                  aria-invalid={failedAction?.fieldErrors?.name ? true : undefined}
                  aria-describedby={failedAction?.fieldErrors?.name ? 'name-error' : undefined}
                />
                {failedAction?.fieldErrors?.name && (
                  <p id="name-error" className={styles.fieldError}>
                    {failedAction.fieldErrors.name}
                  </p>
                )}
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
                  defaultValue={submittedValues?.email}
                  aria-invalid={failedAction?.fieldErrors?.email ? true : undefined}
                  aria-describedby={failedAction?.fieldErrors?.email ? 'email-error' : undefined}
                />
                {failedAction?.fieldErrors?.email && (
                  <p id="email-error" className={styles.fieldError}>
                    {failedAction.fieldErrors.email}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-organisation" className={styles.label}>
                  Business or organisation
                </label>
                <input
                  id="contact-organisation"
                  name="organisation"
                  type="text"
                  autoComplete="organization"
                  maxLength={120}
                  className={styles.input}
                  defaultValue={submittedValues?.organisation}
                  aria-invalid={failedAction?.fieldErrors?.organisation ? true : undefined}
                  aria-describedby={
                    failedAction?.fieldErrors?.organisation ? 'organisation-error' : undefined
                  }
                />
                {failedAction?.fieldErrors?.organisation && (
                  <p id="organisation-error" className={styles.fieldError}>
                    {failedAction.fieldErrors.organisation}
                  </p>
                )}
              </div>

              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label htmlFor="contact-project-type" className={styles.label}>
                    Project type <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="contact-project-type"
                    name="projectType"
                    required
                    className={styles.input}
                    defaultValue={submittedValues?.projectType ?? ''}
                    aria-invalid={failedAction?.fieldErrors?.projectType ? true : undefined}
                    aria-describedby={
                      failedAction?.fieldErrors?.projectType ? 'project-type-error' : undefined
                    }
                  >
                    <option value="">Select a project type</option>
                    {projectTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {failedAction?.fieldErrors?.projectType && (
                    <p id="project-type-error" className={styles.fieldError}>
                      {failedAction.fieldErrors.projectType}
                    </p>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-package" className={styles.label}>
                    Package interest <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="contact-package"
                    name="packageInterest"
                    required
                    className={styles.input}
                    defaultValue={submittedValues?.packageInterest ?? selectedPackage ?? ''}
                    aria-invalid={failedAction?.fieldErrors?.packageInterest ? true : undefined}
                    aria-describedby={
                      failedAction?.fieldErrors?.packageInterest ? 'package-error' : undefined
                    }
                  >
                    <option value="">Select a package</option>
                    {packageInterestOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {failedAction?.fieldErrors?.packageInterest && (
                    <p id="package-error" className={styles.fieldError}>
                      {failedAction.fieldErrors.packageInterest}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label htmlFor="contact-budget" className={styles.label}>
                    Approximate budget <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="contact-budget"
                    name="budget"
                    required
                    className={styles.input}
                    defaultValue={submittedValues?.budget ?? ''}
                    aria-invalid={failedAction?.fieldErrors?.budget ? true : undefined}
                    aria-describedby={failedAction?.fieldErrors?.budget ? 'budget-error' : undefined}
                  >
                    <option value="">Select a budget range</option>
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {failedAction?.fieldErrors?.budget && (
                    <p id="budget-error" className={styles.fieldError}>
                      {failedAction.fieldErrors.budget}
                    </p>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-launch-window" className={styles.label}>
                    Desired launch <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="contact-launch-window"
                    name="launchWindow"
                    required
                    className={styles.input}
                    defaultValue={submittedValues?.launchWindow ?? ''}
                    aria-invalid={failedAction?.fieldErrors?.launchWindow ? true : undefined}
                    aria-describedby={
                      failedAction?.fieldErrors?.launchWindow ? 'launch-window-error' : undefined
                    }
                  >
                    <option value="">Select a timeframe</option>
                    {launchWindowOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {failedAction?.fieldErrors?.launchWindow && (
                    <p id="launch-window-error" className={styles.fieldError}>
                      {failedAction.fieldErrors.launchWindow}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-current-website" className={styles.label}>
                  Current website
                </label>
                <input
                  id="contact-current-website"
                  name="currentWebsite"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="https://example.com"
                  maxLength={500}
                  className={styles.input}
                  defaultValue={submittedValues?.currentWebsite}
                  aria-invalid={failedAction?.fieldErrors?.currentWebsite ? true : undefined}
                  aria-describedby={
                    failedAction?.fieldErrors?.currentWebsite ? 'current-website-error' : undefined
                  }
                />
                {failedAction?.fieldErrors?.currentWebsite && (
                  <p id="current-website-error" className={styles.fieldError}>
                    {failedAction.fieldErrors.currentWebsite}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-referral-source" className={styles.label}>
                  How did you find me?
                </label>
                <select
                  id="contact-referral-source"
                  name="referralSource"
                  className={styles.input}
                  defaultValue={submittedValues?.referralSource ?? ''}
                  aria-invalid={failedAction?.fieldErrors?.referralSource ? true : undefined}
                  aria-describedby={
                    failedAction?.fieldErrors?.referralSource ? 'referral-source-error' : undefined
                  }
                >
                  <option value="">Select an option (optional)</option>
                  {referralSourceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {failedAction?.fieldErrors?.referralSource && (
                  <p id="referral-source-error" className={styles.fieldError}>
                    {failedAction.fieldErrors.referralSource}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-message" className={styles.label}>
                  Project goals and details <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  maxLength={5000}
                  autoComplete="on"
                  className={`${styles.input} ${styles.textarea}`}
                  defaultValue={submittedValues?.message}
                  aria-invalid={failedAction?.fieldErrors?.message ? true : undefined}
                  aria-describedby={failedAction?.fieldErrors?.message ? 'message-error' : undefined}
                />
                {failedAction?.fieldErrors?.message && (
                  <p id="message-error" className={styles.fieldError}>
                    {failedAction.fieldErrors.message}
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
                  defaultChecked={submittedValues?.sendCopy}
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
