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
            <p className={styles.tagline}>
              Website design and development for Australian businesses
            </p>
          </div>

          <nav className={styles.links} aria-label="Footer navigation">
            <a
              href="mailto:info@mitchellmartinez.tech"
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
              href="/services"
              className={styles.link}
              aria-label="Explore Mitchell's website design and development services"
            >
              Services
            </a>
            <a
              href="/pricing"
              className={styles.link}
              aria-label="Compare Mitchell's website packages and pricing"
            >
              Pricing
            </a>
            <a
              href="/about"
              className={styles.link}
              aria-label="Find out more about Mitchell on the About page"
            >
              About Me
            </a>
            <a
              href="/skills"
              className={styles.link}
              aria-label="View Mitchell's skills and expertise on the Skills page"
            >
              Skills
            </a>
            <a
              href="/blog"
              className={styles.link}
              aria-label="Articles page with posts on frontend development and design"
            >
              Articles
            </a>
            <a
              href="/projects"
              className={styles.link}
              aria-label="View all projects on the Projects page"
            >
              Projects
            </a>
            <a
              href="/contact"
              className={styles.link}
              aria-label="Contact Mitchell via the Contact page"
            >
              Contact Me
            </a>
          </nav>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            <p>© {currentYear} Mitchell Martinez. All rights reserved.</p>
            <p>ABN 40 927 243 914</p>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export { Footer };
