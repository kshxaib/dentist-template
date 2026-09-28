import React from 'react';
import type { TechnologyItem } from '../../types/business';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { IconMark, type IconName } from '../ui/IconMark';
import { Reveal } from '../ui/Reveal';
import { Stagger } from '../ui/Stagger';

interface TechnologySectionProps {
  technology: {
    eyebrow: string;
    headline: string;
    description: string;
    items: TechnologyItem[];
  };
}

export const TechnologySection: React.FC<TechnologySectionProps> = ({ technology }) => {
  const getTechIcon = (id: string): IconName => {
    if (id.includes('scan')) return 'scan';
    if (id.includes('cbct')) return 'layers';
    if (id.includes('biofilm')) return 'sparkles';
    if (id.includes('microscope')) return 'microscope';
    return 'shield-check';
  };

  return (
    <section id="technology" className="py-20 sm:py-28 bg-[#171918] text-[#F7F6F2] border-t border-white/10 overflow-hidden">
      <Container>
        <Reveal direction="up" delay={60}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <SectionHeading
              eyebrow={technology.eyebrow}
              headline={technology.headline}
              description={technology.description}
              dark
              size="lg"
            />
          </div>
        </Reveal>

        {/* Precision Technology Grid with Staggered Entrance */}
        <Stagger staggerDelay={80} baseDelay={140} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {technology.items.map((item, idx) => (
            <div
              key={item.id}
              className="group relative border border-white/10 bg-[#151716] p-7 sm:p-9 rounded-sm flex flex-col justify-between space-y-6 transition-colors duration-300 hover:border-white/25 hover:bg-[#181B1A]"
            >
              {/* Subtle top-left corner registration mark */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-[#B8EEE8]">
                    <IconMark name={getTechIcon(item.id)} className="w-5 h-5 opacity-90" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#7D8781]">
                    SYS // 0{idx + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-2xl font-medium text-white group-hover:text-[#B8EEE8] transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#A0A7A1]">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-sm text-[#949E97] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {/* Patient Benefit Highlight Callout */}
              <div className="pt-4 border-t border-white/10 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B8EEE8] font-semibold block">
                  Clinical & Patient Advantage
                </span>
                <p className="text-xs text-[#DFE4DC] leading-relaxed">
                  {item.patientBenefit}
                </p>
              </div>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
};
