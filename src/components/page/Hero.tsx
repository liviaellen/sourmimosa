import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const STATS = [
  { value: '230+', label: 'Hotel Collaborations' },
  { value: '380+', label: 'Dining Partnerships' },
  { value: '560K+', label: 'Audience' },
];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-brand-dark py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark z-10" />

      {/* Background (Placeholder for now, could be video/image) */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=3270&auto=format&fit=crop')] bg-cover bg-center opacity-40" />

      <div className="z-20 text-center px-4 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-brand-gold text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4"
        >
          Genta Mansyur
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold text-white tracking-tighter mb-4"
        >
          SOURMIMOSA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 font-light tracking-widest uppercase"
        >
          Luxury Travel Creator &amp; Hospitality Content Producer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-sm md:text-base text-gray-400 font-light max-w-xl mx-auto"
        >
          Creating visual stories for exceptional hotels, resorts and dining destinations worldwide.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-2 text-xs md:text-sm text-brand-gold/80 font-bold tracking-[0.2em] uppercase"
        >
          Based in London. Working worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex justify-center gap-6 sm:gap-10 md:gap-16 mt-10"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-xl sm:text-2xl md:text-3xl text-brand-cream">{stat.value}</div>
              <div className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mt-1 whitespace-nowrap">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
        >
          <button
            onClick={() => navigate('/portfolio')}
            className="px-8 py-3 border border-white/30 text-white text-sm font-bold uppercase tracking-widest hover:border-brand-gold hover:text-brand-gold transition-all rounded-sm"
          >
            View Hospitality Work
          </button>
          <button
            onClick={() => navigate('/work-with-genta')}
            className="group flex items-center justify-center gap-2 px-8 py-3 bg-brand-gold text-brand-dark text-sm font-bold uppercase tracking-widest hover:bg-white transition-all rounded-sm"
          >
            Work With Genta
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 z-20 hidden md:block"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

export default Hero;
