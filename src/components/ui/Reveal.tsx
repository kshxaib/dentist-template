import React, { type ElementType } from 'react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  as?: ElementType;
  once?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 750,
  threshold = 0.12,
  className = '',
  as: Component = 'div',
  once = true,
  ...rest
}) => {
  const [ref, inView] = useInView<HTMLElement>({ threshold, once });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <Component className={className} {...rest}>
        {children}
      </Component>
    );
  }

  const getHiddenTransform = (): string => {
    switch (direction) {
      case 'up':
        return 'translate3d(0, 32px, 0)';
      case 'down':
        return 'translate3d(0, -32px, 0)';
      case 'left':
        return 'translate3d(40px, 0, 0)';
      case 'right':
        return 'translate3d(-40px, 0, 0)';
      case 'scale':
        return 'scale3d(0.96, 0.96, 1)';
      case 'fade':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const style: React.CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate3d(0, 0, 0) scale3d(1, 1, 1)' : getHiddenTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
    willChange: inView ? 'auto' : 'opacity, transform',
  };

  return (
    <Component ref={ref} style={style} className={className} {...rest}>
      {children}
    </Component>
  );
};
