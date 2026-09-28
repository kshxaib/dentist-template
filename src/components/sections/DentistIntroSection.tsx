import React from 'react';
import type { DentistProfile } from '../../types/business';
import { Container } from '../ui/Container';
import { MediaFrame } from '../ui/MediaFrame';
import { Button } from '../ui/Button';
import { IconMark } from '../ui/IconMark';
import { Reveal } from '../ui/Reveal';
import { Stagger } from '../ui/Stagger';
import { ImageReveal } from '../ui/ImageReveal';

interface DentistIntroSectionProps {
  dentist: DentistProfile;
}

export const DentistIntroSection: React.FC<DentistIntroSectionProps> = ({ dentist }) => {
  return (
    <section id="dentist" className="py-20 sm:py-28 bg-[#EFECE6]/40 border-t border-[rgba(27,29,28,0.08)] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait & Highlights Frame */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ImageReveal delay={100} duration={850} className="space-y-6">
              <div className="border border-[rgba(27,29,28,0.12)] p-2 sm:p-2.5 bg-[#F2EFE9] rounded-sm relative">
                <MediaFrame
                  asset={dentist.image}
                  aspectRatio="portrait"
                  badgeText="Clinical Leadership"
                  caption={dentist.image?.caption || `${dentist.name}, ${dentist.role}`}
                  interactive
                />
              </div>

              {/* Highlights List as Clean Editorial Data Table */}
              <Stagger staggerDelay={60} baseDelay={250} className="space-y-3 pt-2 border-t border-[rgba(27,29,28,0.12)]">
                {dentist.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-baseline justify-between gap-4 text-xs py-1 border-b border-[rgba(27,29,28,0.06)]">
                    <span className="font-mono uppercase tracking-widest text-[#69716B] text-[10px] font-medium">
                      {item.label}
                    </span>
                    <span className="font-medium text-[#1B1D1C] text-right">
                      {item.value}
                    </span>
                  </div>
                ))}
              </Stagger>

              {/* Professional Affiliations */}
              {dentist.affiliations && dentist.affiliations.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#69716B] block mb-2 font-medium">
                    Affiliations & Fellowship
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dentist.affiliations.map((aff, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 border border-[rgba(27,29,28,0.12)] bg-[#F8F7F4] text-[#414843] rounded-xs"
                      >
                        {aff}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </ImageReveal>
          </div>

          {/* Right Column: Editorial Bio & Philosophy */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 sm:space-y-8">
            <Reveal direction="up" delay={60}>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#226760]" />
                  <p className="text-[11px] font-mono tracking-[0.22em] uppercase font-medium text-[#69726B]">
                    Clinical Direction
                  </p>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1B1D1C] tracking-tight">
                  {dentist.name}
                </h2>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#226760] font-semibold">
                  {dentist.role} <span className="text-[#A4AEA7] font-normal mx-1">/</span> {dentist.credentials}
                </p>
              </div>
            </Reveal>

            {/* Intro Quote Callout */}
            <Reveal direction="left" delay={180}>
              <blockquote className="border-l-2 border-[#1B1D1C] pl-6 py-2 text-lg sm:text-xl font-display italic text-[#1B1D1C] leading-relaxed">
                "{dentist.introduction}"
              </blockquote>
            </Reveal>

            {/* Extended Bio Paragraphs */}
            <Reveal direction="up" delay={260}>
              <div className="space-y-4 text-base text-[#5C645E] leading-relaxed font-normal">
                {dentist.extendedBio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            {/* Signature Block & CTA */}
            <Reveal direction="up" delay={340}>
              <div className="pt-6 border-t border-[rgba(27,29,28,0.12)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="font-display text-lg font-medium text-[#1B1D1C]">
                    {dentist.signatureName || dentist.name}
                  </p>
                  <p className="text-xs text-[#69716B] font-mono tracking-wider uppercase">
                    Lead Clinician & Prosthodontist
                  </p>
                </div>

                <Button
                  href="#appointment"
                  variant="primary"
                  size="md"
                  iconRight={<IconMark name="calendar" className="w-4 h-4" />}
                >
                  Schedule Consultation
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
