import React from 'react';
import type { Business } from '../../types/business';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { IconMark } from '../ui/IconMark';
import { Reveal } from '../ui/Reveal';
import { Stagger } from '../ui/Stagger';
import { formatTelLink, formatMailtoLink } from '../../lib/business';

interface ContactSectionProps {
  business: Business;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ business }) => {
  const { contact, hours } = business;

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#EFECE6]/60 border-t border-[rgba(27,29,28,0.08)] overflow-hidden">
      <Container>
        <Reveal direction="up" delay={60}>
          <div className="mb-14">
            <SectionHeading
              eyebrow="Studio Concierge"
              headline="Visiting Aura Dental Atelier"
              description="Our studio is situated in central Bengaluru, designed to provide a quiet, restorative retreat for your dental visits."
              size="lg"
            />
          </div>
        </Reveal>

        {/* 3 Column Architectural Contact Grid with Staggered Entrance */}
        <Stagger staggerDelay={80} baseDelay={120} className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 divide-y md:divide-y-0 md:divide-x divide-[rgba(27,29,28,0.12)]">
          {/* Column 1: Address & Location */}
          <div className="group space-y-6 flex flex-col justify-between pt-6 md:pt-0">
            <div className="space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[rgba(27,29,28,0.12)] bg-[#EFECE6] text-[#226760]">
                <IconMark name="map-pin" className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#69716B] font-medium">
                  Physical Address
                </p>
                <h3 className="font-display text-2xl font-medium text-[#1B1D1C] group-hover:text-[#226760] transition-colors duration-200">
                  Studio Atelier
                </h3>
              </div>

              <div className="text-sm text-[#5C645E] space-y-1 leading-relaxed font-normal">
                <p className="font-medium text-[#1B1D1C]">{business.name}</p>
                <p>{contact.address.street}</p>
                {contact.address.suiteOrFloor && <p>{contact.address.suiteOrFloor}</p>}
                <p>
                  {contact.address.city}, {contact.address.stateOrProvince} {contact.address.postalCode}
                </p>
                <p>{contact.address.country}</p>
              </div>
            </div>

            {contact.mapUrl && (
              <div className="pt-4 border-t border-[rgba(27,29,28,0.08)]">
                <Button
                  href={contact.mapUrl}
                  variant="outline"
                  size="sm"
                  fullWidth
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn"
                  iconRight={
                    <IconMark
                      name="arrow-up-right"
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  }
                >
                  Get Driving Directions
                </Button>
              </div>
            )}
          </div>

          {/* Column 2: Contact & Communications */}
          <div className="group space-y-6 flex flex-col justify-between pt-6 md:pt-0 md:pl-8">
            <div className="space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[rgba(27,29,28,0.12)] bg-[#EFECE6] text-[#226760]">
                <IconMark name="phone" className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#69716B] font-medium">
                  Direct Line
                </p>
                <h3 className="font-display text-2xl font-medium text-[#1B1D1C] group-hover:text-[#226760] transition-colors duration-200">
                  Phone & Dispatch
                </h3>
              </div>

              <div className="text-sm text-[#5C645E] space-y-3">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#69716B]">Appointments & Inquiries:</p>
                  <a
                    href={formatTelLink(contact.phone)}
                    className="font-medium text-[#1B1D1C] hover:text-[#226760] transition-colors duration-200"
                  >
                    {contact.displayPhone}
                  </a>
                </div>

                {contact.emergencyPhone && (
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#69716B]">After-Hours Emergency:</p>
                    <a
                      href={formatTelLink(contact.emergencyPhone)}
                      className="font-medium text-[#1B1D1C] hover:text-[#226760] transition-colors duration-200"
                    >
                      {contact.displayEmergencyPhone}
                    </a>
                  </div>
                )}

                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#69716B]">Concierge Correspondence:</p>
                  <a
                    href={formatMailtoLink(contact.email)}
                    className="font-medium text-[#1B1D1C] hover:text-[#226760] transition-colors duration-200 break-all"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(27,29,28,0.08)]">
              <Button
                href={formatTelLink(contact.phone)}
                variant="primary"
                size="sm"
                fullWidth
                className="group/btn"
                iconLeft={
                  <IconMark
                    name="phone"
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:scale-110"
                  />
                }
              >
                Call Concierge
              </Button>
            </div>
          </div>

          {/* Column 3: Hours & Availability */}
          <div className="group space-y-6 flex flex-col justify-between pt-6 md:pt-0 md:pl-8">
            <div className="space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[rgba(27,29,28,0.12)] bg-[#EFECE6] text-[#226760]">
                <IconMark name="clock" className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#69716B] font-medium">
                  Operating Hours
                </p>
                <h3 className="font-display text-2xl font-medium text-[#1B1D1C] group-hover:text-[#226760] transition-colors duration-200">
                  Consultation Hours
                </h3>
              </div>

              <ul className="space-y-2.5 text-xs text-[#5C645E]">
                {hours.map((h, idx) => (
                  <li key={idx} className="flex justify-between border-b border-[rgba(27,29,28,0.08)] pb-2 transition-colors duration-200 hover:text-[#1B1D1C]">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#1B1D1C] font-medium">{h.days}</span>
                    <span className="text-right text-[#69716B] font-mono text-[11px]">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[rgba(27,29,28,0.08)]">
              <p className="text-xs text-[#69716B] italic font-serif">
                * Prior reservations recommended to guarantee dedicated unhurried diagnostic time.
              </p>
            </div>
          </div>
        </Stagger>
      </Container>
    </section>
  );
};
