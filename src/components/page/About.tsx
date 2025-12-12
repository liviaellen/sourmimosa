import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-24 bg-brand-dark text-brand-cream relative overflow-hidden">
      <div className="container mx-auto px-4 z-10 relative">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

          {/* Left Column: Image with "IT'S ME" tag */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-4 relative"
          >
            {/* "IT'S ME" Tag */}
            <div className="bg-brand-cream text-brand-dark font-display text-xl px-4 py-1 absolute -top-4 left-4 z-20 uppercase tracking-wide">
              It's Me
            </div>

            {/* Image Frame */}
            <div className="relative border-8 border-brand-cream/5 shadow-2xl bg-[#1a1a1a]">
              <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <img
                  src="/images/profile.png"
                  alt="Genta"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <div className="lg:col-span-8 flex flex-col justify-end">

            {/* BIG TITLE */}
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-[8rem] leading-[0.8] font-display uppercase text-brand-cream mb-8 mix-blend-difference"
            >
              Who I Am?
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-brand-cream/20 pt-8"
            >
              {/* Bio Text */}
              <div className="space-y-4 font-light text-gray-400 text-sm leading-relaxed">
                <p>
                  With the rise of discerning luxury travelers in the post-pandemic era, Genta aims to inspire his audience by showcasing exceptional properties through authentic storytelling. His content provides travelers with curated options while helping hotels and resorts strengthen their brand visibility to high-value guests.
                </p>
                <p>
                  From luxury travel to fine dining and lifestyle, Genta leverages his passion for the culinary arts to captivate his audience.
                </p>
              </div>

              {/* Original Stats / Info */}
              <div>
                <div className="flex justify-between items-end border-b border-brand-cream/20 pb-2 mb-4">
                  <span className="font-bebas text-2xl text-brand-cream">Experience</span>
                  <span className="font-sans text-sm text-gray-400">06 Years</span>
                </div>
                <div className="flex justify-between items-end border-b border-brand-cream/20 pb-2 mb-4">
                  <span className="font-bebas text-2xl text-brand-cream">Projects</span>
                  <span className="font-sans text-sm text-gray-400">688+ Completed</span>
                </div>
                <div className="flex justify-between items-end border-b border-brand-cream/20 pb-2">
                  <span className="font-bebas text-2xl text-brand-cream">Specialization</span>
                  <span className="font-sans text-sm text-gray-400 text-right">Luxury Travel, F&B, Lifestyle</span>
                </div>
              </div>
            </motion.div>

            {/* NEW Circular Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-4 mt-12 border-t border-brand-cream/10 pt-8"
            >
              {[
                { label: 'Collaborations', value: '230', sub: 'Hotels & Resorts' },
                { label: 'Partnerships', value: '380+', sub: 'Worldwide' },
                { label: 'Followers', value: '560K', sub: 'Audience' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full border border-brand-gold/30 flex flex-col items-center justify-center bg-brand-dark/50 group-hover:border-brand-gold group-hover:bg-brand-gold/10 transition-all duration-500 mb-3 relative overflow-hidden">
                    <span className="font-display text-3xl text-brand-cream z-10">{stat.value}</span>
                    <div className="absolute inset-0 bg-brand-gold/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                  </div>
                  <span className="text-brand-gold font-bebas tracking-wide text-lg">{stat.label}</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500">{stat.sub}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
