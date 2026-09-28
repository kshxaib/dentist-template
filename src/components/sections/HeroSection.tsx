import React from 'react';
import type { Business } from '../../types/business';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { MediaFrame } from '../ui/MediaFrame';
import { IconMark } from '../ui/IconMark';
import { Reveal } from '../ui/Reveal';
import { AnimatedText } from '../ui/AnimatedText';
import { ImageReveal } from '../ui/ImageReveal';
import { formatTelLink } from '../../lib/business';

interface HeroSectionProps {
  business: Business;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ business }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-28">
      {/* Subtle ambient architectural grid in the background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(rgba(27, 29, 28, 0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-8">
            <Reveal direction="down" delay={60}>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#226760]" />
                <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#525B55] font-medium">
                  {business.category}
                </span>
                <span className="text-xs text-[#BAC3BD] font-mono">/</span>
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#768079]">
                  {business.contact.address.city}, {business.contact.address.stateOrProvince}
                </span>
              </div>
            </Reveal>

            {/* Editorial Headline with Word-by-Word Reveal */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-medium tracking-tight text-[#1B1D1C] leading-[1.06]">
              <AnimatedText
                text={business.heroHeadline}
                as="span"
                delay={120}
                staggerDelay={35}
              />
            </h1>

            <Reveal direction="up" delay={260}>
              <p className="text-lg sm:text-xl text-[#5C645E] leading-relaxed max-w-2xl font-normal">
                {business.heroDescription}
              </p>
            </Reveal>

            {/* Action Buttons */}
            <Reveal direction="up" delay={360} className="w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
                <Button
                  href="#appointment"
                  variant="primary"
                  size="lg"
                  className="group"
                  iconRight={
                    <IconMark
                      name="arrow-right"
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  }
                >
                  Reserve Consultation
                </Button>
                <Button
                  href={formatTelLink(business.contact.phone)}
                  variant="outline"
                  size="lg"
                  className="group"
                  iconLeft={
                    <IconMark
                      name="phone"
                      className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                    />
                  }
                >
                  {business.contact.displayPhone}
                </Button>
              </div>
            </Reveal>

            {/* Micro reassurance strip */}
            <Reveal direction="up" delay={460} className="w-full">
              <div className="pt-6 border-t border-[rgba(27,29,28,0.12)] w-full">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono uppercase tracking-wider text-[#69716B]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#226760] font-semibold">01</span>
                    <span className="text-[11px]">Unhurried 45-Min Care</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#226760] font-semibold">02</span>
                    <span className="text-[11px]">Conservative Treatment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#226760] font-semibold">03</span>
                    <span className="text-[11px]">3D Digital Precision</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Hero Media Area */}
          <div className="lg:col-span-5 relative">
            <ImageReveal delay={200} duration={1000} className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative border border-[rgba(27,29,28,0.12)] bg-[#F0EEE9] p-2.5 sm:p-3 rounded-sm shadow-xs">
                {/* Corner registration marks */}
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#1B1D1C]/40 pointer-events-none" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#1B1D1C]/40 pointer-events-none" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#1B1D1C]/40 pointer-events-none" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#1B1D1C]/40 pointer-events-none" />

                <MediaFrame
                  asset={{
                    src: null,
                    alt: `${business.name} clinical operatory suite and treatment environment`,
                    caption: 'Atmospheric Consultation Suite with Natural Daylight',
                  }}
                  aspectRatio="portrait"
                  badgeText="Studio Environment"
                  priority
                />

                {/* Integrated doctor and studio signature bar */}
                <div className="mt-3 pt-3 border-t border-[rgba(27,29,28,0.08)] flex items-center justify-between px-1">
                  <div>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-[#737C76]">
                      Clinical Lead
                    </p>
                    <p className="text-sm font-display font-medium text-[#1B1D1C]">
                      {business.dentist.name}
                    </p>
                    <p className="text-[11px] text-[#69716B]">
                      {business.dentist.credentials}
                    </p>
                  </div>
                  <a
                    href="#dentist"
                    className="group flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#1B1D1C] hover:text-[#226760] transition-colors duration-200"
                    aria-label="Read doctor profile"
                  >
                    <span>Profile</span>
                    <IconMark name="arrow-right" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </ImageReveal>
          </div>
        </div>

        {/* Cinematic Scroll Indicator */}
        <Reveal direction="fade" delay={700} className="hidden md:flex justify-center pt-16">
          <a
            href="#about"
            aria-label="Scroll to philosophy section"
            className="group flex flex-col items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8E9790] hover:text-[#1B1D1C] transition-colors duration-300"
          >
            <span>Explore Practice</span>
            <div className="flex h-7 w-4 items-start justify-center rounded-full border border-[rgba(27,29,28,0.2)] p-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1B1D1C] animate-scroll-indicator" />
            </div>
          </a>
        </Reveal>
      </Container>
    </section>
  );
};
