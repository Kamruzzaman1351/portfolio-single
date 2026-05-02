'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Eye } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { profile } from '@/lib/data';

type Phase = 'typing' | 'pausing' | 'deleting';

function useTyping(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');

  useEffect(() => {
    const word = words[wordIndex];

    if (phase === 'typing') {
      if (charIndex < word.length) {
        const t = setTimeout(() => setCharIndex((c) => c + 1), 95);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('deleting'), 2200);
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (charIndex > 0) {
        const t = setTimeout(() => setCharIndex((c) => c - 1), 50);
        return () => clearTimeout(t);
      }
      setWordIndex((w) => (w + 1) % words.length);
      setPhase('typing');
    }
  }, [charIndex, phase, wordIndex, words]);

  return words[wordIndex].substring(0, charIndex);
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};

const SOCIALS = [
  { Icon: FaGithub, href: profile.socials.github, label: 'GitHub' },
  { Icon: FaLinkedinIn, href: profile.socials.linkedin, label: 'LinkedIn' },
];

export default function Hero() {
  const typedRole = useTyping(profile.roles);

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center overflow-hidden bg-dark"
      aria-label="Hero section"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      {/* Radial glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-violet/[0.05] rounded-full blur-[100px]" />
      </div>

      {/* Desktop social sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hidden lg:flex flex-col items-center gap-5 fixed left-8 bottom-12 z-20"
        aria-label="Social links"
      >
        {SOCIALS.map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-muted hover:text-cyan transition-all duration-200 hover:scale-110"
          >
            <Icon size={19} />
          </a>
        ))}
        <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-28 lg:py-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan/5 border border-cyan/20 text-cyan text-xs font-code tracking-wide">
              <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
              &lt;available for work /&gt;
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-[86px] font-display font-black text-bright leading-[0.95] tracking-tight"
          >
            {profile.name.split(' ')[0]}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-cyan/80 to-violet">
              {profile.name.split(' ')[1]}
            </span>
          </motion.h1>

          {/* Typing role */}
          <motion.div variants={fadeUp} className="mt-5 h-9 flex items-center">
            <span className="text-lg sm:text-xl font-code text-muted">
              {typedRole}
              <span className="animate-cursor-blink text-cyan ml-0.5">|</span>
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="mt-6 text-muted text-base sm:text-lg leading-relaxed max-w-xl font-body"
          >
            {profile.bio[0]}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative group flex items-center gap-2 px-6 py-3 bg-cyan text-dark
                         font-body font-semibold text-sm rounded-xl overflow-hidden
                         shadow-[0_0_25px_rgba(0,212,255,0.3)]
                         hover:shadow-[0_0_40px_rgba(0,212,255,0.5)]
                         transition-all duration-300 hover:scale-[1.03] min-h-[44px]"
              aria-label="View my work"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Eye size={17} aria-hidden="true" />
                View My Work
              </span>
              {/* Shimmer overlay */}
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent
                           -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"
                aria-hidden="true"
              />
            </button>

            <a
              href="/cv.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 border border-white/15 text-bright
                         font-body font-semibold text-sm rounded-xl
                         hover:border-cyan/40 hover:text-cyan hover:bg-cyan/5
                         transition-all duration-300 min-h-[44px]"
              aria-label="Download CV"
            >
              <Download size={17} aria-hidden="true" />
              Download CV
            </a>
          </motion.div>

          {/* Mobile socials */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex lg:hidden items-center gap-6"
            aria-label="Social links"
          >
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted hover:text-cyan transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Icon size={21} aria-hidden="true" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-muted text-[10px] font-code tracking-[0.2em] uppercase">scroll</span>
        <div className="animate-float">
          <ArrowDown size={16} className="text-cyan" />
        </div>
      </motion.div>
    </section>
  );
}
