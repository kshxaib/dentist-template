import React, { useEffect } from 'react';
import type { SeoConfig } from '../../types/business';

interface SeoManagerProps {
  seo: SeoConfig;
  fallbackTitle?: string;
}

export const SeoManager: React.FC<SeoManagerProps> = ({ seo, fallbackTitle }) => {
  useEffect(() => {
    // 1. Title
    const title = seo.title || fallbackTitle || 'Aura Dental Atelier';
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (nameOrProperty: string, content: string, isProperty = false) => {
      if (!content) return;
      const selector = isProperty
        ? `meta[property="${nameOrProperty}"]`
        : `meta[name="${nameOrProperty}"]`;
      let tag = document.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        if (isProperty) {
          tag.setAttribute('property', nameOrProperty);
        } else {
          tag.setAttribute('name', nameOrProperty);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 2. Standard Meta
    if (seo.metaDescription) {
      setMetaTag('description', seo.metaDescription);
    }
    if (seo.keywords && seo.keywords.length > 0) {
      setMetaTag('keywords', seo.keywords.join(', '));
    }

    // 3. Open Graph Meta
    setMetaTag('og:title', seo.ogTitle || title, true);
    if (seo.ogDescription || seo.metaDescription) {
      setMetaTag('og:description', seo.ogDescription || seo.metaDescription, true);
    }
    if (seo.ogImage) {
      setMetaTag('og:image', seo.ogImage, true);
    }
    setMetaTag('og:type', 'website', true);

    // 4. Canonical Link
    if (seo.canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', seo.canonicalUrl);
    }
  }, [seo, fallbackTitle]);

  return null;
};
