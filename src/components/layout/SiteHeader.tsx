import React, { useState, useEffect, useRef } from 'react';
import type { Business } from '../../types/business';
import { Button } from '../ui/Button';
import { IconMark } from '../ui/IconMark';
import { formatTelLink } from '../../lib/business';

interface SiteHeaderProps {
  business: Business;
  isMenuOpen?: boolean;
  onOpenMenu: () => void;
  menuTriggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  business,
  isMenuOpen = false,
  onOpenMenu,
  menuTriggerRef,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const internalTriggerRef = useRef<HTMLButtonElement | null>(null);
  const activeTriggerRef = menuTriggerRef || internalTriggerRef;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const desktopNavItems = business.navigation
    .filter((item) => !item.isPrimaryCta)
    .slice(0, 5);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled
          ? 'bg-[#F7F6F2]/95 backdrop-blur-md shadow-xs border-b border-[rgba(27,29,28,0.09)] py-3 sm:py-3.5'
          : 'bg-[#F7F6F2] border-b border-[rgba(27,29,28,0.06)] py-4 sm:py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Brand / Logo */}
        <a
          href="#"
          className="group flex flex-col focus-visible:outline-2 focus-visible:outline-[#226760] rounded-sm transition-transform duration-300 hover:opacity-90"
          aria-label={`${business.name} home`}
        >
          <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-[#1B1D1C] group-hover:text-[#226760] transition-colors duration-300">
            {business.logoText.primary}
          </span>
          {business.logoText.secondary && (
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#69716B] font-semibold -mt-0.5 group-hover:text-[#1B1D1C] transition-colors duration-300">
              {business.logoText.secondary}
            </span>
          )}
        </a>

        {/* Desktop Navigation Links with Editorial Underline Animation */}
        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Main Navigation"
        >
          {desktopNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="link-editorial text-xs uppercase tracking-widest font-semibold text-[#5C645E] hover:text-[#1B1D1C] transition-colors duration-200 py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions Area */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick Call on Mobile */}
          <a
            href={formatTelLink(business.contact.phone)}
            aria-label={`Call ${business.name}`}
            className="flex lg:hidden h-10 w-10 items-center justify-center rounded-full border border-[rgba(27,29,28,0.15)] bg-white text-[#1B1D1C] hover:bg-[#EFECE6] active:scale-95 transition-all duration-200"
          >
            <IconMark name="phone" className="w-4 h-4" />
          </a>

          {/* Direct Appointment CTA for Desktop */}
          <div className="hidden sm:block">
            <Button
              href="#appointment"
              variant="primary"
              size="sm"
              iconRight={<IconMark name="arrow-right" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />}
            >
              Book Visit
            </Button>
          </div>

          {/* Stage 1: Fullscreen Menu Trigger with Micro-Animation & Ripple */}
          <button
            ref={activeTriggerRef}
            type="button"
            onClick={onOpenMenu}
            aria-label="Open fullscreen navigation menu"
            aria-expanded={isMenuOpen}
            aria-haspopup="dialog"
            className="group relative flex items-center gap-2 rounded-full border border-[#1B1D1C] bg-[#1B1D1C] px-3.5 sm:px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#F7F6F2] hover:bg-[#2A2E2C] active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#226760]"
          >
            {/* Soft subtle radial glow ring */}
            <span className="absolute -inset-1 rounded-full bg-[#B8EEE8]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xs" />
            <span className="relative hidden sm:inline">Menu</span>
            <IconMark
              name="menu"
              className="relative w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-active:scale-90"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
