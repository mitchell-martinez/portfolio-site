import type { RefObject } from 'react';
import { memo } from 'react';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import { SkillCard } from './SkillCard';
import styles from './Skills.module.scss';
import skillsData from './skillsData.json';
import type { Skill } from './types';

const typedSkills = skillsData as Skill[];

const skillGroups = [
  {
    id: 'technical',
    title: 'Technical Skills',
    description: 'Engineering tools and technologies used to design, build, and ship products',
    skills: typedSkills.filter((skill) => skill.category === 'technical'),
    ariaLabel: 'Technical skills list',
    defaultOpen: false,
  },
  {
    id: 'business',
    title: 'Business Skills',
    description: 'Communication, collaboration, and leadership strengths that drive outcomes',
    skills: typedSkills.filter((skill) => skill.category === 'business'),
    ariaLabel: 'Business skills list',
    defaultOpen: false,
  },
];

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
            A curated mix of technical and business capabilities I use to deliver exceptional
            digital products.
          </p>
        </div>

        <div className={styles.accordionGroup}>
          {skillGroups.map((group) => (
            <details key={group.id} className={styles.accordion} open={group.defaultOpen}>
              <summary className={styles.accordionSummary}>
                <div>
                  <h3 className={styles.accordionTitle}>{group.title}</h3>
                  <p className={styles.accordionDescription}>{group.description}</p>
                </div>
                <span className={styles.accordionIcon} aria-hidden="true">
                  ▾
                </span>
              </summary>

              <ul className={styles.grid} role="list" aria-label={group.ariaLabel}>
                {group.skills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export { Skills };
