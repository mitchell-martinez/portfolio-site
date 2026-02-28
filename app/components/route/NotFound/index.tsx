import { memo } from 'react';
import { ButtonLink } from '~/components/ui/ButtonLink/';
import styles from './NotFound.module.scss';

const NotFound = memo(() => (
  <section className={styles.notFound} aria-labelledby="not-found-heading">
    <div className={styles.background} aria-hidden="true">
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.grid} />
    </div>

    <div className={styles.content}>
      <p className={styles.code}>404</p>
      <h1 id="not-found-heading" className={styles.heading}>
        Page not found
      </h1>
      <p className={styles.description}>
        Whoopsie! The page you're looking for doesn't exist.
        <br />
        It's possible I haven't built it yet, or it might be an old page that I've deprecated.
        <br />
        <br />
        Let's get you back to where you want to go!
      </p>

      <div className={styles.ctaGroup} role="group" aria-label="Navigation options">
        <ButtonLink to="/" variant="primary" aria-label="Go back to the homepage">
          Back to Home
        </ButtonLink>
        <ButtonLink to="/contact" variant="secondary" aria-label="Go to the contact page">
          Contact Me
        </ButtonLink>
      </div>
    </div>
  </section>
));

NotFound.displayName = 'NotFound';

export { NotFound };
