import type { ReactNode } from 'react';
import styles from './CtaLink.module.scss';

interface CtaLinkProps {
  href: string;
  variant?: 'primary' | 'secondary';
  external?: boolean;
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
}

const CtaLink = ({
  href,
  variant = 'primary',
  external = false,
  children,
  className,
  'aria-label': ariaLabel,
}: CtaLinkProps) => {
  const externalProps = external
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      href={href}
      className={`${styles.ctaLink} ${styles[variant]}${className ? ` ${className}` : ''}`}
      aria-label={ariaLabel}
      {...externalProps}
    >
      {children}
    </a>
  );
};

export { CtaLink };
