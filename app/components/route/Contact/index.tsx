import { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Form, useNavigation } from 'react-router';
import { ButtonLink } from '~/components/ui/ButtonLink';
import type { PackageSlug } from '~/data/freelanceServices';
import { ScrollReveal } from '~/components/ui/ScrollReveal/';
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

const packageGuidance: Record<string, { name: string; investment: string; timeline: string; note: string }> = {
  launch: {
    name: 'Launch',
    investment: 'From A$3,000',
    timeline: 'Typically 3–4 weeks',
    note: 'A focused first website for a clear service, offer, or independent business.',
  },
  grow: {
    name: 'Grow',
    investment: 'From A$5,000',
    timeline: 'Typically 6–8 weeks',
    note: 'A larger, editable platform for an established business with more to communicate.',
  },
  custom: {
    name: 'Custom',
    investment: 'From A$7,500',
    timeline: 'Typically 10–16+ weeks',
    note: 'Advanced content, integrations, custom workflows, or product functionality.',
  },
  care: {
    name: 'Care',
    investment: 'From A$99/month',
    timeline: 'Ongoing after launch',
    note: 'Routine maintenance, monitoring, and small content changes for an existing site.',
  },
  'not-sure': {
    name: 'Not sure yet',
    investment: 'We will define the right scope',
    timeline: 'Confirmed after discovery',
    note: 'Bring the goal and the constraints. I will help work out the most useful starting point.',
  },
  '': {
    name: 'Choose a starting point',
    investment: 'Packages start from A$3,000',
    timeline: 'Most projects take 3–16 weeks',
    note: 'Select a package in the brief and this summary will update with the likely shape of the work.',
  },
};

const Contact = memo(({ actionData, formRenderedAt = '', selectedPackage }: ContactProps) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const failedAction = actionData && !actionData.success ? actionData : undefined;
  const submittedValues = failedAction?.values;
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [packageInterest, setPackageInterest] = useState(
    submittedValues?.packageInterest ?? selectedPackage ?? ''
  );
  const selectedGuidance = packageGuidance[packageInterest] ?? packageGuidance[''];
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
      <main className={styles.page} id="contact">
        <section className={styles.hero} aria-labelledby="contact-heading">
          <div className={styles.heroMedia} aria-hidden="true">
            <img src="/images/studiozanetti.png" alt="" />
            <div className={styles.heroScrim} />
          </div>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Start a project</p>
              <h1 id="contact-heading" className={styles.heading}>
                Tell me what needs to <span>work better.</span>
              </h1>
              <p className={styles.description}>
                Bring the rough idea, the frustrating current site, or the ambitious product
                brief. You do not need to solve the project before getting in touch.
              </p>
            </div>
            <div className={styles.heroAside}>
              <span>Typical reply</span>
              <strong>Within two business days</strong>
              <p>No hard sell. No obligation to proceed.</p>
            </div>
          </div>
        </section>

        <ScrollReveal as="section" className={styles.expectationBand} aria-label="What to expect">
          <ol>
            <li><span>01</span><strong>Send the useful context</strong><p>Goals, timing, budget, and what is currently getting in the way.</p></li>
            <li><span>02</span><strong>Get a direct response</strong><p>I will reply personally with useful questions and a likely path forward.</p></li>
            <li><span>03</span><strong>Decide without pressure</strong><p>If the fit is right, I will turn the conversation into a clear written proposal.</p></li>
          </ol>
        </ScrollReveal>

        <section className={styles.briefSection} aria-labelledby="brief-heading">
          <ScrollReveal className={styles.formColumn}>
            <div className={styles.formHeader}>
              <p className={styles.eyebrow}>Project brief</p>
              <h2 id="brief-heading">Give me enough to think with.</h2>
              <p>Required fields are marked with an asterisk. Plain language is perfect.</p>
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

              <input type="hidden" name="formRenderedAt" value={formRenderedAt} />

              <fieldset className={styles.formStage}>
                <legend><span>01</span> Who should I reply to?</legend>

              <div className={styles.fieldGrid}>
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
              </fieldset>

              <fieldset className={styles.formStage}>
                <legend><span>02</span> What are we shaping?</legend>

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
                    value={packageInterest}
                    onChange={(event) => setPackageInterest(event.target.value)}
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
              </fieldset>

              <fieldset className={styles.formStage}>
                <legend><span>03</span> What would success look like?</legend>

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
                  placeholder="What should the new experience help your customers understand or do? What is not working today?"
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
              </fieldset>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send project brief'}
              </button>
              <p className={styles.privacyNote}>
                Your details are used only to respond to this enquiry. No mailing list, no spam.
              </p>
            </Form>
          </ScrollReveal>

          <ScrollReveal as="aside" className={styles.contextColumn} aria-label="Project context and direct contact">
            <div className={styles.packageSummary} aria-live="polite">
              <p className={styles.summaryLabel}>Your selected starting point</p>
              <span className={styles.summaryIndex}>↳</span>
              <h2>{selectedGuidance.name}</h2>
              <p>{selectedGuidance.note}</p>
              <dl>
                <div><dt>Investment</dt><dd>{selectedGuidance.investment}</dd></div>
                <div><dt>Indicative timing</dt><dd>{selectedGuidance.timeline}</dd></div>
              </dl>
              <ButtonLink to="/pricing" variant="secondary">Compare package details</ButtonLink>
            </div>

            <div className={styles.nextSteps}>
              <p className={styles.summaryLabel}>After you press send</p>
              <ol>
                <li><span>1</span>I read the brief personally.</li>
                <li><span>2</span>I reply with questions or a suggested next step.</li>
                <li><span>3</span>If useful, we arrange a short discovery conversation.</li>
              </ol>
            </div>

            <div className={styles.directContact}>
              <p className={styles.summaryLabel}>Prefer a direct channel?</p>
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
                  Email Mitchell
                </button>
                <ButtonLink
                  href="https://linkedin.com/in/mitchellmartinezadl"
                  variant="secondary"
                  external
                  className={styles.secondaryCtaLink}
                  aria-label="Connect with Mitchell on LinkedIn (opens in new tab)"
                >
                  LinkedIn
                </ButtonLink>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
      {emailModal}
    </>
  );
});

Contact.displayName = 'Contact';

export { Contact };
