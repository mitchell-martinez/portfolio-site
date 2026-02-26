import type { RefObject } from 'react';
import { memo } from 'react';
import { CtaLink } from '~/components/ui/CtaLink/CtaLink';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import styles from './Contact.module.scss';

const Contact = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

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
              Let's build something <span className={styles.headingAccent}>remarkable</span>
            </h2>
            <p className={styles.description}>
              Whether you have a project in mind, want to collaborate, or just want to say hello —
              my inbox is always open. I'll get back to you as soon as possible.
            </p>

            <div className={styles.ctaGroup} role="group" aria-label="Contact options">
              <CtaLink
                href="mailto:contact@mitchellmartinez.tech"
                variant="primary"
                aria-label="Send Mitchell an email at contact@mitchellmartinez.tech"
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
              </CtaLink>
              <CtaLink
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
              </CtaLink>
            </div>
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
