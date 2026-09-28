import React from 'react';

export type IconName =
  | 'tooth'
  | 'shield-check'
  | 'sparkles'
  | 'microscope'
  | 'scan'
  | 'calendar'
  | 'clock'
  | 'map-pin'
  | 'phone'
  | 'mail'
  | 'chevron-down'
  | 'chevron-right'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'check'
  | 'menu'
  | 'close'
  | 'whatsapp'
  | 'star'
  | 'heart'
  | 'camera'
  | 'user'
  | 'badge-check'
  | 'info'
  | 'layers';

interface IconMarkProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
  size?: number;
}

export const IconMark: React.FC<IconMarkProps> = ({
  name,
  className = 'w-5 h-5',
  size = 20,
  ...props
}) => {
  const renderIcon = () => {
    switch (name) {
      case 'tooth':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 4.5C4.5 5.5 3 8 3 11c0 3.5 1.5 7.5 3 10.5 1 2 2.5 2 3-1 .5-3 1.5-5 3-5s2.5 2 3 5c.5 3 2 3 3 1 1.5-3 3-7 3-10.5 0-3-1.5-5.5-4-6.5-2-.8-4-.2-5 1-1-1.2-3-1.8-5-1z"
          />
        );
      case 'shield-check':
        return (
          <>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="m9 12 2 2 4-4"
            />
          </>
        );
      case 'sparkles':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m12 3-1.5 5.5L5 10l5.5 1.5L12 17l1.5-5.5L19 10l-5.5-1.5L12 3zm6 14-.75 2.25L15 20l2.25.75L18 23l.75-2.25L21 20l-2.25-.75L18 17zM6 16l-.75 1.75L3.5 18.5l1.75.75L6 21l.75-1.75L8.5 18.5l-1.75-.75L6 16z"
          />
        );
      case 'microscope':
        return (
          <>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18h8M3 22h18M14 22a7 7 0 1 0 0-14h-1"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 14h2M9 12l3.5-3.5a2.12 2.12 0 1 0-3-3L6 9l3 5z"
            />
          </>
        );
      case 'scan':
        return (
          <>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10"
            />
          </>
        );
      case 'calendar':
        return (
          <>
            <rect
              width="18"
              height="18"
              x="3"
              y="4"
              rx="2"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 2v4M8 2v4M3 10h18"
            />
          </>
        );
      case 'clock':
        return (
          <>
            <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6v6l4 2"
            />
          </>
        );
      case 'map-pin':
        return (
          <>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z"
            />
            <circle cx="12" cy="10" r="3" strokeWidth={1.5} />
          </>
        );
      case 'phone':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
          />
        );
      case 'mail':
        return (
          <>
            <rect
              width="20"
              height="16"
              x="2"
              y="4"
              rx="2"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
            />
          </>
        );
      case 'chevron-down':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m6 9 6 6 6-6"
          />
        );
      case 'chevron-right':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m9 18 6-6-6-6"
          />
        );
      case 'arrow-right':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 12h14M12 5l7 7-7 7"
          />
        );
      case 'arrow-up-right':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 17 17 7M7 7h10v10"
          />
        );
      case 'check':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 6 9 17l-5-5"
          />
        );
      case 'menu':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 6h16M4 12h16M4 18h16"
          />
        );
      case 'close':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18 6 6 18M6 6l12 12"
          />
        );
      case 'whatsapp':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21zm6.5-12.5c-.2-.4-.4-.4-.7-.4h-.6c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.2.2 2 3.2 5 4.3 2.5.9 3 .6 3.5.5.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.7-.4s-2.1-1-2.4-1.2c-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7 0-.4-.2-1.6-.6-3-1.9-1.1-1-1.8-2.2-2-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.3-.4.4-.6.1-.2 0-.5-.1-.7s-.7-1.7-1-2.3z"
          />
        );
      case 'star':
        return (
          <path
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        );
      case 'heart':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
          />
        );
      case 'camera':
        return (
          <>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
            />
            <circle cx="12" cy="13" r="3" strokeWidth={1.5} />
          </>
        );
      case 'user':
        return (
          <>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
            />
            <circle cx="12" cy="7" r="4" strokeWidth={1.5} />
          </>
        );
      case 'badge-check':
        return (
          <>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="m9 12 2 2 4-4"
            />
          </>
        );
      case 'info':
        return (
          <>
            <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 16v-4M12 8h.01"
            />
          </>
        );
      case 'layers':
        return (
          <>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="m12 2 10 6.5L12 15 2 8.5 12 2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="m2 12 10 6.5 10-6.5M2 15.5 12 22l10-6.5"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {renderIcon()}
    </svg>
  );
};
