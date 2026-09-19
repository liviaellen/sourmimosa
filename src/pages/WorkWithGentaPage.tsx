import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    title: 'Hospitality Partnerships',
    description: 'Editorial storytelling for hotels, resorts and hospitality brands, published through SOURMIMOSA\'s own channels and audience.',
  },
  {
    title: 'Content Production',
    description: 'High-quality vertical video and photography created specifically for a property\'s own marketing — suites, facilities, F&B and lifestyle imagery.',
  },
  {
    title: 'Campaigns & Launches',
    description: 'Creator-led campaigns for hotel openings, renovations, new suites, seasonal moments and restaurant launches.',
  },
  {
    title: 'Destination & Tourism Campaigns',
    description: 'Content for tourism boards, destinations and travel brands looking to reach an established luxury travel audience.',
  },
  {
    title: 'Long-Term Partnerships',
    description: 'Ongoing content relationships for hospitality groups with multiple properties or a recurring content calendar.',
  },
];

const WorkWithGentaPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <Navbar />

      <main className="pt-40 pb-24">
        <div className="container mx-auto px-4 max-w-4xl text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
              Genta Mansyur — SOURMIMOSA
            </span>
            <h1 className="text-5xl md:text-7xl font-display uppercase text-brand-cream mb-6">
              Work With Genta
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
              Planning a hotel campaign, launch, destination collaboration or content production project?
              I'd love to hear about it.
            </p>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-brand-gray border border-white/5 p-8 rounded-2xl hover:border-brand-gold/30 transition-colors"
            >
              <h3 className="text-xl font-display text-brand-gold mb-3 uppercase tracking-wide">{service.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Content Usage */}
        <div className="container mx-auto px-4 max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="border border-white/10 rounded-2xl p-8 md:p-10 bg-brand-dark"
          >
            <h3 className="text-lg font-display text-brand-cream mb-3 uppercase tracking-wide">Content Usage</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Content created for hotel-owned channels, paid advertising, licensing, whitelisting and other
              commercial usage can be arranged separately according to scope, platform and duration.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h3 className="text-2xl md:text-3xl font-display uppercase text-brand-cream mb-6">
            Interested in working together?
          </h3>
          <a
            href="mailto:genta@sourmimosa.com"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-dark text-sm font-bold uppercase tracking-widest hover:bg-white transition-all rounded-sm"
          >
            <Mail className="w-4 h-4" />
            Get In Touch
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </main>

      <footer className="py-20 text-center border-t border-white/10 bg-brand-gray">
        <h3 className="text-2xl font-bold mb-4 tracking-widest text-brand-gold">SOURMIMOSA</h3>
        <p className="text-gray-500">Genta Mansyur, Founder</p>
      </footer>
    </div>
  );
};

export default WorkWithGentaPage;
