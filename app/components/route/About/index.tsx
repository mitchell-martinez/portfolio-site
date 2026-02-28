import { memo } from 'react';
import type { RefObject } from 'react';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import styles from './About.module.scss';

const About = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className={`${styles.about} ${isIntersecting ? styles.visible : ''}`}
      id="about"
      aria-labelledby="about-heading"
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.imageWrapper}>
            <div
              className={styles.avatar}
              aria-label="Mitchell Martinez initials avatar"
              role="img"
            >
              <span className={styles.initials}>MM</span>
            </div>
            <div className={styles.avatarDecoration} aria-hidden="true" />
          </div>

          <div className={styles.content}>
            <p className={styles.eyebrow}>About Me</p>
            <h2 id="about-heading" className={styles.heading}>
              Crafting digital experiences that matter
            </h2>
            <div className={styles.body}>
              <p>
                G'day! I'm Mitch, a frontend engineer with a passion for building beautiful,
                performant web applications that users love. I specialise in frontend web
                development, primarily in React.
              </p>
              <p>
                My approach combines great design and excellent user experiences with top-tier
                engineering applications. I love building beautiful web applications that work well,
                are straightforward to use, and don't piss off the customer. The customer experience
                is top of mind in every single thing I do.
              </p>
              <p>
                Keeping up with the right latest technologies is essential in our ever-changing
                world. I am well-versed in AI, modern web development practices, and emerging
                technologies. I make time to keep my skills up to date to ensure customers get the
                best experience.
              </p>
              <p>
                I believe technology can be a powerful force for bringing people together, and
                uplifting us all - when used right. Outside of engineering, I love hiking, keeping
                fit, music, and languages. My favourite places to hang out are my local libraries
                and pubs.
              </p>
              <p>
                Interested in collaborating? Flick me a LinkedIn message or email. I'd love to work
                with you on something great!
              </p>
            </div>

            <div className={styles.stats} role="list" aria-label="Career highlights">
              <div className={styles.stat} role="listitem">
                <span className={styles.statNumber}>5+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
              <div className={styles.stat} role="listitem">
                <span className={styles.statNumber}>20+</span>
                <span className={styles.statLabel}>Projects Built</span>
              </div>
              <div className={styles.stat} role="listitem">
                <span className={styles.statNumber}>∞</span>
                <span className={styles.statLabel}>Lines of Code</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export { About };
