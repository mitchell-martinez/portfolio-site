import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { useCountUp } from '~/hooks/useCountUp';
import styles from './BudgetoDonut.module.scss';

type BudgetoDonutProps = {
  value: number;
  total: number;
  color: string;
  label: string;
  animate?: boolean;
  onClick?: () => void;
};

const BudgetoDonut = ({ value, total, color, label, animate = false, onClick }: BudgetoDonutProps) => {
  const radius = 140;
  const stroke = 20;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percent = Math.min(100, (value / Math.max(total, 1)) * 100);
  const dash = (percent / 100) * circumference;
  const [arcReady, setArcReady] = useState(false);
  const displayValue = useCountUp(value, animate);
  const dashOffset = animate && !arcReady ? circumference : circumference - dash;

  useEffect(() => {
    if (!animate) return;

    setArcReady(false);
    let fillFrameId = 0;
    const resetFrameId = requestAnimationFrame(() => {
      fillFrameId = requestAnimationFrame(() => setArcReady(true));
    });

    return () => {
      cancelAnimationFrame(resetFrameId);
      cancelAnimationFrame(fillFrameId);
    };
  }, [animate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`${styles.donutContainer} ${onClick ? styles.clickable : ''}`}
      style={{ '--donut-color': color } as CSSProperties}
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
            className={`${styles.ring} ${styles.arc}`}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${radius} ${radius})`}
          />
        </svg>
        <p className={styles.valueHeading} aria-label={`$${value.toLocaleString()}`} aria-live="polite">
          ${displayValue.toLocaleString()}
        </p>
      </div>
      <div className={styles.donutLabel}>{label}</div>
    </div>
  );
};

export { BudgetoDonut };
