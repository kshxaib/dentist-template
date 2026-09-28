import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'outline' | 'subtle' | 'aqua';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-xs font-semibold tracking-wider min-h-[38px]',
    md: 'px-6 py-3 text-sm font-semibold tracking-wider min-h-[44px]',
    lg: 'px-8 py-4 text-base font-semibold tracking-wider min-h-[52px]',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-[#1B1D1C] text-[#F7F6F2] hover:bg-[#2A2E2C] border border-[#1B1D1C] active:translate-y-px shadow-sm hover:shadow transition-all duration-200',
    secondary:
      'bg-[#DFE4DC] text-[#1B1D1C] hover:bg-[#D0D7CC] border border-[#DFE4DC] active:translate-y-px transition-all duration-200',
    dark:
      'bg-[#F7F6F2] text-[#171918] hover:bg-[#FFFFFF] border border-[#F7F6F2] active:translate-y-px shadow-sm hover:shadow transition-all duration-200',
    outline:
      'bg-transparent text-[#1B1D1C] border border-[rgba(27,29,28,0.25)] hover:bg-[#1B1D1C] hover:text-[#F7F6F2] active:translate-y-px transition-all duration-200',
    subtle:
      'bg-transparent text-[#1B1D1C] hover:bg-[rgba(27,29,28,0.06)] border border-transparent active:translate-y-px transition-all duration-200',
    aqua:
      'bg-[#B8EEE8] text-[#111312] hover:bg-[#A3E5DE] border border-[#96E2D8] active:translate-y-px shadow-sm hover:shadow transition-all duration-200',
  };

  const baseClasses = `inline-flex items-center justify-center gap-2.5 rounded-full text-center uppercase transition-all select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${
    sizeStyles[size]
  } ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <a href={href} className={baseClasses} {...anchorProps}>
        {iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>}
        <span>{children}</span>
        {iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={baseClasses} {...buttonProps}>
      {iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
    </button>
  );
};
