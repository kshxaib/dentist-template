import React from 'react';

interface DividerProps {
  className?: string;
  dark?: boolean;
  label?: string;
}

export const Divider: React.FC<DividerProps> = ({
  className = '',
  dark = false,
  label,
}) => {
  if (label) {
    return (
      <div className={`relative flex items-center py-6 ${className}`}>
        <div
          className={`flex-grow border-t ${
            dark ? 'border-white/10' : 'border-black/10'
          }`}
        />
        <span
          className={`mx-4 shrink-0 text-xs uppercase tracking-widest font-semibold ${
            dark ? 'text-[#879089]' : 'text-[#69716B]'
          }`}
        >
          {label}
        </span>
        <div
          className={`flex-grow border-t ${
            dark ? 'border-white/10' : 'border-black/10'
          }`}
        />
      </div>
    );
  }

  return (
    <hr
      className={`border-0 border-t ${
        dark ? 'border-white/10' : 'border-black/10'
      } ${className}`}
    />
  );
};
