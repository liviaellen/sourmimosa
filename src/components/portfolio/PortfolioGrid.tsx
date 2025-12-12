import { useState, useMemo, useEffect } from 'react';
import { getPortfolio } from '../../data';
import PortfolioItem from './PortfolioItem';
import type { PortfolioItem as PortfolioItemType } from '../../types';
import { Search, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface PortfolioGridProps {
  title?: string;
  subtitle?: string;
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ title, subtitle }) => {
  const allItems = getPortfolio();
  const [searchParams] = useSearchParams();

  // State
  // Initialize category from URL param if present, otherwise 'all'
  const [category, setCategory] = useState(searchParams.get('category') || 'all');

  // Update state if URL param changes
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
      setCategory(catParam);
    }
  }, [searchParams]);

  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const [selectedItem, setSelectedItem] = useState<PortfolioItemType | null>(null);

  // Derived options
  const cities = useMemo(() => Array.from(new Set(allItems.map(i => i.city))).filter(Boolean).sort(), [allItems]);

  // Dynamic types based on selected category (or allItems if category is 'all')
  const types = useMemo(() => {
    const itemsToConsider = category === 'all' ? allItems : allItems.filter(i => i.category === category);
    return Array.from(new Set(itemsToConsider.map(i => i.type || i.brandCategory))).filter(Boolean).sort();
  }, [allItems, category]);

  // Filter Logic
  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      if (category !== 'all' && item.category !== category) return false;
      if (city && item.city !== city) return false;
      if (type) {
        const itemType = item.type || item.brandCategory || '';
        if (itemType !== type) return false;
      }
      if (search) {
        const searchText = [
          item.brand,
          item.property,
          item.venue,
          item.item,
          item.city,
          item.category,
          item.type
        ].filter(Boolean).join(' ').toLowerCase();
        if (!searchText.includes(search.toLowerCase())) return false;
      }
      return true;
    });
  }, [allItems, category, city, type, search]);

  // Pagination
  const displayedItems = filteredItems.slice(0, page * itemsPerPage);
  const hasMore = displayedItems.length < filteredItems.length;

  return (
    <section className="py-20 bg-brand-dark min-h-screen" id="portfolio">
      <div className="container mx-auto px-4">

        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-4xl md:text-5xl font-display uppercase text-brand-cream mb-4">{title}</h2>}
            {subtitle && <p className="text-gray-400 font-light max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {['all', 'Hotels & Resorts', 'F&B Destinations', 'Beyond Hotels & F&B'].map(cat => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setPage(1); }}
                className={`px-4 py-2 rounded-full border text-sm transition-all ${category === cat
                  ? 'bg-brand-gold border-brand-gold text-brand-dark font-bold'
                  : 'bg-transparent border-white/20 text-gray-400 hover:border-white/40'
                  }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          {/* Search and Selects */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center bg-brand-gray p-4 rounded-lg border border-white/5">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9 pr-4 py-2 bg-black border border-white/10 rounded-md text-white focus:border-brand-gold focus:outline-none w-full md:w-64"
              />
            </div>

            <select
              value={city}
              onChange={(e) => { setCity(e.target.value); setPage(1); }}
              className="px-4 py-2 bg-black border border-white/10 rounded-md text-white focus:border-brand-gold focus:outline-none w-full md:w-48"
            >
              <option value="">All Cities</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={type}
              onChange={(e) => { setType(e.target.value); setPage(1); }}
              className="px-4 py-2 bg-black border border-white/10 rounded-md text-white focus:border-brand-gold focus:outline-none w-full md:w-48"
            >
              <option value="">All Types</option>
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {displayedItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
              >
                <PortfolioItem item={item} onClick={setSelectedItem} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {displayedItems.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No results found. Try adjusting your filters.
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setPage(p => p + 1)}
              className="px-8 py-3 bg-brand-gray border border-white/20 rounded-md text-white hover:bg-white hover:text-black transition-all"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-gray border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 relative">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <h2 className="text-3xl font-bold mb-2">
                  {selectedItem.property || selectedItem.venue || selectedItem.brand}
                </h2>
                <p className="text-gray-400 mb-6">{selectedItem.city}</p>

                {/* Instagram Embeds Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedItem.instagramLinks && selectedItem.instagramLinks.length > 0 ? (
                    selectedItem.instagramLinks.map((link, idx) => {
                      // Simple ID extraction
                      const match = link.match(/instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/);
                      const postId = match ? match[1] : null;

                      if (!postId) return null;

                      return (
                        <div key={idx} className="aspect-[4/5] bg-black rounded-lg overflow-hidden">
                          <iframe
                            src={`https://www.instagram.com/p/${postId}/embed/captioned`}
                            className="w-full h-full"
                            frameBorder="0"
                            scrolling="no"
                            allowTransparency={true}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-full py-10 text-center text-gray-500">
                      No preview available
                    </div>
                  )}
                </div>

                {selectedItem.googleMaps && (
                  <div className="mt-8 flex justify-center">
                    <a
                      href={selectedItem.googleMaps}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-white transition-colors"
                    >
                      View on Google Maps
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default PortfolioGrid;
