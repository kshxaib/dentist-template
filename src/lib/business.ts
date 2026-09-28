import demoBusinessData from '../data/demo-business.json';
import type { Business } from '../types/business';

export const defaultBusinessData: Business = demoBusinessData as unknown as Business;

/**
 * Helper to get the active business configuration.
 * In a future phase with multi-tenant dynamic injection, this can read from props, context, or an API manifest.
 */
export function getBusinessData(override?: Partial<Business>): Business {
  if (!override) {
    return defaultBusinessData;
  }
  return {
    ...defaultBusinessData,
    ...override,
  };
}

/**
 * Format a telephone number into a safe tel: link URI
 */
export function formatTelLink(phone: string): string {
  const sanitized = phone.replace(/[^+\d]/g, '');
  return `tel:${sanitized}`;
}

/**
 * Format a WhatsApp number into a clean wa.me link with optional prefilled message
 */
export function formatWhatsAppLink(phone: string, text?: string): string {
  const sanitized = phone.replace(/[^\d]/g, '');
  const base = `https://wa.me/${sanitized}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

/**
 * Format an email address into a mailto: link
 */
export function formatMailtoLink(email: string, subject?: string): string {
  const base = `mailto:${email}`;
  if (!subject) return base;
  return `${base}?subject=${encodeURIComponent(subject)}`;
}
