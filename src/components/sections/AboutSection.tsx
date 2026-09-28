import React from 'react';
import type { AboutSectionData } from '../../types/business';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { MediaFrame } from '../ui/MediaFrame';
import { IconMark } from '../ui/IconMark';
import { Reveal } from '../ui/Reveal';
import { Stagger } from '../ui/Stagger';
import { ImageReveal } from '../ui/ImageReveal';

interface AboutSectionProps {
  about: AboutSectionData;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
  return (
    <section id="about" className="py-20 sm:py-28 lg:py-32 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Paragraphs */}
          <div className="lg:col-span-7 space-y-10">
            <Reveal direction="up" delay={60}>
              <SectionHeading
                eyebrow={about.eyebrow}
                headline={about.headline}
                size="lg"
              />
            </Reveal>

            <Reveal direction="up" delay={180}>
              <div className="space-y-6 text-[#5C645E] text-base sm:text-lg leading-relaxed">
                {about.paragraphs.map((para, idx) => (
                  <p key={idx} className={idx === 0 ? "text-lg sm:text-xl text-[#2B302D] font-normal leading-relaxed" : ""}>
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>

            {/* Philosophy 3-part editorial manifesto */}
            <div className="pt-2 border-t border-[rgba(27,29,28,0.12)]">
              <Stagger staggerDelay={80} baseDelay={250} className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6">
                {about.philosophy.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <span className="text-xs font-mono tracking-widest text-[#226760] font-semibold">
                      {(idx + 1).toString().padStart(2, '0')} —
                    </span>
                    <h3 className="font-display text-base font-medium text-[#1B1D1C]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#69716B] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </Stagger>
            </div>
          </div>

          {/* Right Column: Architectural Photography Frame */}
          <div className="lg:col-span-5 space-y-6">
            <ImageReveal delay={150} duration={900} className="relative">
              <div className="border border-[rgba(27,29,28,0.12)] p-2 sm:p-2.5 bg-[#F2EFE9] rounded-sm">
                <MediaFrame
                  asset={about.media}
                  aspectRatio="portrait"
                  badgeText="Consultation Atmosphere"
                  caption={about.media?.caption || 'Sanctuary of peace, acoustic dampening, and clinical mastery'}
                  interactive
                />
              </div>

              {/* Minimal architectural feature indicator */}
              <div className="pt-4 border-t border-[rgba(27,29,28,0.12)] flex items-start gap-3.5">
                <div className="pt-0.5 text-[#226760] shrink-0">
                  <IconMark name="shield-check" className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#1B1D1C] font-semibold">
                    Biomimetic Standard
                  </p>
                  <p className="text-xs text-[#69716B] leading-relaxed">
                    Replicating the micro-biomechanics of natural enamel to preserve long-term oral architecture without unnecessary intervention.
                  </p>
                </div>
              </div>
            </ImageReveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
