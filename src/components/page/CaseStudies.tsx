import { motion } from 'framer-motion';

interface CaseStudy {
  property: string;
  location: string;
  objective: string;
  content: string;
  results: { label: string; value: string }[];
  takeaway: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    property: 'Capella',
    location: 'Galaxy Macau',
    objective: 'Introduce the property to a wider luxury travel audience through immersive stay content.',
    content: 'Instagram Reels and Stories covering suites, dining and property experience.',
    results: [
      { label: 'Views', value: '~16.5M' },
      { label: 'Saves', value: '~102.9K' },
      { label: 'Est. earned media value', value: '~$653.5K' },
    ],
    takeaway: 'Strong save rate signalled genuine travel-planning intent, not passive scrolling.',
  },
  {
    property: 'The Siam',
    location: 'Bangkok',
    objective: 'Showcase the property\'s riverside setting and suite experience to a regional audience.',
    content: 'Instagram Reels and Carousel featuring suites, riverside views and hospitality.',
    results: [
      { label: 'Views', value: '~14.5M' },
      { label: 'Shares', value: '~60.6K' },
      { label: 'Est. earned media value', value: '~$435K' },
    ],
    takeaway: 'High share volume extended reach well past the existing follower base.',
  },
  {
    property: 'Mandapa',
    location: 'A Ritz-Carlton Reserve, Bali',
    objective: 'Position the resort within the ultra-luxury villa and wellness segment.',
    content: 'Instagram Reels and Stories covering villas, wellness and dining experiences.',
    results: [
      { label: 'Views', value: '~8.4M' },
      { label: 'Saves', value: '~39.1K' },
      { label: 'Est. earned media value', value: '~$294K' },
    ],
    takeaway: 'Content continued driving saves and shares well after publication.',
  },
];

const CaseStudies = () => {
  return (
    <section className="py-24 bg-brand-gray text-brand-cream border-b border-white/5 relative overflow-hidden" id="case-studies">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Selected Work</span>
          <h2 className="text-4xl md:text-6xl font-display uppercase text-brand-cream mb-4">Case Studies</h2>
          <p className="text-gray-400 font-light max-w-2xl mx-auto">
            Beautiful content is the starting point. Here's what it produced for three recent hospitality partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study, index) => (
            <motion.div
              key={study.property}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-brand-dark/60 border border-white/5 rounded-2xl p-8 flex flex-col hover:border-brand-gold/30 transition-colors"
            >
              <h3 className="font-display text-2xl uppercase text-brand-cream">{study.property}</h3>
              <p className="text-brand-gold text-xs uppercase tracking-widest font-bold mb-6">{study.location}</p>

              <p className="text-sm text-gray-400 leading-relaxed mb-6">{study.objective}</p>

              <div className="grid grid-cols-1 gap-3 border-t border-white/10 pt-6 mb-6">
                {study.results.map((r) => (
                  <div key={r.label} className="flex justify-between items-baseline">
                    <span className="text-xs uppercase tracking-widest text-gray-500">{r.label}</span>
                    <span className="font-display text-lg text-brand-cream">{r.value}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-300 italic mt-auto pt-4 border-t border-white/10">
                {study.takeaway}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[11px] text-gray-600 mt-10 uppercase tracking-widest">
          Figures approximate, based on platform analytics at time of campaign
        </p>
      </div>
    </section>
  );
};

export default CaseStudies;
