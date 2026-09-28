import React, { useState } from 'react';
import type { Specialization } from '../../types/business';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { IconMark } from '../ui/IconMark';
import { Reveal } from '../ui/Reveal';

interface SpecializationsSectionProps {
  specializations: Specialization[];
}

export const SpecializationsSection: React.FC<SpecializationsSectionProps> = ({
  specializations,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!specializations || specializations.length === 0) return null;

  const currentSpec = specializations[activeTab] || specializations[0];

  return (
    <section id="specializations" className="py-20 sm:py-28 bg-[#171918] text-[#F7F6F2] overflow-hidden">
      <Container>
        {/* Header */}
        <Reveal direction="up" delay={60}>
          <div className="mb-14 sm:mb-20">
            <SectionHeading
              eyebrow="Specialized Focus Areas"
              headline="Complex rehabilitations executed with architectural accuracy."
              description="Our advanced clinical specializations address intricate restorative challenges, bite dysfunction, and severe dental apprehension."
              dark
              size="lg"
            />
          </div>
        </Reveal>

        {/* Tab Selector Buttons with Smooth Transitions */}
        <Reveal direction="up" delay={120}>
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 pb-4 border-b border-white/10">
            {specializations.map((spec, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'border border-[#B8EEE8] bg-[#B8EEE8]/10 text-[#B8EEE8]'
                      : 'border border-white/10 bg-white/5 text-[#8E9790] hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="opacity-70">0{idx + 1}</span>
                  <span className="font-sans font-medium text-xs tracking-normal">{spec.title}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Focus Area Presentation Frame */}
        <div className="border border-white/10 bg-[#161817] p-6 sm:p-10 lg:p-12 rounded-sm relative">
          {/* Architectural corner marks */}
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-[#B8EEE8]/50" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-[#B8EEE8]/50" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-[#B8EEE8]/50" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-[#B8EEE8]/50" />

          <div
            key={currentSpec.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start animate-in fade-in duration-400"
          >
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B8EEE8]" />
                  <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#B8EEE8]/90 font-medium">
                    Clinical Focus 0{activeTab + 1}
                  </p>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-medium text-white">
                  {currentSpec.title}
                </h3>
                <p className="text-sm sm:text-base font-serif italic text-[#B8EEE8]">
                  {currentSpec.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#9AA29D] leading-relaxed font-normal">
                {currentSpec.description}
              </p>

              {/* Highlights */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8E9790]">
                  Clinical Methodology
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#DFE4DC]">
                  {currentSpec.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <IconMark name="check" className="w-3.5 h-3.5 text-[#B8EEE8] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <Button
                  href="#appointment"
                  variant="aqua"
                  size="md"
                  iconRight={<IconMark name="arrow-right" className="w-4 h-4" />}
                >
                  Consult Regarding {currentSpec.title}
                </Button>
              </div>
            </div>

            {/* Right Panel: Suitable For & Patient Profile */}
            <div className="lg:col-span-5 border border-white/10 bg-[#121413] p-6 sm:p-8 rounded-sm space-y-6">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8E9790] mb-1">
                  Clinical Candidacy
                </p>
                <h4 className="font-display text-lg text-white font-medium">
                  Ideal Indications
                </h4>
              </div>

              <div className="divide-y divide-white/10">
                {currentSpec.suitableFor.map((item, i) => (
                  <div
                    key={i}
                    className="py-3 flex items-center gap-3 text-xs text-[#DFE4DC]"
                  >
                    <IconMark name="badge-check" className="w-4 h-4 text-[#B8EEE8] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-[#7E8882] leading-relaxed italic">
                <p>
                  * Every case begins with thorough 3D volumetric diagnostics and physical or digital mock-ups before treatment commitment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

