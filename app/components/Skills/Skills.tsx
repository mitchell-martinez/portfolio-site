import { memo, useMemo } from 'react';
import type { RefObject } from 'react';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import { SkillCard } from './SkillCard';
import type { Skill } from './types';
import styles from './Skills.module.scss';

const skillsData: Skill[] = [
  { name: 'React', level: 'expert', icon: '⚛️', description: 'Hooks, Context, Suspense, Server Components' },
  { name: 'TypeScript', level: 'expert', icon: '📘', description: 'Strict typing, generics, advanced patterns' },
  { name: 'CSS / SCSS', level: 'expert', icon: '🎨', description: 'Animations, Grid, Flexbox, Design Systems' },
  { name: 'Node.js', level: 'advanced', icon: '🟢', description: 'APIs, Express, serverless functions' },
  { name: 'Vite', level: 'advanced', icon: '⚡', description: 'Build tooling, HMR, optimization' },
  { name: 'Testing', level: 'advanced', icon: '🧪', description: 'Vitest, RTL, Playwright, TDD' },
  { name: 'Performance', level: 'advanced', icon: '🚀', description: 'Core Web Vitals, lazy loading, caching' },
  { name: 'Accessibility', level: 'advanced', icon: '♿', description: 'WCAG 2.1 AA, ARIA, keyboard nav' },
  { name: 'Git / CI/CD', level: 'intermediate', icon: '🔧', description: 'GitHub Actions, branching strategies' },
];

const levelOrder: Record<string, number> = { expert: 0, advanced: 1, intermediate: 2 };

const Skills = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05, triggerOnce: true });

  const sortedSkills = useMemo(
    () => [...skillsData].sort((a, b) => levelOrder[a.level] - levelOrder[b.level]),
    []
  );

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
          <h2 id="skills-heading" className={styles.heading}>Skills & Expertise</h2>
          <p className={styles.subheading}>
            A curated toolkit of technologies I use to build exceptional digital products.
          </p>
        </div>

        <ul className={styles.grid} role="list" aria-label="Skills list">
          {sortedSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export { Skills };
