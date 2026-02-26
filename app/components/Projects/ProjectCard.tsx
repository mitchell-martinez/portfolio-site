import type { Project } from './types';
import styles from './Projects.module.scss';

export type { Project };

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => (
  <li
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
);

export { ProjectCard };
