import type { ReactNode } from 'react';
import { ButtonLink } from '~/components/ui/ButtonLink/';

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
  return (
    <ButtonLink
      href={href}
      variant={variant}
      external={external}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </ButtonLink>
  );
};

export { CtaLink };
