import type { Skill } from './types';
import styles from './Skills.module.scss';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => (
  <li
    className={styles.card}
    style={{ animationDelay: `${index * 0.05}s` }}
  >
    <span className={styles.icon} aria-hidden="true">{skill.icon}</span>
    <h3 className={styles.skillName}>{skill.name}</h3>
    <p className={styles.skillDescription}>{skill.description}</p>
  </li>
);

export { SkillCard };
