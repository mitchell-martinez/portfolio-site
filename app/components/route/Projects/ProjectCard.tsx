import { ButtonLink } from '~/components/ui/ButtonLink/';
import styles from './Projects.module.scss';
import type { Project } from './types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => (
  <li
    className={`${styles.card}${project.fullWidth ? ` ${styles.cardFullWidth}` : ''}`}
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

        {project.image && (
          <img
            src={project.image.src}
            alt={project.image.alt}
            className={styles.projectImage}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      <div className={styles.cardBottom}>
        <ul className={styles.tags} role="list" aria-label={`Technologies used in ${project.name}`}>
          {project.tags.map(tag => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>

        <ButtonLink
          href={project.url}
          className={styles.projectLink}
          variant="secondary"
          external
          aria-label={`Visit ${project.name} at ${project.highlight} (opens in new tab)`}
        >
          <span>{project.highlight}</span>
        </ButtonLink>
      </div>
    </div>

    <div className={styles.cardGlow} aria-hidden="true" />
  </li>
);

export { ProjectCard };
