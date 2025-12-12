import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Hotel', href: '#hotel' },
    { name: 'F&B', href: '#fnb' },
    { name: 'Restaurant', href: '#restaurant' },
    { name: 'Contact', href: '/contact', isPage: true },
    { name: 'Portfolio', href: '/portfolio', isPage: true, highlight: true },
  ];

  const handleNavClick = (link: { name: string; href: string; isPage?: boolean }) => {
    setIsMobileMenuOpen(false);

    if (link.isPage) {
      navigate(link.href);
      return;
    }

    // If we are not on home page, go there first
    if (location.pathname !== '/') {
      navigate('/', { state: { target: link.href } });
    } else {
      scrollToSection(link.href);
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll after navigation
  useEffect(() => {
    if (location.state && (location.state as any).target) {
      // slight delay to ensure page load
      setTimeout(() => {
        scrollToSection((location.state as any).target);
        // clear state
        window.history.replaceState({}, document.title);
      }, 300);
    }
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4 shadow-lg' : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            className={`text-2xl font-bold tracking-[0.2em] transition-colors ${isScrolled ? 'text-brand-gold' : 'text-white'
              }`}
          >
            SOURMIMOSA
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className={`uppercase tracking-widest transition-all ${link.highlight
                  ? 'px-5 py-2 border border-brand-gold text-brand-gold text-xs font-bold hover:bg-brand-gold hover:text-black rounded-sm'
                  : 'text-sm font-medium text-gray-300 hover:text-brand-gold'
                  }`}
              >
                {link.name}
              </button>
            ))}
            {/* <a
               href="https://instagram.com/sourmimosa"
               target="_blank"
               rel="noreferrer"
               className="px-5 py-2 border border-brand-gold text-brand-gold text-xs font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-black transition-all rounded-sm"
            >
              Connect
            </a> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className="text-2xl font-display font-medium tracking-widest text-white hover:text-brand-gold transition-colors uppercase"
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
