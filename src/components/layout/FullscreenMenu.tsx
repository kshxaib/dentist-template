import React, { useEffect, useState, useRef, useCallback } from 'react';
import type { Business } from '../../types/business';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { IconMark } from '../ui/IconMark';
import { Button } from '../ui/Button';
import { formatTelLink } from '../../lib/business';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  business: Business;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({
  isOpen,
  onClose,
  business,
  triggerRef,
}) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const prefersReduced = useReducedMotion();

  // Handle open trigger
  useEffect(() => {
    let animFrame: number;
    let expandTimer: ReturnType<typeof setTimeout>;

    if (isOpen) {
      // Delay state updates to prevent synchronous setState in effect body
      animFrame = requestAnimationFrame(() => {
        setIsRendered(true);
        setIsClosing(false);
        expandTimer = setTimeout(() => {
          setIsExpanded(true);
        }, 30);
      });
    }

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(expandTimer);
    };
  }, [isOpen]);

  // Handle close sequence (for close button and escape key)
  const handleInitiateClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setIsExpanded(false);

    const closeDuration = prefersReduced ? 50 : 500;
    const timer = setTimeout(() => {
      setIsRendered(false);
      setIsClosing(false);
      onClose();
      // Restore focus to trigger button only on manual close
      if (triggerRef?.current) {
        triggerRef.current.focus();
      }
    }, closeDuration);

    return () => clearTimeout(timer);
  }, [isClosing, prefersReduced, onClose, triggerRef]);

  // Handle smooth navigation click to target section
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.slice(1);

        if (isClosing) return;
        setIsClosing(true);
        setIsExpanded(false);

        const closeDuration = prefersReduced ? 50 : 420;
        const timer = setTimeout(() => {
          setIsRendered(false);
          setIsClosing(false);
          onClose();

          // Smoothly scroll to the target element after modal unmounts
          requestAnimationFrame(() => {
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
              const headerOffset = 72;
              const elementPosition = targetEl.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: prefersReduced ? 'auto' : 'smooth',
              });

              window.history.pushState(null, '', href);
            }
          });
        }, closeDuration);

        return () => clearTimeout(timer);
      } else {
        handleInitiateClose();
      }
    },
    [isClosing, prefersReduced, onClose, handleInitiateClose]
  );

  useEscapeKey(handleInitiateClose, isRendered);
  useLockBodyScroll(isExpanded && !isClosing);

  // Focus management
  useEffect(() => {
    if (isExpanded) {
      const focusTimer = setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }, 150);
      return () => clearTimeout(focusTimer);
    }
  }, [isExpanded]);

  if (!isRendered) return null;

  const isVisible = isExpanded && !isClosing;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      style={{
        clipPath: prefersReduced
          ? 'none'
          : isVisible
          ? 'circle(160% at calc(100% - 48px) 36px)'
          : 'circle(0% at calc(100% - 48px) 36px)',
        opacity: isVisible ? 1 : 0,
        transform: prefersReduced
          ? 'none'
          : isVisible
          ? 'scale3d(1, 1, 1)'
          : 'scale3d(0.985, 0.985, 1)',
        transitionProperty: 'clip-path, opacity, transform',
        transitionDuration: prefersReduced
          ? '150ms'
          : isClosing
          ? '480ms'
          : '680ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="fixed inset-0 z-50 flex flex-col bg-[#141716] text-[#F7F6F2] overflow-y-auto will-change-[clip-path,opacity,transform]"
    >
      {/* Background architectural fine grid & subtle dark green glow */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          isVisible ? 'opacity-25' : 'opacity-0'
        }`}
        style={{
          backgroundImage:
            'radial-gradient(rgba(184, 238, 232, 0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Stage 4: Top Header Bar within Fullscreen Overlay */}
      <div
        style={{
          opacity: prefersReduced ? 1 : isVisible ? 1 : 0,
          transform: prefersReduced
            ? 'none'
            : isVisible
            ? 'translate3d(0, 0, 0)'
            : 'translate3d(0, -16px, 0)',
          transitionProperty: 'opacity, transform',
          transitionDuration: '550ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: isVisible ? '240ms' : '0ms',
        }}
        className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16 border-b border-white/10"
      >
        <div className="flex flex-col">
          <span className="text-xl font-display tracking-wider font-semibold text-white">
            {business.logoText.primary}
          </span>
          {business.logoText.secondary && (
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#B8EEE8] font-medium">
              {business.logoText.secondary}
            </span>
          )}
        </div>

        {/* Close Button with Stage 1/Close hover micro-animations */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleInitiateClose}
          aria-label="Close navigation menu"
          className="group relative flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#F7F6F2] hover:bg-white/15 hover:border-white/40 active:scale-95 transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#B8EEE8]"
        >
          <span>Close</span>
          <IconMark
            name="close"
            className="w-4 h-4 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90 group-hover:scale-110"
          />
        </button>
      </div>

      {/* Main Content: 2 Column Architectural Layout */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-7xl w-full mx-auto px-6 py-10 sm:px-10 lg:px-16 gap-12 lg:gap-16 items-start">
        {/* Left Column: Editorial Navigation Links */}
        <nav
          className="lg:col-span-7 flex flex-col justify-center space-y-3 sm:space-y-4"
          aria-label="Fullscreen navigation"
        >
          {/* Index & Navigation Label (Stage 4: 380ms) */}
          <div
            style={{
              opacity: prefersReduced ? 1 : isVisible ? 1 : 0,
              transform: prefersReduced
                ? 'none'
                : isVisible
                ? 'translate3d(0, 0, 0)'
                : 'translate3d(0, 14px, 0)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '500ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: isVisible ? '360ms' : '0ms',
            }}
          >
            <p className="text-[11px] font-mono tracking-widest uppercase text-[#8E9790] mb-2">
              Index & Navigation
            </p>
          </div>

          {/* Stage 5: Navigation Links with Relaxed Stagger (550ms - 1000ms) */}
          <ul className="space-y-1 sm:space-y-2">
            {business.navigation.map((item, idx) => {
              const itemDelay = prefersReduced
                ? 0
                : isVisible
                ? 440 + idx * 55
                : Math.max(0, 120 - idx * 15);

              return (
                <li
                  key={item.label}
                  style={{
                    opacity: prefersReduced ? 1 : isVisible ? 1 : 0,
                    transform: prefersReduced
                      ? 'none'
                      : isVisible
                      ? 'translate3d(0, 0, 0)'
                      : 'translate3d(0, 24px, 0)',
                    transitionProperty: 'opacity, transform',
                    transitionDuration: '550ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: `${itemDelay}ms`,
                    willChange: 'opacity, transform',
                  }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="group flex items-baseline justify-between py-2.5 border-b border-white/5 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="text-xs font-mono text-[#8E9790] group-hover:text-[#B8EEE8] transition-colors duration-300">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-[#F7F6F2] group-hover:text-[#B8EEE8] group-hover:translate-x-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        {item.label}
                      </span>
                    </div>
                    {item.description && (
                      <span className="hidden md:inline-block text-xs italic text-[#8E9790] group-hover:text-[#F7F6F2] transition-colors duration-300">
                        {item.description}
                      </span>
                    )}
                    <IconMark
                      name="arrow-up-right"
                      className="w-4 h-4 text-[#8E9790] opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-[#B8EEE8] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ml-2"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Column: Stage 6 Studio Information Card Reveal (500ms - 850ms) */}
        <div
          style={{
            opacity: prefersReduced ? 1 : isVisible ? 1 : 0,
            transform: prefersReduced
              ? 'none'
              : isVisible
              ? 'translate3d(0, 0, 0)'
              : 'translate3d(0, 24px, 0)',
            transitionProperty: 'opacity, transform',
            transitionDuration: '600ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: isVisible ? '460ms' : '0ms',
            willChange: 'opacity, transform',
          }}
          className="lg:col-span-5 flex flex-col justify-between h-full space-y-8 bg-[#1D201F] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl"
        >
          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-mono tracking-widest uppercase text-[#B8EEE8] mb-1 font-semibold">
                Studio Location
              </p>
              <h3 className="text-lg font-display text-[#F7F6F2] font-medium">
                {business.name}
              </h3>
              <p className="text-sm text-[#A0A7A1] mt-1 leading-relaxed">
                {business.contact.address.fullAddress}
              </p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-[11px] font-mono tracking-widest uppercase text-[#B8EEE8] mb-1 font-semibold">
                Direct Contact
              </p>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-[#8E9790]">Concierge: </span>
                  <a
                    href={formatTelLink(business.contact.phone)}
                    className="text-[#F7F6F2] hover:text-[#B8EEE8] font-medium transition-colors"
                  >
                    {business.contact.displayPhone}
                  </a>
                </p>
                <p>
                  <span className="text-[#8E9790]">Inquiries: </span>
                  <a
                    href={`mailto:${business.contact.email}`}
                    className="text-[#F7F6F2] hover:text-[#B8EEE8] transition-colors"
                  >
                    {business.contact.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-[11px] font-mono tracking-widest uppercase text-[#B8EEE8] mb-1 font-semibold">
                Consultation Hours
              </p>
              <div className="space-y-1 text-xs text-[#A0A7A1]">
                {business.hours.map((h, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-[#F7F6F2] font-medium">{h.days}</span>
                    <span>{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons with Delayed Entrance */}
          <div
            style={{
              opacity: prefersReduced ? 1 : isVisible ? 1 : 0,
              transform: prefersReduced
                ? 'none'
                : isVisible
                ? 'translate3d(0, 0, 0)'
                : 'translate3d(0, 16px, 0)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '500ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: isVisible ? '600ms' : '0ms',
            }}
            className="pt-4 border-t border-white/10 flex flex-col gap-3"
          >
            <Button
              href="#appointment"
              variant="aqua"
              size="md"
              fullWidth
              onClick={(e) => handleNavClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, '#appointment')}
              iconRight={<IconMark name="calendar" className="w-4 h-4" />}
            >
              Reserve Consultation
            </Button>
            <Button
              href={formatTelLink(business.contact.phone)}
              variant="outline"
              size="sm"
              fullWidth
              className="text-white border-white/20 hover:bg-white/10"
              iconLeft={<IconMark name="phone" className="w-3.5 h-3.5" />}
            >
              Call Studio
            </Button>
          </div>
        </div>
      </div>

      {/* Footer bar within overlay */}
      <div
        style={{
          opacity: prefersReduced ? 1 : isVisible ? 1 : 0,
          transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: isVisible ? '580ms' : '0ms',
        }}
        className="relative z-10 px-6 py-4 sm:px-10 lg:px-16 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E9790] gap-2"
      >
        <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
        <p className="italic">Clinical Excellence • Quiet Hospitality</p>
      </div>
    </div>
  );
};
