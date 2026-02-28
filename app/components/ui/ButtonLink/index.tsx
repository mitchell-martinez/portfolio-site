import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router';
import styles from './ButtonLink.module.scss';

type ButtonLinkBaseProps = {
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'sm';
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
  external?: boolean;
  showExternalIcon?: boolean;
};

type ButtonLinkHrefProps = ButtonLinkBaseProps & {
  href: string;
  to?: never;
};

type ButtonLinkToProps = ButtonLinkBaseProps & {
  to: string;
  href?: never;
};

type ButtonLinkProps = ButtonLinkHrefProps | ButtonLinkToProps;

const isExternalHref = (href: string) => /^https?:\/\//i.test(href);

const ExternalIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

const ButtonLink = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  style,
  external = false,
  showExternalIcon,
  'aria-label': ariaLabel,
  ...rest
}: ButtonLinkProps) => {
  const classes = `${styles.buttonLink} ${styles[variant]} ${styles[size]}${className ? ` ${className}` : ''}`;

  if ('to' in rest && typeof rest.to === 'string') {
    return (
      <Link to={rest.to} className={classes} style={style} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  const shouldOpenExternal = external || isExternalHref(rest.href);
  const shouldShowExternalIcon = showExternalIcon ?? shouldOpenExternal;
  const externalProps = shouldOpenExternal
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <a href={rest.href} className={classes} style={style} aria-label={ariaLabel} {...externalProps}>
      {children}
      {shouldShowExternalIcon && <ExternalIcon />}
    </a>
  );
};

export { ButtonLink };
