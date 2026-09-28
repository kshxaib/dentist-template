import React, { type ElementType, Children, isValidElement, cloneElement } from 'react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { type RevealDirection } from './Reveal';

interface StaggerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  staggerDelay?: number;
  baseDelay?: number;
  duration?: number;
  direction?: RevealDirection;
  threshold?: number;
  className?: string;
  as?: ElementType;
  once?: boolean;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  staggerDelay = 90,
  baseDelay = 0,
  duration = 700,
  direction = 'up',
  threshold = 0.1,
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
        return 'translate3d(0, 28px, 0)';
      case 'down':
        return 'translate3d(0, -28px, 0)';
      case 'left':
        return 'translate3d(32px, 0, 0)';
      case 'right':
        return 'translate3d(-32px, 0, 0)';
      case 'scale':
        return 'scale3d(0.96, 0.96, 1)';
      case 'fade':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const arrayChildren = Children.toArray(children);

  return (
    <Component ref={ref} className={className} {...rest}>
      {arrayChildren.map((child, index) => {
        const itemDelay = baseDelay + index * staggerDelay;
        const itemStyle: React.CSSProperties = {
          opacity: inView ? 1 : 0,
          transform: inView ? 'translate3d(0, 0, 0) scale3d(1, 1, 1)' : getHiddenTransform(),
          transitionProperty: 'opacity, transform',
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: `${itemDelay}ms`,
          willChange: inView ? 'auto' : 'opacity, transform',
        };

        if (isValidElement<React.HTMLAttributes<HTMLElement>>(child)) {
          const childStyle = child.props.style || {};
          return cloneElement(child, {
            style: { ...childStyle, ...itemStyle },
          });
        }

        return (
          <div key={index} style={itemStyle}>
            {child}
          </div>
        );
      })}
    </Component>
  );
};
