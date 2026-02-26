import { memo } from 'react';
import styles from './Footer.module.scss';

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <span className={styles.logo}>MM</span>
            <p className={styles.tagline}>Building beautiful digital experiences.</p>
          </div>

          <nav className={styles.links} aria-label="Footer navigation">
            <a
              href="mailto:mitchell@mitchellmartinez.tech"
              className={styles.link}
              aria-label="Email Mitchell"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/mitchellmartinezadl"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mitchell's LinkedIn profile (opens in new tab)"
            >
              LinkedIn
            </a>
            <a
              href="https://budgeto.app"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Budgeto app (opens in new tab)"
            >
              Budgeto
            </a>
            <a
              href="https://fogsv.org.au"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FOG SV website (opens in new tab)"
            >
              FOG SV
            </a>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Mitchell Martinez. All rights reserved.
          </p>
          <p className={styles.madeWith}>
            Made with React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export { Footer };
