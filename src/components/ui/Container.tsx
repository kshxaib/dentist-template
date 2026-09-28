import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide' | 'full';
  className?: string;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  size = 'default',
  className = '',
  children,
  ...props
}) => {
  const maxWidthClass = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1400px]',
    full: 'max-w-full',
  }[size];

  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 ${maxWidthClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
