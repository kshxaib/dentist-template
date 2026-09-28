import React from 'react';
import type { BenefitItem } from '../../types/business';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { IconMark } from '../ui/IconMark';
import { Reveal } from '../ui/Reveal';
import { Stagger } from '../ui/Stagger';

interface BenefitsSectionProps {
  benefits: {
    eyebrow: string;
    headline: string;
    description: string;
    items: BenefitItem[];
  };
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ benefits }) => {
  return (
    <section id="benefits" className="py-20 sm:py-28 bg-[#EFECE6]/50 border-t border-[rgba(27,29,28,0.08)] overflow-hidden">
      <Container>
        <Reveal direction="up" delay={60}>
          <div className="mb-16">
            <SectionHeading
              eyebrow={benefits.eyebrow}
              headline={benefits.headline}
              description={benefits.description}
              size="lg"
            />
          </div>
        </Reveal>

        {/* 4 Column Numbered Editorial Pillars with Staggered Entrance */}
        <Stagger
          staggerDelay={90}
          baseDelay={120}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[rgba(27,29,28,0.12)]"
        >
          {benefits.items.map((item, idx) => (
            <div
              key={item.number}
              className={`group flex flex-col justify-between space-y-6 transition-colors duration-300 ${
                idx > 0 ? 'pt-8 lg:pt-0 lg:pl-8' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold text-[#226760] tracking-[0.2em]">
                    STANDARD // {item.number}
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-[#226760]" />
                </div>

                <h3 className="font-display text-2xl font-medium text-[#1B1D1C] group-hover:text-[#226760] transition-colors duration-200">
                  {item.title}
                </h3>

                <p className="text-sm text-[#5C645E] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {item.detail && (
                <div className="pt-4 border-t border-[rgba(27,29,28,0.08)] flex items-start gap-2 text-xs text-[#69716B]">
                  <IconMark name="info" className="w-4 h-4 text-[#226760] shrink-0 mt-0.5" />
                  <span>{item.detail}</span>
                </div>
              )}
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
};
