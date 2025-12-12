import { motion } from 'framer-motion';

const LuxuryPartners = () => {
  const services = [
    {
      title: 'Story Sessions',
      description: 'Recorded and saved in Instagram highlights, explaining the details and overall experience of the stay.'
    },
    {
      title: 'Instagram Reels',
      description: 'Highlighting the unique selling points of suites, overall property, and hotel restaurant/bar venues.'
    },
    {
      title: 'Instagram Carousel',
      description: 'Providing detailed highlights of specific areas, such as suites, wellness facilities, restaurants, etc.'
    },
    {
      title: 'Modeling for hotel content/ads',
      description: 'Featuring in hotel content and advertisements or collaborating on content ownership with hotels.'
    }
  ];

  return (
    <section className="py-24 bg-brand-gray text-brand-cream border-b border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        {/* Header and Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-display uppercase leading-none mb-8">
              <span className="block text-brand-gold">Luxury</span>
              Properties
            </h2>
            <div className="w-24 h-1 bg-brand-gold mb-8" />
            <h3 className="text-3xl font-bebas tracking-wide mb-6">Partners</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 font-light text-lg space-y-6 leading-relaxed"
          >
            <p>
              With the rise of discerning luxury travelers in the post-pandemic era, marked by the opening of new high-end hotels, more mindful spending, and guests who invest significant time researching online before booking, Genta aims to inspire his audience by showcasing exceptional properties through authentic storytelling. His content provides travelers with curated options while helping hotels and resorts strengthen their brand visibility to high-value guests.
            </p>
            <p>
              Genta has partnered with over 70 luxury and premium brands, including major international hospitality groups, boutique hotel collections, and independent properties and villas, covering more than 280 destinations worldwide. He continues to expand his portfolio to include more countries and regions worldwide.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-brand-dark/50 p-8 border border-white/5 rounded-2xl hover:border-brand-gold/30 transition-colors"
            >
              <h4 className="text-xl font-display text-brand-gold mb-4 uppercase tracking-wide">{service.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Previous Partners Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-sm overflow-hidden border border-white/5"
        >
          {/* Overlay title if needed, or just let the image speak */}
          <div className="absolute top-0 left-0 bg-brand-gold text-brand-dark font-bebas px-4 py-2 text-xl z-20">
            Previous Partners
          </div>
          <img
            src={`${import.meta.env.BASE_URL}images/partners.png`}
            alt="Previous Partners including Aman, Mandarin Oriental, Four Seasons, and more"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
};

export default LuxuryPartners;
