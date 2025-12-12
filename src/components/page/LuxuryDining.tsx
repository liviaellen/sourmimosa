import React from 'react';
import { motion } from 'framer-motion';

const LuxuryDining = () => {
  const services = [
    {
      title: 'Story Sessions',
      description: 'Recorded on site while enjoying the dining experience, providing detailed explanations and overall experiences of the food, reels uploaded then put into “Dine & Sip” Highlight.'
    },
    {
      title: 'Instagram Reels',
      description: 'Showcasing detailed meal experiences, including promotions or special programs.'
    },
    {
      title: 'Instagram Carousel',
      description: 'Offering general information about the meals, focusing less on specific food items.'
    },
    {
      title: 'Modeling for Owned Content/Ads',
      description: 'Featuring in content and advertisements to enhance brand visibility and engagement.'
    }
  ];

  return (
    <section className="py-24 bg-brand-dark text-brand-cream border-b border-white/5 relative overflow-hidden">
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
              F&B Partners
            </h2>
            <div className="w-24 h-1 bg-brand-gold mb-8" />
            <h3 className="text-3xl font-bebas tracking-wide mb-6">Dining & Lifestyle</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 font-light text-lg space-y-6 leading-relaxed"
          >
            <p>
              Expanding his focus from luxury travel to fine dining, Genta leverages his passion for the culinary arts to captivate and inspire his audience. What began as a personal love for food evolved into sharing his dining experiences, where his storytelling style quickly resonated with his followers. His content showcases specialty dishes, seasonal promotions, and dining recommendations, providing restaurants with valuable exposure to an affluent clientele.
            </p>
            <p>
              Genta has partnered with over 380 luxury dining establishments worldwide, including Michelin-starred restaurants and Asia’s Best 50 Restaurants and Bars. From Japan, The United States, China to the Philippines, Dubai, Singapore, Thailand, and Indonesia, he introduces his audience to world-class dining experiences while helping restaurants engage a high-end, discerning audience.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-brand-gray/50 p-8 border border-white/5 rounded-2xl hover:border-brand-gold/30 transition-colors"
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
          className="relative rounded-sm overflow-hidden border border-white/5 mt-24"
        >
          {/* Overlay title if needed, or just let the image speak */}
          <div className="absolute top-0 left-0 bg-brand-gold text-brand-dark font-bebas px-4 py-2 text-xl z-20">
            Previous Partners
          </div>
          <img
            src="/images/partners-dining.png"
            alt="Previous Dining Partners including Amber, Odette, Gao, and more"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
};

export default LuxuryDining;
