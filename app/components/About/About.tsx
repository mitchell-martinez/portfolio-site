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
            <div className={styles.avatar} aria-label="Mitchell Martinez initials avatar" role="img">
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
                I'm Mitchell, a frontend engineer with a passion for building beautiful,
                performant web applications that users love. I specialize in React and TypeScript,
                bringing together technical excellence and thoughtful design.
              </p>
              <p>
                My approach combines clean architecture with meticulous attention to detail —
                from pixel-perfect animations to accessible, inclusive interfaces that work
                for everyone.
              </p>
              <p>
                When I'm not pushing pixels, I'm exploring the intersection of design and
                engineering, building side projects, and staying at the cutting edge of
                frontend technology.
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
