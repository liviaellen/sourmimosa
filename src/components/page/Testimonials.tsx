import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    text: "Genta's ability to capture the soul of our property is unmatched. His content didn't just drive engagement; it brought us the exact clientele we were looking for. A true partner in luxury storytelling.",
    role: "General Manager",
    company: "Ultra-Luxury Resort, Bali"
  },
  {
    text: "Working with Genta was seamless. He understands the nuances of high-end hospitality and delivered visuals that perfectly aligned with our global brand standards. The impact on our bookings was immediate.",
    role: "Director of Marketing",
    company: "Leading Hotel Group, Asia Pacific"
  },
  {
    text: "An exquisite eye for detail. The way he showcased our culinary journey was nothing short of art. We saw a significant increase in international reservations following his feature.",
    role: "Executive Chef",
    company: "Michelin-Starred Restaurant, Bangkok"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-brand-dark border-b border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] text-white/[0.02] font-display pointer-events-none">
        "
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Endorsements</span>
          <h2 className="text-4xl md:text-5xl font-display uppercase text-brand-cream">Trusted By The Best</h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-12 hidden md:block">
            <button onClick={prevSlide} className="p-2 rounded-full border border-white/10 hover:border-brand-gold hover:text-brand-gold transition-colors text-white">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-12 hidden md:block">
            <button onClick={nextSlide} className="p-2 rounded-full border border-white/10 hover:border-brand-gold hover:text-brand-gold transition-colors text-white">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center px-4 md:px-12"
              >
                <div className="mb-8 flex justify-center">
                  <Quote className="w-8 h-8 text-brand-gold/50" />
                </div>
                <p className="text-xl md:text-3xl font-light text-gray-300 italic mb-8 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </p>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-[1px] bg-brand-gold mb-4" />
                  <span className="text-white font-display text-lg tracking-wide uppercase">{testimonials[currentIndex].company}</span>
                  <span className="text-brand-gold text-xs uppercase tracking-widest">{testimonials[currentIndex].role}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-brand-gold' : 'bg-white/20 hover:bg-white/40'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
