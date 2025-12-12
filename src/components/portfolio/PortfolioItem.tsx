import React, { useState } from 'react';
import type { PortfolioItem as PortfolioItemType } from '../../types';
import { MapPin, Instagram } from 'lucide-react';

interface Props {
  item: PortfolioItemType;
  onClick: (item: PortfolioItemType) => void;
}

const PortfolioItem: React.FC<Props> = ({ item, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Derive title and subtitle logic from original script.js
  let title = '';
  let subtitle = '';

  if (item.property) {
    title = item.property;
    subtitle = `${item.brand} • ${item.city}`;
  } else if (item.venue) {
    title = item.venue;
    subtitle = item.city;
  } else if (item.brand) {
    title = item.item || item.brand;
    subtitle = `${item.brand} • ${item.city}`;
  } else {
    title = 'Untitled';
  }

  // Tags logic
  const tags: { text: string; type: 'category' | 'michelin' | 'default' }[] = [];

  if (item.category) tags.push({ text: item.category, type: 'category' });

  if (item.michelinStars && item.michelinStars > 0) {
    tags.push({
      text: `${item.michelinStars} Michelin Star${item.michelinStars > 1 ? 's' : ''}`,
      type: 'michelin'
    });
  }

  if (item.level) tags.push({ text: item.level, type: 'default' });
  if (item.brandCategory) tags.push({ text: item.brandCategory, type: 'default' });
  if (item.type && item.type !== item.category) tags.push({ text: item.type, type: 'default' });

  // Instagram thumbnail logic could go here if we had thumbnails.
  // For now we'll use a placeholder or check if instagramLinks has a resolvable image.
  // We don't have direct image URLs, only instagram links.
  // We can't easily get the image from the instagram link without an API or oEmbed.
  // The original script just showed "Loading Instagram..." and embedded an iframe.
  // Embedding 100 iframes on the grid is heavy.
  // The original script did `setTimeout(() => this.loadInstagramEmbeds(), 100);`
  // We can try to load the embed, or just show a nice card with text.
  // Let's stick to text card for performance, maybe reveal embed on hover or click.

  return (
    <div
      className="bg-brand-gray border border-white/10 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold hover:shadow-[0_8px_24px_rgba(212,175,55,0.1)]"
      onClick={() => onClick(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/5] bg-neutral-900 relative flex items-center justify-center overflow-hidden">
        {/* Use iframe for reliable preview, with overlay to capture clicks for the modal */}
        {item.instagramLinks && item.instagramLinks.length > 0 ? (
          (() => {
            // Find the first link that is a valid post/reel/tv (skip story highlights)
            const validLink = item.instagramLinks.find(link => /instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/.test(link));

            if (validLink) {
              const match = validLink.match(/instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/);
              const postId = match ? match[1] : null;

              if (postId) {
                return (
                  <div className="w-full h-full relative">
                    <iframe
                      src={`https://www.instagram.com/p/${postId}/embed/captioned`}
                      className="w-full h-full absolute inset-0 pointer-events-none"
                      frameBorder="0"
                      scrolling="no"
                      loading="lazy"
                      title={title}
                    />
                    {/* Overlay to ensure the card is clickable and hover effects work */}
                    <div className="absolute inset-0 bg-transparent z-10" />
                  </div>
                );
              }
            }
            return (
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <span className="text-xs text-gray-500 mb-2">Check Stories</span>
                <Instagram className="w-8 h-8 text-neutral-700" />
              </div>
            );
          })()
        ) : null}

        {/* Fallback pattern if no link */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 -z-20" />

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors z-20 pointer-events-none" />

        <Instagram className={`w-8 h-8 text-white/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-30 pointer-events-none ${isHovered ? 'opacity-100 scale-110 text-brand-gold' : 'opacity-0 scale-90'}`} />

        <div className={`absolute bottom-6 left-0 right-0 text-center transition-all duration-300 transform z-30 pointer-events-none ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <span className="text-xs font-bold uppercase tracking-widest text-white bg-black/50 px-3 py-1 rounded-full border border-white/20">View Details</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-400 mb-3 flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {subtitle}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className={`text-xs px-2 py-1 rounded-full border ${tag.type === 'category'
                ? 'bg-brand-gold text-brand-dark border-brand-gold font-bold'
                : tag.type === 'michelin'
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-neutral-800 text-gray-400 border-white/10'
                }`}
            >
              {tag.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
