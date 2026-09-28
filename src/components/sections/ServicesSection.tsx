import React, { useState } from 'react';
import type { Service } from '../../types/business';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { IconMark } from '../ui/IconMark';
import { Reveal } from '../ui/Reveal';
import { Stagger } from '../ui/Stagger';

interface ServicesSectionProps {
  services: Service[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setExpandedServiceId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="py-20 sm:py-28 lg:py-32 overflow-hidden">
      <Container>
        {/* Section Header */}
        <Reveal direction="up" delay={60}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <SectionHeading
              eyebrow="Clinical Spectrum"
              headline="Comprehensive dental disciplines delivered with biomimetic care."
              description="From preventive maintenance to intricate ceramic restorations, our treatments prioritize biological longevity and aesthetic discretion."
              size="lg"
            />
            <div className="shrink-0">
              <span className="text-xs font-mono uppercase tracking-widest text-[#69716B]">
                {services.length} Core Disciplines
              </span>
            </div>
          </div>
        </Reveal>

        {/* Editorial Rows Layout with Staggered Entrance */}
        <div className="border-t border-[rgba(27,29,28,0.15)] divide-y divide-[rgba(27,29,28,0.12)]">
          <Stagger staggerDelay={80} baseDelay={120}>
            {services.map((service) => {
              const isExpanded = expandedServiceId === service.id;

              return (
                <div
                  key={service.id}
                  className={`group py-8 sm:py-10 transition-colors duration-300 ${
                    isExpanded ? 'bg-[#F2EFE9]/40' : 'hover:bg-[#F2EFE9]/20'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    {/* Service Number & Category */}
                    <div className="lg:col-span-2 flex items-center lg:flex-col lg:items-start justify-between gap-2">
                      <span className="font-mono text-xs sm:text-sm font-medium text-[#7A837E]">
                        {service.number}
                      </span>
                      <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#226760] font-semibold">
                        {service.category}
                      </span>
                    </div>

                    {/* Title & Short Description */}
                    <div className="lg:col-span-6 space-y-2">
                      <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1B1D1C] group-hover:text-[#226760] transition-colors duration-300">
                        {service.title}
                      </h3>
                      {service.tagline && (
                        <p className="text-sm font-serif italic text-[#69716B]">
                          {service.tagline}
                        </p>
                      )}
                      <p className="text-sm sm:text-base text-[#5C645E] leading-relaxed pt-1 font-normal">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Action Trigger */}
                    <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between h-full gap-4">
                      <button
                        type="button"
                        onClick={() => toggleService(service.id)}
                        aria-expanded={isExpanded}
                        className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,29,28,0.2)] px-4 py-1.5 text-[11px] font-mono font-medium uppercase tracking-wider text-[#1B1D1C] hover:bg-[#1B1D1C] hover:text-[#F7F6F2] active:scale-95 transition-all duration-300 cursor-pointer select-none"
                      >
                        <span>{isExpanded ? 'Close Protocol' : 'Clinical Details'}</span>
                        <IconMark
                          name={isExpanded ? 'close' : 'chevron-down'}
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            isExpanded ? 'rotate-90' : 'group-hover:translate-y-0.5'
                          }`}
                        />
                      </button>

                      {service.recommendedFor && (
                        <span className="text-xs text-[#69716B] text-left lg:text-right hidden sm:block font-normal">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#1B1D1C] font-semibold">Indication: </span>
                          {service.recommendedFor}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Smooth Accordion Drawer Content */}
                  <div
                    className={`accordion-grid ${
                      isExpanded ? 'accordion-grid-open mt-8 pt-8 border-t border-[rgba(27,29,28,0.12)]' : 'accordion-grid-closed'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-4 animate-in fade-in duration-300">
                        <div className="md:col-span-7 space-y-4">
                          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#226760] font-semibold">
                            Clinical Approach & Rationale
                          </p>
                          <p className="text-sm sm:text-base text-[#5C645E] leading-relaxed font-normal">
                            {service.fullDescription}
                          </p>
                        </div>

                        <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-[rgba(27,29,28,0.12)] pt-4 md:pt-0 md:pl-8 space-y-4">
                          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#1B1D1C] font-semibold">
                            Key Protocol Milestones
                          </p>
                          <ul className="space-y-2.5 text-xs text-[#5C645E]">
                            {service.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <span className="text-[#226760] font-mono font-bold text-[10px] pt-0.5">
                                  {(i + 1).toString().padStart(2, '0')}
                                </span>
                                <span className="leading-relaxed">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="pt-3 border-t border-[rgba(27,29,28,0.08)]">
                            <a
                              href="#appointment"
                              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#226760] hover:text-[#1B1D1C] font-medium transition-colors duration-200"
                            >
                              <span>Consult for {service.title}</span>
                              <IconMark name="arrow-right" className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </section>
  );
};
