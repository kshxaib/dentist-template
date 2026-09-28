import React from 'react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ImageRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  children,
  delay = 0,
  duration = 950,
  className = '',
  once = true,
  ...rest
}) => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15, once });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  const containerStyle: React.CSSProperties = {
    clipPath: inView ? 'inset(0% 0% 0% 0% round 1rem)' : 'inset(8% 0% 8% 0% round 1rem)',
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
    transitionProperty: 'clip-path, opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
    willChange: inView ? 'auto' : 'clip-path, opacity, transform',
  };

  return (
    <div ref={ref} style={containerStyle} className={`relative overflow-hidden ${className}`} {...rest}>
      {children}
    </div>
  );
};
