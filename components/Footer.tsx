'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <footer className="py-8 bg-dark border-t border-white/[0.04]" aria-label="Footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center text-muted font-body text-sm">
            Designed &amp; built by{' '}
            <span className="text-bright font-semibold">Md Kamruzzaman</span>
            {' '}·{' '}
            <span className="font-code text-muted/70">{new Date().getFullYear()}</span>
          </p>
          <p className="text-xs font-code text-muted/50 text-center">
            Built with Next.js · Tailwind CSS · Framer Motion
          </p>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-xl bg-surface border border-cyan/25 flex items-center justify-center text-cyan
                       hover:bg-cyan hover:text-dark hover:border-cyan hover:scale-110
                       shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]
                       transition-all duration-200"
            aria-label="Back to top"
          >
            <ArrowUp size={18} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
