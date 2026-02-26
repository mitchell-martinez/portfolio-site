import { memo, useMemo } from 'react';
import type { RefObject } from 'react';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import { ProjectCard } from './ProjectCard';
import type { Project } from './types';
import styles from './Projects.module.scss';

const projectsData: Project[] = [
  {
    id: 'budgeto',
    name: 'Budgeto',
    url: 'https://budgeto.app',
    description: 'Personal finance management app',
    longDescription:
      'A beautifully designed personal finance management application that helps users track spending, set budgets, and achieve financial goals. Built with a focus on simplicity and delightful UX.',
    tags: ['React', 'TypeScript', 'Node.js', 'Finance'],
    highlight: 'budgeto.app',
  },
  {
    id: 'fogsv',
    name: 'FOG SV',
    url: 'https://fogsv.org.au',
    description: 'Friends of Grasslands community platform',
    longDescription:
      'A community platform for Friends of Grasslands in the Southern Valleys region of Australia. Supporting conservation efforts through modern web technology, events management, and community engagement features.',
    tags: ['React', 'TypeScript', 'Community', 'Conservation'],
    highlight: 'fogsv.org.au',
  },
];

const Projects = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05, triggerOnce: true });

  const projects = useMemo(() => projectsData, []);

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className={`${styles.projects} ${isIntersecting ? styles.visible : ''}`}
      id="projects"
      aria-labelledby="projects-heading"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>My Work</p>
          <h2 id="projects-heading" className={styles.heading}>Featured Projects</h2>
          <p className={styles.subheading}>
            A selection of projects I've built — combining technical depth with thoughtful design.
          </p>
        </div>

        <ul className={styles.grid} role="list" aria-label="Featured projects">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export { Projects };
