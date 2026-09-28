import React, { useState } from 'react';
import type { FaqsData, FAQItem } from '../../types/business';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Stagger } from '../ui/Stagger';

interface FAQSectionProps {
  faqs: FaqsData;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const isArray = Array.isArray(faqs);
  const items: FAQItem[] = isArray ? faqs : (faqs?.items || []);
  const eyebrow = (!isArray && faqs?.eyebrow) || 'Informed Decisions';
  const headline = (!isArray && faqs?.headline) || 'Frequently Asked Questions';
  const description =
    (!isArray && faqs?.description) ||
    'Clear answers to common questions regarding initial visits, biomimetic techniques, and patient comfort protocols.';

  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set([items[0]?.id || ''])
  );

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (!items || items.length === 0) return null;

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#EFECE6]/40 border-t border-[rgba(27,29,28,0.08)] overflow-hidden">
      <Container size="narrow">
        <Reveal direction="up" delay={60}>
          <div className="mb-14 text-center">
            <SectionHeading
              eyebrow={eyebrow}
              headline={headline}
              description={description}
              align="center"
              size="md"
            />
          </div>
        </Reveal>

        {/* Accordion List with Flat Editorial Dividers */}
        <div className="border-t border-[rgba(27,29,28,0.15)] divide-y divide-[rgba(27,29,28,0.12)]">
          <Stagger staggerDelay={60} baseDelay={120}>
            {items.map((item, idx) => {
              const isOpen = openIds.has(item.id);
              const contentId = `faq-content-${item.id}`;
              const headerId = `faq-header-${item.id}`;

              return (
                <div
                  key={item.id}
                  className="group py-6 sm:py-8 transition-colors duration-200"
                >
                  <h3>
                    <button
                      id={headerId}
                      type="button"
                      onClick={() => toggleFAQ(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                      className="flex w-full items-start justify-between gap-6 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#226760]"
                    >
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        <span className="font-mono text-xs text-[#7B857F] shrink-0 font-medium">
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                        <span className="font-display text-lg sm:text-xl font-medium text-[#1B1D1C] group-hover:text-[#226760] transition-colors duration-200">
                          {item.question}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 pt-0.5">
                        {item.category && (
                          <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest uppercase text-[#7B857F]">
                            {item.category}
                          </span>
                        )}
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(27,29,28,0.2)] text-[#1B1D1C] transition-all duration-300 ${
                            isOpen ? 'bg-[#1B1D1C] text-[#F7F6F2] border-[#1B1D1C]' : 'group-hover:border-[rgba(27,29,28,0.5)]'
                          }`}
                        >
                          <span className="font-mono text-sm leading-none font-light">
                            {isOpen ? '−' : '+'}
                          </span>
                        </span>
                      </div>
                    </button>
                  </h3>

                  {/* Smooth Accordion Height & Opacity Drawer */}
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className={`accordion-grid ${
                      isOpen ? 'accordion-grid-open' : 'accordion-grid-closed'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pl-8 sm:pl-12 pr-4 pt-4 text-sm sm:text-base text-[#5C645E] leading-relaxed font-normal animate-in fade-in duration-300">
                        <p>{item.answer}</p>
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
