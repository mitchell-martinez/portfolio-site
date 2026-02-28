import { useIntersectionObserver } from 'app/hooks/useIntersectionObserver';
import type { RefObject } from 'react';
import { memo } from 'react';
import { ProjectCard } from './ProjectCard';
import styles from './Projects.module.scss';
import type { Project } from './types';

const projectsData: Project[] = [
  {
    id: 'budgeto',
    name: 'Budgeto',
    url: 'https://budgeto.app/dashboard',
    description: 'Personal finance management app',
    longDescription:
      'A beautifully designed personal finance management application that helps users track spending, set budgets, and achieve financial goals. Built with a focus on simplicity and delightful UX.',
    tags: ['React', 'TypeScript', 'Node.js', 'Finance'],
    highlight: 'budgeto.app',
    image: { src: '/images/budgeto_donut.png', alt: 'Budgeto app dashboard screenshot' },
  },
  {
    id: 'fogsv',
    name: 'Friends of Gulf St Vincent',
    url: 'https://fogsv.org.au',
    description: 'Friends of Grasslands community platform',
    longDescription:
      'A community website for Friends of Gulf St Vincent, based in Adelaide. Built in WordPress with custom theming and plugins to support conservation efforts, events, and educational resources about the local marine environment.',
    tags: ['React', 'TypeScript', 'Community', 'Conservation'],
    highlight: 'fogsv.org.au',
    image: { src: '/images/fogsv.png', alt: 'Friends of Gulf St Vincent website screenshot' },
  },
  {
    id: 'optus',
    name: 'Optus',
    url: 'https://optus.com.au',
    description: 'Optus website',
    longDescription:
      "The official website for Optus, a leading telecommunications company in Australia. Built with a focus on user experience, accessibility, and responsive design. I contributed to many projects including the home page's Recently Viewed component, simplified sales checkout experiences, major accessibility overhauls, and various other small bug fixes and minor changes.",
    tags: [
      'React',
      'AEM',
      'Accessibility',
      'Performance',
      'Telecommunications',
      'eCommerce',
      'Enterprise',
    ],
    highlight: 'optus.com.au',
    fullWidth: true,
    image: { src: '/images/optus.png', alt: 'Optus website screenshot' },
  },
];

const Projects = memo(() => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05, triggerOnce: true });

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
          <h2 id="projects-heading" className={styles.heading}>
            Featured Projects
          </h2>
          <p className={styles.subheading}>
            A selection of projects I've built — combining technical depth with thoughtful design.
          </p>
        </div>

        <ul className={styles.grid} role="list" aria-label="Featured projects">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export { Projects };
