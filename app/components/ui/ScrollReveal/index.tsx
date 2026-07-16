import type { CSSProperties, HTMLAttributes, ReactNode, RefObject } from 'react';
import { createElement, useEffect, useState } from 'react';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import styles from './ScrollReveal.module.scss';

type RevealElement = 'article' | 'aside' | 'div' | 'li' | 'section';

interface ScrollRevealProps extends HTMLAttributes<HTMLElement> {
  as?: RevealElement;
  children: ReactNode;
  delay?: number;
}

const ScrollReveal = ({
  as = 'div',
  children,
  className = '',
  delay = 0,
  style,
  ...props
}: ScrollRevealProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.08,
    rootMargin: '0px 0px -8% 0px',
    triggerOnce: true,
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(typeof window !== 'undefined' && 'IntersectionObserver' in window);
  }, []);

  return createElement(
    as,
    {
      ...props,
      ref: ref as RefObject<HTMLElement>,
      className: [
        styles.reveal,
        isReady ? styles.ready : '',
        isIntersecting ? styles.visible : '',
        className,
      ]
        .filter(Boolean)
        .join(' '),
      style: {
        ...style,
        '--reveal-delay': `${delay}ms`,
      } as CSSProperties,
    },
    children
  );
};

export { ScrollReveal };