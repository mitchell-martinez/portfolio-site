import styles from './BudgetoDonut.module.scss';

type BudgetoDonutProps = {
  value: number;
  total: number;
  color: string;
  label: string;
  onClick?: () => void;
};

const BudgetoDonut = ({ value, total, color, label, onClick }: BudgetoDonutProps) => {
  const radius = 140;
  const stroke = 20;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percent = Math.min(100, (value / Math.max(total, 1)) * 100);
  const dash = (percent / 100) * circumference;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`${styles.donutContainer} ${onClick ? styles.clickable : ''}`}
      aria-label={onClick ? `${label} – click for details` : label}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.svgWrap}>
        <svg viewBox={`0 0 ${radius * 2} ${radius * 2}`} className={styles.donutSvg}>
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={stroke}
            className={styles.ring}
          />
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            className={styles.ring}
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${radius} ${radius})`}
          />
        </svg>
        <h3 className={styles.valueHeading} aria-live="polite">
          ${value.toLocaleString()}
        </h3>
      </div>
      <div className={styles.donutLabel}>{label}</div>
    </div>
  );
};

export { BudgetoDonut };
