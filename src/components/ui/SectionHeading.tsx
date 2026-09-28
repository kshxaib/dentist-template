import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  headline: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  dark?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  eyebrowVariant?: 'sage' | 'aqua' | 'dark' | 'outline' | 'neutral';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  headline,
  description,
  align = 'left',
  dark = false,
  className = '',
  size = 'md',
}) => {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  const headlineSizes = {
    sm: 'text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.2]',
    md: 'text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15]',
    lg: 'text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08]',
  }[size];

  return (
    <div className={`flex flex-col gap-3.5 max-w-3xl ${alignClasses} ${className}`}>
      {eyebrow && (
        <div className="flex items-center gap-2.5">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              dark ? 'bg-[#B8EEE8]' : 'bg-[#226760]'
            }`}
          />
          <p
            className={`text-[11px] font-mono tracking-[0.22em] uppercase font-medium ${
              dark ? 'text-[#A0A8A2]' : 'text-[#69726B]'
            }`}
          >
            {eyebrow}
          </p>
        </div>
      )}

      <h2
        className={`font-display font-medium ${headlineSizes} ${
          dark ? 'text-[#F7F6F2]' : 'text-[#1B1D1C]'
        }`}
      >
        {headline}
      </h2>

      {description && (
        <p
          className={`text-base sm:text-lg leading-relaxed font-normal ${
            dark ? 'text-[#9AA29D]' : 'text-[#5C645E]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

