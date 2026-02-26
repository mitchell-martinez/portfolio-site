import type { RefObject } from 'react';
import { memo } from 'react';
import { CtaLink } from '~/components/ui/CtaLink/CtaLink';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import styles from './Hero.module.scss';

const Hero = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className={`${styles.hero} ${isIntersecting ? styles.visible : ''}`}
      aria-label="Hero section"
      id="hero"
    >
      <div className={styles.background} aria-hidden="true">
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gradientOrb3} />
        <div className={styles.grid} />
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>Hello, I'm</p>
        <h1 className={styles.name}>
          <span className={styles.firstName}>Mitchell</span>
          <span className={styles.lastName}> Martinez</span>
        </h1>
        <p className={styles.tagline}>
          Frontend Engineer.{' '}
          <span className={styles.taglineHighlight}>Building beautiful digital experiences.</span>
        </p>
        <p className={styles.description}>
          Specializing in React, TypeScript, and modern web technologies to craft performant,
          accessible, and visually stunning applications.
        </p>

        <div className={styles.ctaGroup} role="group" aria-label="Primary actions">
          <CtaLink
            href="mailto:contact@mitchellmartinez.tech"
            variant="primary"
            aria-label="Send Mitchell an email"
          >
            Get in Touch
          </CtaLink>
          <CtaLink
            href="https://linkedin.com/in/mitchellmartinezadl"
            variant="secondary"
            external
            aria-label="Visit Mitchell's LinkedIn profile (opens in new tab)"
          >
            LinkedIn
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </CtaLink>
        </div>

        <div className={styles.scrollIndicator} aria-hidden="true">
          <div className={styles.scrollDot} />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export { Hero };
