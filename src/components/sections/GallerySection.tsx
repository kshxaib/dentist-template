import React, { useState } from 'react';
import type { GalleryItem } from '../../types/business';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { MediaFrame } from '../ui/MediaFrame';
import { Reveal } from '../ui/Reveal';
import { Stagger } from '../ui/Stagger';

interface GallerySectionProps {
  gallery: {
    eyebrow: string;
    headline: string;
    description: string;
    items: GalleryItem[];
  };
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    ...Array.from(new Set(gallery.items.map((item) => item.category))),
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? gallery.items
      : gallery.items.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 sm:py-28 lg:py-32 overflow-hidden">
      <Container>
        {/* Header & Filter Controls */}
        <Reveal direction="up" delay={60}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <SectionHeading
              eyebrow={gallery.eyebrow}
              headline={gallery.headline}
              description={gallery.description}
              size="lg"
            />

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? 'border border-[#1B1D1C] bg-[#1B1D1C] text-[#F7F6F2]'
                      : 'border border-[rgba(27,29,28,0.12)] bg-transparent text-[#69716B] hover:text-[#1B1D1C] hover:border-[rgba(27,29,28,0.3)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Photography Grid with Staggered Entrance */}
        <div key={selectedCategory}>
          <Stagger
            staggerDelay={70}
            baseDelay={100}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
          >
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className={`group flex flex-col ${
                  idx === 0 && selectedCategory === 'All' ? 'md:col-span-2' : ''
                }`}
              >
                <div className="border border-[rgba(27,29,28,0.12)] p-2 sm:p-2.5 bg-[#F2EFE9] rounded-sm relative">
                  <MediaFrame
                    asset={item.image}
                    aspectRatio={
                      idx === 0 && selectedCategory === 'All'
                        ? 'wide'
                        : item.aspectRatio || 'landscape'
                    }
                    badgeText={item.category}
                    caption={item.caption}
                    interactive
                  />
                </div>

                <div className="mt-3.5 space-y-1">
                  <div className="flex items-baseline justify-between gap-4 border-b border-[rgba(27,29,28,0.08)] pb-2">
                    <h3 className="font-display text-base sm:text-lg font-medium text-[#1B1D1C] group-hover:text-[#226760] transition-colors duration-200">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#226760] font-semibold shrink-0">
                      {item.category}
                    </span>
                  </div>
                  {item.caption && (
                    <p className="text-xs text-[#69716B] italic pt-1 font-serif">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
};
