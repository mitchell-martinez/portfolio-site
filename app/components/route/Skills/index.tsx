import type { RefObject } from 'react';
import { memo } from 'react';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import { SkillCard } from './SkillCard';
import styles from './Skills.module.scss';
import skillsData from './skillsData.json';

const Skills = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05, triggerOnce: true });

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className={`${styles.skills} ${isIntersecting ? styles.visible : ''}`}
      id="skills"
      aria-labelledby="skills-heading"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>What I Do</p>
          <h2 id="skills-heading" className={styles.heading}>
            Skills & Expertise
          </h2>
          <p className={styles.subheading}>
            A curated toolkit of technologies I use to build exceptional digital products.
          </p>
        </div>

        <ul className={styles.grid} role="list" aria-label="Skills list">
          {skillsData.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export { Skills };
