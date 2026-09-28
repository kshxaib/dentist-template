import React, { type ElementType } from 'react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AnimatedTextProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  by?: 'words' | 'blocks';
  once?: boolean;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  as: Component = 'h2',
  className = '',
  delay = 0,
  staggerDelay = 35,
  by = 'words',
  once = true,
  ...rest
}) => {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1, once });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <Component className={className} {...rest}>
        {text}
      </Component>
    );
  }

  const units = by === 'words' ? text.split(' ') : [text];

  return (
    <Component ref={ref} className={className} {...rest}>
      {units.map((unit, index) => {
        const itemDelay = delay + index * staggerDelay;
        const style: React.CSSProperties = {
          display: 'inline-block',
          transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 110%, 0)',
          opacity: inView ? 1 : 0,
          transitionProperty: 'transform, opacity',
          transitionDuration: '800ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: `${itemDelay}ms`,
          willChange: inView ? 'auto' : 'transform, opacity',
        };

        return (
          <span
            key={index}
            className="inline-block overflow-hidden align-top mr-[0.26em] last:mr-0"
          >
            <span style={style} className="inline-block">
              {unit}
            </span>
          </span>
        );
      })}
    </Component>
  );
};
