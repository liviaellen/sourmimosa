import React from 'react';
import Hero from '../components/page/Hero';
import CategorySection from '../components/page/CategorySection';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';
import About from '../components/page/About';
import LuxuryPartners from '../components/page/LuxuryPartners';
import LuxuryDining from '../components/page/LuxuryDining';
import Navbar from '../components/layout/Navbar';
import Testimonials from '../components/page/Testimonials';

// Example data populated from portfolio highlights
const SECTIONS = [
  {
    id: 'hotel',
    title: 'Hotel',
    subtitle: 'Curated stays at the world\'s most exclusive addresses.',
    highlights: [
      { id: 'h1', embedUrl: 'https://www.instagram.com/p/DOLZOyMCTpa/?img_index=1', title: 'Luxury Escape' },
      { id: 'h2', embedUrl: 'https://www.instagram.com/p/DLqsFOYyjbR/?img_index=1', title: 'Staycation' },
      { id: 'h3', embedUrl: 'https://www.instagram.com/p/DNQbshdpr39/?img_index=16', title: 'Urban Retreat' }
    ]
  },
  {
    id: 'fnb',
    title: 'Food & Beverage',
    subtitle: 'Exceptional dining experiences and culinary journeys.',
    highlights: [
      { id: 'f1', embedUrl: 'https://www.instagram.com/reel/DHL-WsOSZKY/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D', title: 'Culinary Art' },
      { id: 'f2', embedUrl: 'https://www.instagram.com/reel/DJLIu6ThMVA/?utm_source=ig_web_copy_link', title: 'Signature Flavors' },
      { id: 'f3', embedUrl: 'https://www.instagram.com/reel/DCKLZKoSaq7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D', title: 'Chef\'s Table' }
    ]
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
    subtitle: 'Michelin-starred gastronomy and hidden gems.',
    highlights: [
      { id: 'r1', embedUrl: 'https://www.instagram.com/p/DM-dMGqJe4O/?img_index=1', title: 'Culinary Art' },
      { id: 'r2', embedUrl: 'https://www.instagram.com/p/DLLKgCezd91/?utm_source=ig_embed&ig_rid=066a9abd-d4da-45c5-8b2c-ba7545025553', title: 'Culinary Art II' },
      { id: 'r3', embedUrl: 'https://www.instagram.com/p/DJxejNozdPK/', title: 'Gastronomy' }
    ]
  }
];

const HomePage = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <Navbar />
      <div id="hero">
        <Hero />
      </div>

      <main>
        <div id="about">
          <About />
        </div>

        {/* Hotel Block */}
        <LuxuryPartners />
        <CategorySection
          id={SECTIONS[0].id}
          title={SECTIONS[0].title}
          subtitle={SECTIONS[0].subtitle}
          highlights={SECTIONS[0].highlights}
          filterCategory="Hotels & Resorts"
        />

        {/* F&B Block */}
        <LuxuryDining />
        <CategorySection
          id={SECTIONS[1].id}
          title={SECTIONS[1].title}
          subtitle={SECTIONS[1].subtitle}
          highlights={SECTIONS[1].highlights}
          filterCategory="F&B Destinations"
        />
        <CategorySection
          id={SECTIONS[2].id}
          title={SECTIONS[2].title}
          subtitle={SECTIONS[2].subtitle}
          highlights={SECTIONS[2].highlights}
          filterCategory="F&B Destinations"
        />

        <Testimonials />
        <PortfolioGrid
          title="Portfolio"
          subtitle="Explore a curated collection of luxury hotels, culinary destinations, and exclusive experiences."
        />
      </main>

      <footer className="py-20 text-center border-t border-white/10 bg-brand-gray">
        <h3 className="text-2xl font-bold mb-4 tracking-widest text-brand-gold">SOURMIMOSA</h3>
        <p className="text-gray-500">by Genta</p>
        <div className="mt-8 flex justify-center gap-6">
          <a href="https://instagram.com/sourmimosa" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
          <a href="mailto:genta@sourmimosa.com" className="text-gray-400 hover:text-white transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
