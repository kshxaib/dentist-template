import React, { useState, useRef } from 'react';
import type { Business } from '../types/business';
import { getBusinessData } from '../lib/business';
import { SeoManager } from '../components/seo/SeoManager';
import { AnnouncementBar } from '../components/sections/AnnouncementBar';
import { SiteHeader } from '../components/layout/SiteHeader';
import { FullscreenMenu } from '../components/layout/FullscreenMenu';
import { HeroSection } from '../components/sections/HeroSection';
import { TrustStrip } from '../components/sections/TrustStrip';
import { AboutSection } from '../components/sections/AboutSection';
import { DentistIntroSection } from '../components/sections/DentistIntroSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { SpecializationsSection } from '../components/sections/SpecializationsSection';
import { TechnologySection } from '../components/sections/TechnologySection';
import { GallerySection } from '../components/sections/GallerySection';
import { BenefitsSection } from '../components/sections/BenefitsSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { FAQSection } from '../components/sections/FAQSection';
import { AppointmentSection } from '../components/sections/AppointmentSection';
import { ContactSection } from '../components/sections/ContactSection';
import { SiteFooter } from '../components/layout/SiteFooter';

export interface AppProps {
  businessData?: Partial<Business>;
}

export const App: React.FC<AppProps> = ({ businessData }) => {
  const business = getBusinessData(businessData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="relative min-h-screen bg-[#F7F6F2] text-[#1B1D1C] overflow-x-hidden font-sans antialiased selection:bg-[#B8EEE8] selection:text-[#171918]">
      {/* 1. Dynamic SEO & Metadata Manager */}
      <SeoManager seo={business.seo} fallbackTitle={business.name} />

      {/* 2. Fullscreen Editorial Navigation Overlay */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        business={business}
        triggerRef={menuTriggerRef}
      />

      {/* Stage 2: Main Background Page Content with Smooth Cinematic Receding Depth */}
      <div
        className={`min-h-screen flex flex-col transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen
            ? 'scale-[0.988] opacity-40 blur-[1px] pointer-events-none'
            : 'scale-100 opacity-100 blur-0'
        }`}
      >
        {/* Announcement Banner (Data-driven & Dismissible) */}
        <AnnouncementBar announcement={business.announcement} />

        {/* Sticky Responsive Header */}
        <SiteHeader
          business={business}
          isMenuOpen={isMenuOpen}
          onOpenMenu={() => setIsMenuOpen(true)}
          menuTriggerRef={menuTriggerRef}
        />

        {/* Main Page Sections */}
        <main className="flex-grow">
          {/* Section 1: Hero */}
          <HeroSection business={business} />

          {/* Section 2: Statistics & Trust Strip */}
          <TrustStrip statistics={business.statistics} />

          {/* Section 3: Philosophy & Biomimetic Overview */}
          <AboutSection about={business.about} />

          {/* Section 4: Clinical Director Profile */}
          <DentistIntroSection dentist={business.dentist} />

          {/* Section 5: Services Disciplines */}
          <ServicesSection services={business.services} />

          {/* Section 6: Specializations & Complex Focus Areas */}
          <SpecializationsSection specializations={business.specializations} />

          {/* Section 7: Modern Digital Technology */}
          <TechnologySection technology={business.technology} />

          {/* Section 8: Studio & Clinical Gallery */}
          <GallerySection gallery={business.gallery} />

          {/* Section 9: Patient-Centered Principles */}
          <BenefitsSection benefits={business.benefits} />

          {/* Section 10: Patient Experiences & Reviews */}
          <TestimonialsSection testimonials={business.testimonials} />

          {/* Section 11: Patient FAQs Accordion */}
          <FAQSection faqs={business.faqs} />

          {/* Section 12: Appointment / Consultation Request */}
          <AppointmentSection business={business} />

          {/* Section 13: Studio Location & Concierge Details */}
          <ContactSection business={business} />
        </main>

        {/* Site Footer */}
        <SiteFooter business={business} />
      </div>
    </div>
  );
};

export default App;
