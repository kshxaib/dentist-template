import React, { useState } from 'react';
import type { MediaAsset } from '../../types/business';
import { IconMark } from './IconMark';

interface MediaFrameProps {
  asset?: MediaAsset | null;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide' | 'video' | 'auto';
  className?: string;
  badgeText?: string;
  caption?: string;
  dark?: boolean;
  interactive?: boolean;
  priority?: boolean;
}

export const MediaFrame: React.FC<MediaFrameProps> = ({
  asset,
  aspectRatio = 'landscape',
  className = '',
  badgeText,
  caption,
  dark = false,
  interactive = false,
  priority = false,
}) => {
  const [imageError, setImageError] = useState(false);

  const aspectClass = {
    landscape: 'aspect-[4/3] sm:aspect-[16/10]',
    wide: 'aspect-[16/9] lg:aspect-[21/9]',
    portrait: 'aspect-[3/4] sm:aspect-[4/5]',
    square: 'aspect-square',
    video: 'aspect-video',
    auto: 'h-full min-h-[260px]',
  }[aspectRatio];

  const hasValidImage = Boolean(asset?.src && !imageError);
  const displayCaption = caption || asset?.caption;

  return (
    <figure className={`group relative w-full overflow-hidden flex flex-col ${className}`}>
      <div
        className={`relative w-full overflow-hidden rounded-md border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${aspectClass} ${
          dark
            ? 'border-[rgba(255,255,255,0.12)] bg-[#171A19]'
            : 'border-[rgba(27,29,28,0.1)] bg-[#EFECE6]'
        } ${interactive ? 'hover:border-[rgba(27,29,28,0.3)]' : ''}`}
      >
        {hasValidImage ? (
          <img
            src={asset!.src!}
            alt={asset?.alt || 'Practice media asset'}
            loading={priority ? 'eager' : 'lazy'}
            onError={() => setImageError(true)}
            className={`h-full w-full object-cover transition-transform duration-700 ${
              interactive ? 'group-hover:scale-105' : ''
            }`}
          />
        ) : (
          /* Intentional Architectural Placeholder */
          <div
            role="img"
            aria-label={asset?.alt || 'Designed architectural media frame'}
            className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center select-none"
          >
            {/* Background architectural fine grid lines */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage: dark
                  ? 'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)'
                  : 'radial-gradient(rgba(27,29,28,0.12) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Corner architectural registration marks */}
            <div className={`absolute top-3 left-3 w-3 h-3 border-t border-l ${dark ? 'border-white/20' : 'border-black/20'}`} />
            <div className={`absolute top-3 right-3 w-3 h-3 border-t border-r ${dark ? 'border-white/20' : 'border-black/20'}`} />
            <div className={`absolute bottom-3 left-3 w-3 h-3 border-b border-l ${dark ? 'border-white/20' : 'border-black/20'}`} />
            <div className={`absolute bottom-3 right-3 w-3 h-3 border-b border-r ${dark ? 'border-white/20' : 'border-black/20'}`} />

            {/* Center emblem */}
            <div
              className={`relative z-10 flex flex-col items-center justify-center gap-3 p-4 rounded-xl backdrop-blur-xs max-w-xs transition-transform duration-300 ${
                interactive ? 'group-hover:scale-102' : ''
              } ${dark ? 'bg-black/20 text-[#DFE4DC]' : 'bg-white/40 text-[#5C645E]'}`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border ${
                  dark
                    ? 'border-white/15 bg-white/5 text-[#B8EEE8]'
                    : 'border-black/10 bg-white/70 text-[#226760]'
                }`}
              >
                <IconMark name="camera" className="w-5 h-5 opacity-90" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-semibold tracking-widest uppercase opacity-80">
                  {badgeText || 'Studio Photography'}
                </p>
                <p
                  className={`text-xs italic leading-relaxed line-clamp-2 ${
                    dark ? 'text-[#A0A7A1]' : 'text-[#69716B]'
                  }`}
                >
                  {asset?.alt || 'Cloudinary Media Asset Ready'}
                </p>
              </div>
            </div>

            {/* Future Cloudinary Integration Indicator Tag */}
            <div className="absolute bottom-3 right-3 z-10 hidden sm:block">
              <span
                className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
                  dark
                    ? 'text-[#7C857E] border-white/10 bg-black/40'
                    : 'text-[#879089] border-black/10 bg-white/60'
                }`}
              >
                Asset CDN Ready
              </span>
            </div>
          </div>
        )}
      </div>

      {displayCaption && (
        <figcaption
          className={`mt-2.5 text-xs italic tracking-wide ${
            dark ? 'text-[#8E9790]' : 'text-[#69716B]'
          }`}
        >
          {displayCaption}
        </figcaption>
      )}
    </figure>
  );
};
