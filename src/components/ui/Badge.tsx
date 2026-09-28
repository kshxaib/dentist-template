import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'sage' | 'aqua' | 'dark' | 'outline' | 'neutral';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'sage',
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-[11px] tracking-wider uppercase font-semibold',
    md: 'px-3.5 py-1 text-xs tracking-wider uppercase font-semibold',
  }[size];

  const variantClasses = {
    sage: 'bg-[#DFE4DC] text-[#1B1D1C] border border-[#DFE4DC]',
    aqua: 'bg-[#B8EEE8] text-[#111312] border border-[#96E2D8]',
    dark: 'bg-[#202322] text-[#F7F6F2] border border-[#333836]',
    outline: 'bg-transparent text-[#1B1D1C] border border-[rgba(27,29,28,0.2)]',
    neutral: 'bg-[#EFECE6] text-[#5C645E] border border-[rgba(27,29,28,0.08)]',
  }[variant];

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full transition-colors duration-200 ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};
