import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram } from 'lucide-react';

// Define the interface for a single highlight/portfolio item
interface Highlight {
  id: string;
  embedUrl: string;
  title: string;
}

interface CategorySectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  highlights: Highlight[];
  reversed?: boolean;
  filterCategory?: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ id, title, subtitle, highlights, filterCategory }) => {

  // Helper to extract Instagram ID and create embed URL
  const getEmbedSrc = (url: string) => {
    // Extract ID from standard instagram URLs
    // Matches /p/ID, /reel/ID, /tv/ID
    const match = url.match(/instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/);
    if (match && match[1]) {
      return `https://www.instagram.com/p/${match[1]}/embed/captioned`;
    }
    return url; // Return as is if it's already an embed url or standard link
  };

  return (
    <section id={id} className="min-h-screen w-full py-24 bg-brand-dark border-b border-white/5 relative">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl font-display uppercase text-brand-cream">{title}</h2>
            {subtitle && <p className="text-xl text-gray-400 font-light mt-2 max-w-xl">{subtitle}</p>}
          </motion.div>

          <Link to={`/portfolio${filterCategory ? `?category=${encodeURIComponent(filterCategory)}` : ''}`}>
            <motion.button
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group flex items-center gap-2 text-brand-gold uppercase tracking-widest text-sm hover:text-white transition-colors"
            >
              View Full Collection
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </div>

        {/* Highlights Grid (Always 3 items) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="aspect-[4/5] bg-[#050505] overflow-hidden rounded-sm border border-white/5 relative flex items-center justify-center">
                {item.embedUrl ? (
                  <div className={`relative ${item.isReel ? 'h-full aspect-[9/16]' : 'w-full h-full'}`}>
                    <iframe
                      src={getEmbedSrc(item.embedUrl)}
                      className="w-full h-full absolute inset-0"
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency={true}
                      title={`Instagram Embed ${index}`}
                    />
                  </div>
                ) : item.imageUrl ? (
                  <div className="w-full h-full">
                    <img
                      src={item.imageUrl}
                      alt={item.title || "Highlight"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    Media Unavailable
                  </div>
                )}
              </div>
              {item.title && (
                <h3 className="mt-4 text-brand-cream font-display text-2xl uppercase tracking-wide">{item.title}</h3>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategorySection;
