import React from 'react';
import type { Statistic } from '../../types/business';
import { Container } from '../ui/Container';
import { Stagger } from '../ui/Stagger';

interface TrustStripProps {
  statistics: Statistic[];
}

export const TrustStrip: React.FC<TrustStripProps> = ({ statistics }) => {
  if (!statistics || statistics.length === 0) return null;

  return (
    <section id="trust" className="border-y border-[rgba(27,29,28,0.1)] bg-[#F2EFE9]/60 py-10 sm:py-14 overflow-hidden">
      <Container>
        <Stagger
          staggerDelay={80}
          baseDelay={80}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[rgba(27,29,28,0.1)]"
        >
          {statistics.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col space-y-2 ${
                idx > 0 ? 'pt-6 md:pt-0 md:pl-8' : ''
              }`}
            >
              <span className="font-display text-3xl sm:text-4xl md:text-[44px] font-normal tracking-tight text-[#1B1D1C] leading-none">
                {stat.value}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#226760] font-semibold">
                {stat.label}
              </span>
              {stat.description && (
                <p className="text-xs text-[#69716B] leading-relaxed max-w-xs">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
};
