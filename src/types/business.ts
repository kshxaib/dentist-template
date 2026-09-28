export interface MediaAsset {
  src?: string | null;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface BusinessContact {
  phone: string;
  displayPhone: string;
  emergencyPhone?: string;
  displayEmergencyPhone?: string;
  email: string;
  notificationEmail?: string;
  address: {
    street: string;
    suiteOrFloor?: string;
    city: string;
    stateOrProvince: string;
    postalCode: string;
    country: string;
    fullAddress: string;
  };
  mapUrl?: string;
  mapEmbedQuery?: string;
  whatsappNumber?: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
  };
}

export interface BusinessHours {
  days: string;
  hours: string;
  isClosed?: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
  isPrimaryCta?: boolean;
  description?: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tagline?: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  recommendedFor?: string;
  image?: MediaAsset;
}

export interface Specialization {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  suitableFor: string[];
  image?: MediaAsset;
}

export interface DentistHighlight {
  label: string;
  value: string;
}

export interface DentistProfile {
  name: string;
  role: string;
  credentials: string;
  introduction: string;
  extendedBio: string[];
  quote?: string;
  signatureName?: string;
  highlights: DentistHighlight[];
  image?: MediaAsset;
  affiliations?: string[];
}

export interface Statistic {
  value: string;
  label: string;
  description?: string;
}

export interface BenefitItem {
  number: string;
  title: string;
  description: string;
  detail?: string;
}

export interface TechnologyItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  patientBenefit: string;
  image?: MediaAsset;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  image: MediaAsset;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  treatment?: string;
  verified?: boolean;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface AppointmentConfig {
  title: string;
  subtitle: string;
  description: string;
  disclaimer: string;
  phonePrompt: string;
  recipientEmail?: string;
  servicesOffered: string[];
  timeSlots: string[];
}

export interface SeoConfig {
  title: string;
  metaDescription: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface AboutSectionData {
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  philosophy: {
    title: string;
    description: string;
  }[];
  media?: MediaAsset;
}

export type TestimonialsData =
  | Testimonial[]
  | {
      eyebrow?: string;
      headline?: string;
      description?: string;
      items: Testimonial[];
    };

export type FaqsData =
  | FAQItem[]
  | {
      eyebrow?: string;
      headline?: string;
      description?: string;
      items: FAQItem[];
    };

export interface Business {
  id: string;
  name: string;
  shortName: string;
  category: string;
  tagline: string;
  heroHeadline: string;
  heroDescription: string;
  announcement?: {
    text: string;
    linkText?: string;
    linkHref?: string;
    isActive: boolean;
  };
  logoText: {
    primary: string;
    secondary?: string;
  };
  contact: BusinessContact;
  hours: BusinessHours[];
  navigation: NavigationItem[];
  statistics: Statistic[];
  dentist: DentistProfile;
  about: AboutSectionData;
  services: Service[];
  specializations: Specialization[];
  technology: {
    eyebrow: string;
    headline: string;
    description: string;
    items: TechnologyItem[];
  };
  gallery: {
    eyebrow: string;
    headline: string;
    description: string;
    items: GalleryItem[];
  };
  benefits: {
    eyebrow: string;
    headline: string;
    description: string;
    items: BenefitItem[];
  };
  testimonials: TestimonialsData;
  faqs: FaqsData;
  appointment: AppointmentConfig;
  seo: SeoConfig;
}
