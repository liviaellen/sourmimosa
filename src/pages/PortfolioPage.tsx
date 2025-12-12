import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';

const PortfolioPage = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <Navbar />

      <main className="pt-32">
        <div className="container mx-auto px-4 mb-12 text-center">
          <h1 className="text-6xl md:text-8xl font-display uppercase text-brand-cream mb-4">Portfolio</h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Explore a curated collection of luxury hotels, culinary destinations, and exclusive experiences.
          </p>
        </div>
        <PortfolioGrid />
      </main>

      <footer className="py-20 text-center border-t border-white/10 bg-brand-gray mt-20">
        <h3 className="text-2xl font-bold mb-4 tracking-widest text-brand-gold">SOURMIMOSA</h3>
        <p className="text-gray-500">by Genta</p>
      </footer>
    </div>
  );
};

export default PortfolioPage;
