import React, { useState } from 'react';
import type { Business } from '../../types/business';
import { IconMark } from '../ui/IconMark';

interface AnnouncementBarProps {
  announcement?: Business['announcement'];
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ announcement }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (!announcement || !announcement.isActive || isDismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Practice announcement"
      className="relative z-30 bg-[#171918] text-[#F7F6F2] py-2.5 px-4 text-xs tracking-wide border-b border-white/10 transition-all duration-500 animate-in fade-in slide-in-from-top-2"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center text-[12px] tracking-wide">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#B8EEE8] opacity-90" />
          <span className="text-[#D3DAD5] font-normal">{announcement.text}</span>
          {announcement.linkText && (
            <a
              href={announcement.linkHref || '#appointment'}
              className="font-medium text-[#B8EEE8] underline underline-offset-4 hover:text-white ml-2 inline-flex items-center gap-1 transition-colors duration-200"
            >
              <span>{announcement.linkText}</span>
              <IconMark name="arrow-right" className="w-3 h-3" />
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss announcement"
          className="p-1 text-[#8E9790] hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <IconMark name="close" className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
