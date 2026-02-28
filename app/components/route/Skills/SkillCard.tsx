import styles from './Skills.module.scss';
import type { Skill } from './types';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const isPath = (icon: string) => icon.startsWith('/');

const SkillCard = ({ skill, index }: SkillCardProps) => (
  <li className={styles.card} style={{ animationDelay: `${index * 0.05}s` }}>
    <span className={styles.icon} aria-hidden="true">
      {isPath(skill.icon) ? (
        <img src={skill.icon} alt="" loading="lazy" decoding="async" />
      ) : (
        skill.icon
      )}
    </span>
    <h3 className={styles.skillName}>{skill.name}</h3>
    <p className={styles.skillDescription}>{skill.description}</p>
  </li>
);

export { SkillCard };
