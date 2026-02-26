import { memo } from 'react';
import type { RefObject } from 'react';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import { SkillCard } from './SkillCard';
import type { Skill } from './types';
import styles from './Skills.module.scss';

const skillsData: Skill[] = [
  {
    name: 'React',
    icon: '⚛️',
    description:
      'Hooks, Context, React Router, Integration with external systems like AEM, Server Components',
  },
  {
    name: 'TypeScript',
    icon: <img src="/icons/typescript.svg" alt="" loading="lazy" decoding="async" />,
    description: 'Strict typing, generics, advanced patterns',
  },
  {
    name: 'CSS / SCSS',
    icon: <img src="/icons/css3.svg" alt="" loading="lazy" decoding="async" />,
    description: 'Animations, Grid, Flexbox, Design Systems',
  },
  {
    name: 'Node.js',
    icon: <img src="/icons/nodejs.svg" alt="" loading="lazy" decoding="async" />,
    description: 'APIs, Express, serverless functions',
  },
  { name: 'Vite', icon: '⚡', description: 'Build tooling, HMR, optimization' },
  { name: 'Testing', icon: '🧪', description: 'Vitest, RTL, Playwright, TDD' },
  { name: 'Performance', icon: '🚀', description: 'Core Web Vitals, lazy loading, caching' },
  { name: 'Accessibility', icon: '♿', description: 'WCAG 2.1 AA and AAA, ARIA, keyboard nav' },
  {
    name: 'Git / CI/CD',
    icon: <img src="/icons/git.svg" alt="" loading="lazy" decoding="async" />,
    description: 'GitHub Actions, branching strategies',
  },
  { name: 'AEM', icon: '📸', description: 'Component development, integration with React' },
  {
    name: 'Leadership',
    icon: '🤝',
    description: 'Team building, mentoring, project coordination, event management',
  },
  {
    name: 'Stakeholder management',
    icon: '📝',
    description:
      'Communication, expectation setting, adhering to deadlines, providing regular updates, collaboration',
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
