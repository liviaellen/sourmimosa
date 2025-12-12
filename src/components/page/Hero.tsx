import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-brand-dark">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark z-10" />

      {/* Background (Placeholder for now, could be video/image) */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=3270&auto=format&fit=crop')] bg-cover bg-center opacity-40" />

      <div className="z-20 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-4"
        >
          SOURMIMOSA
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 font-light tracking-widest uppercase"
        >
          Luxury Lifestyle Content Creator
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 z-20"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

export default Hero;
