import React from 'react';
import type { Business } from '../../types/business';
import { Container } from '../ui/Container';
import { IconMark } from '../ui/IconMark';
import { Reveal } from '../ui/Reveal';
import { Stagger } from '../ui/Stagger';
import { formatTelLink } from '../../lib/business';

interface SiteFooterProps {
  business: Business;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ business }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111312] text-[#F7F6F2] pt-16 sm:pt-20 pb-12 border-t border-white/10 overflow-hidden relative">
      {/* Background architectural fine grid dots matching menu */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage:
            'radial-gradient(rgba(184, 238, 232, 0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <Container>
        {/* Top Tier: Refined Atelier Manifesto Strip */}
        <Reveal direction="up" delay={60}>
          <div className="mb-14 pb-10 border-b border-white/10 flex flex-col lg:flex-row items-start lg:items-baseline justify-between gap-6">
            <div className="space-y-1 max-w-xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#8E9790]">
                Aura Dental Atelier // Bengaluru
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-white tracking-tight">
                Architectural dentistry guided by biological preservation.
              </h3>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="#appointment"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#B8EEE8] hover:underline"
              >
                <span>Reserve Visit</span>
                <IconMark name="arrow-right" className="w-3 h-3" />
              </a>
              <span className="text-white/20">|</span>
              <a
                href={formatTelLink(business.contact.phone)}
                className="text-xs font-mono uppercase tracking-wider text-[#9AA29D] hover:text-white transition-colors"
              >
                {business.contact.displayPhone}
              </a>
            </div>
          </div>
        </Reveal>

        {/* Main Grid Tier with Staggered Entrance */}
        <Stagger
          staggerDelay={80}
          baseDelay={120}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10"
        >
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="text-2xl font-display font-bold tracking-wider text-white">
                {business.logoText.primary}
              </span>
              {business.logoText.secondary && (
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#B8EEE8] font-medium -mt-0.5">
                  {business.logoText.secondary}
                </p>
              )}
            </div>
            <p className="text-sm text-[#A0A7A1] leading-relaxed pr-4">
              {business.tagline}
            </p>
            <p className="text-xs text-[#7C857E] italic">
              {business.category}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-[#B8EEE8]">
              Navigation
            </p>
            <ul className="space-y-2.5 text-sm text-[#A0A7A1]">
              {business.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="link-editorial hover:text-[#F7F6F2] transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-[#B8EEE8]">
              Consultation Hours
            </p>
            <ul className="space-y-2.5 text-xs text-[#A0A7A1]">
              {business.hours.map((item, idx) => (
                <li key={idx} className="flex flex-col">
                  <span className="text-[#F7F6F2] font-medium">{item.days}</span>
                  <span className="text-[#8E9790]">{item.hours}</span>
                </li>
              ))}
            </ul>
            {business.contact.emergencyPhone && (
              <div className="pt-2 border-t border-white/10 text-xs">
                <p className="text-[#DFE4DC] font-medium">After-Hours Care:</p>
                <a
                  href={formatTelLink(business.contact.emergencyPhone)}
                  className="text-[#B8EEE8] hover:underline"
                >
                  {business.contact.displayEmergencyPhone}
                </a>
              </div>
            )}
          </div>

          {/* Col 4: Studio Location */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-[#B8EEE8]">
              Studio Location
            </p>
            <div className="text-sm text-[#A0A7A1] space-y-2">
              <p className="leading-relaxed">
                {business.contact.address.street}
                {business.contact.address.suiteOrFloor && (
                  <>
                    <br />
                    {business.contact.address.suiteOrFloor}
                  </>
                )}
                <br />
                {business.contact.address.city}, {business.contact.address.stateOrProvince}{' '}
                {business.contact.address.postalCode}
              </p>
              {business.contact.mapUrl && (
                <a
                  href={business.contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#B8EEE8] hover:underline pt-1 transition-transform duration-200 hover:translate-x-0.5"
                >
                  <span>Open in Google Maps</span>
                  <IconMark name="arrow-up-right" className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="pt-2 text-xs text-[#8E9790] space-y-1">
              <p>Email: <a href={`mailto:${business.contact.email}`} className="text-[#F7F6F2] hover:underline">{business.contact.email}</a></p>
              <p>Tel: <a href={formatTelLink(business.contact.phone)} className="text-[#F7F6F2] hover:underline">{business.contact.displayPhone}</a></p>
            </div>
          </div>
        </Stagger>

        {/* Bottom Tier: Copyright & Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#7C857E]">
          <p>© {currentYear} {business.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#A0A7A1] cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#A0A7A1] cursor-pointer transition-colors">Patient Notice</span>
            <span>•</span>
            <span className="hover:text-[#A0A7A1] cursor-pointer transition-colors">Accessibility</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
