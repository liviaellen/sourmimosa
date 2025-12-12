import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import { Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-dark via-black to-black -z-10" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto max-w-4xl text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-display uppercase text-brand-cream mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto mb-16">
              For inquiries, collaborations, or just to say hello, feel free to reach out.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Email Card */}
            <motion.a
              href="mailto:genta@sourmimosa.com"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group bg-brand-gray border border-white/10 p-12 flex flex-col items-center justify-center gap-6 hover:border-brand-gold transition-all duration-500 rounded-sm relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-full bg-brand-dark border border-brand-gold/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Mail className="w-8 h-8 text-brand-gold" />
              </div>
              <div className="text-center relative z-10">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Email</h3>
                <span className="text-2xl md:text-3xl font-display text-brand-cream block group-hover:text-white transition-colors">genta@sourmimosa.com</span>
              </div>
            </motion.a>

            {/* Instagram Card / Embed Replica */}
            <motion.a
              href="https://www.instagram.com/sourmimosa"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group bg-brand-gray border border-white/10 p-0 flex flex-col hover:border-brand-gold transition-all duration-500 rounded-sm relative overflow-hidden"
            >
              {/* Header */}
              <div className="p-8 pb-0 flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-gold/50 p-1">
                  {/* Placeholder for profile pic or use generic icon */}
                  <div className="w-full h-full bg-neutral-800 rounded-full flex items-center justify-center">
                    <span className="font-display text-xl text-brand-gold">SM</span>
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">sourmimosa</h3>
                  <p className="text-sm text-gray-400">Instagram</p>
                </div>
              </div>

              {/* Content Mockup */}
              <div className="mt-8 flex-grow bg-black/50 p-8 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:scale-105 transition-transform duration-700" />
                <div className="relative z-10 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white border border-white/30 px-6 py-2 rounded-full backdrop-blur-md group-hover:bg-brand-gold group-hover:text-black group-hover:border-brand-gold transition-all">
                  Follow on Instagram <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </main>

      <footer className="py-20 text-center border-t border-white/10 bg-brand-gray">
        <h3 className="text-2xl font-bold mb-4 tracking-widest text-brand-gold">SOURMIMOSA</h3>
        <p className="text-gray-500">by Genta</p>
      </footer>
    </div>
  );
};

export default ContactPage;
