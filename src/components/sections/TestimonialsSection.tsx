import React from 'react';
import type { TestimonialsData, Testimonial } from '../../types/business';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Stagger } from '../ui/Stagger';

interface TestimonialsSectionProps {
  testimonials: TestimonialsData;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
}) => {
  const isArray = Array.isArray(testimonials);
  const items: Testimonial[] = isArray ? testimonials : (testimonials?.items || []);
  const eyebrow = (!isArray && testimonials?.eyebrow) || 'Patient Perspectives';
  const headline =
    (!isArray && testimonials?.headline) ||
    'Experiences shaped by empathy, precision, and unhurried care.';
  const description =
    (!isArray && testimonials?.description) ||
    'Read reflections from individuals who have entrusted their oral health and smile rehabilitations to our clinical team.';

  if (!items || items.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 sm:py-28 lg:py-32 overflow-hidden">
      <Container>
        <Reveal direction="up" delay={60}>
          <div className="mb-16">
            <SectionHeading
              eyebrow={eyebrow}
              headline={headline}
              description={description}
              size="lg"
            />
          </div>
        </Reveal>

        {/* Editorial Testimonials Grid with Staggered Entrance */}
        <Stagger staggerDelay={80} baseDelay={140} className="grid grid-cols-1 lg:grid-cols-3 gap-10 divide-y lg:divide-y-0 lg:divide-x divide-[rgba(27,29,28,0.12)]">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`flex flex-col justify-between space-y-8 ${
                idx > 0 ? 'pt-8 lg:pt-0 lg:pl-10' : ''
              }`}
            >
              <div className="space-y-4">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#737C76]">
                  Perspective // 0{idx + 1}
                </span>

                {/* Large Serif Quotation */}
                <blockquote className="font-display italic text-lg sm:text-xl text-[#1B1D1C] leading-relaxed">
                  "{item.quote}"
                </blockquote>
              </div>

              {/* Author & Treatment */}
              <div className="pt-4 border-t border-[rgba(27,29,28,0.1)] flex items-end justify-between">
                <div>
                  <p className="font-display font-medium text-base text-[#1B1D1C]">
                    {item.author}
                  </p>
                  {item.treatment && (
                    <p className="text-xs font-mono tracking-wider uppercase text-[#69716B] mt-0.5">
                      {item.treatment}
                    </p>
                  )}
                </div>

                {item.verified && (
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#226760] font-semibold">
                    Clinical Record
                  </span>
                )}
              </div>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
};
