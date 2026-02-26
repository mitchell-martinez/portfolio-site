import { memo, useMemo } from 'react';
import type { RefObject } from 'react';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import styles from './Projects.module.scss';

interface Project {
  id: string;
  name: string;
  url: string;
  description: string;
  longDescription: string;
  tags: string[];
  highlight?: string;
}

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
            <li
              key={project.id}
              className={styles.card}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <div className={styles.projectMeta}>
                    <div className={styles.projectDot} aria-hidden="true" />
                    <span className={styles.projectType}>{project.description}</span>
                  </div>

                  <h3 className={styles.projectName}>{project.name}</h3>
                  <p className={styles.projectDescription}>{project.longDescription}</p>
                </div>

                <div className={styles.cardBottom}>
                  <ul className={styles.tags} role="list" aria-label={`Technologies used in ${project.name}`}>
                    {project.tags.map(tag => (
                      <li key={tag} className={styles.tag}>{tag}</li>
                    ))}
                  </ul>

                  <a
                    href={project.url}
                    className={styles.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.name} at ${project.highlight} (opens in new tab)`}
                  >
                    <span>{project.highlight}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className={styles.cardGlow} aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export { Projects };
