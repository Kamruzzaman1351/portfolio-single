'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: 'about' },
  { label: 'Skills', href: 'skills' },
  { label: 'Projects', href: 'projects' },
  { label: 'Experience', href: 'experience' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let current = '';
      for (const { href } of NAV_LINKS) {
        const el = document.getElementById(href);
        if (el && el.offsetTop <= scrollPos) current = href;
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-code text-xl font-bold text-cyan tracking-tight hover:opacity-80 transition-opacity"
          aria-label="Go to top"
        >
          dev.
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => scrollTo(href)}
              className={`text-sm font-body transition-colors duration-200 ${
                activeSection === href ? 'text-cyan' : 'text-muted hover:text-bright'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="px-4 py-2 text-sm font-body text-cyan border border-cyan/40 rounded-lg
                       hover:bg-cyan/10 transition-all duration-200
                       shadow-[0_0_15px_rgba(0,212,255,0.08)]
                       hover:shadow-[0_0_20px_rgba(0,212,255,0.25)]"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-bright rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-dark/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => scrollTo(href)}
                  className={`text-left py-3 px-4 rounded-xl text-sm font-body transition-colors ${
                    activeSection === href
                      ? 'text-cyan bg-cyan/5 border border-cyan/10'
                      : 'text-muted hover:text-bright hover:bg-white/5'
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('contact')}
                className="mt-2 py-3 px-4 text-sm font-body text-cyan border border-cyan/40 rounded-xl
                           text-center hover:bg-cyan/10 transition-all"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
