'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { profile, stats, type Stat } from '@/lib/data';

function CountUp({ target, suffix, isActive }: { target: number; suffix: string; isActive: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let frame = 0;
    const totalFrames = 60;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.min(Math.round((frame / totalFrames) * target), target));
      if (frame >= totalFrames) clearInterval(timer);
    }, 1500 / totalFrames);
    return () => clearInterval(timer);
  }, [isActive, target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

function StatCard({ stat, isActive }: { stat: Stat; isActive: boolean }) {
  return (
    <div className="p-5 sm:p-6 bg-surface/60 backdrop-blur-sm rounded-2xl border border-white/[0.06] text-center group hover:border-cyan/15 transition-all duration-300">
      <div className="text-2xl sm:text-3xl font-display font-black text-cyan">
        <CountUp target={stat.value} suffix={stat.suffix} isActive={isActive} />
      </div>
      <p className="mt-1 text-xs sm:text-sm font-body text-muted">{stat.label}</p>
    </div>
  );
}

const slideIn = (dir: 'left' | 'right') => ({
  hidden: { opacity: 0, x: dir === 'left' ? -40 : 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: "easeOut" as const } },
});

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-dark relative overflow-hidden"
      aria-label="About section"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet/[0.04] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Avatar column */}
          <motion.div
            variants={slideIn('left')}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-1 rounded-2xl blur-md opacity-40 bg-gradient-to-br from-cyan via-violet to-cyan"
                aria-hidden="true"
              />
              {/* Avatar card */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan/8 via-surface to-violet/8 border border-white/[0.08] flex flex-col items-center justify-center gap-3">
                <span className="text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan/40 to-violet/40 select-none">
                  KAM
                </span>
                <span className="text-sm font-code text-muted/60">{'<developer />'}</span>
                {/* Decorative blobs */}
                <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-cyan/8 blur-2xl" aria-hidden="true" />
                <div className="absolute bottom-6 left-6 w-20 h-20 rounded-full bg-violet/8 blur-2xl" aria-hidden="true" />
                {/* Corner dots */}
                <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-cyan/30" aria-hidden="true" />
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-violet/30" aria-hidden="true" />
              </div>
            </div>
          </motion.div>

          {/* Content column */}
          <motion.div
            variants={slideIn('right')}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <span className="text-xs font-code text-muted tracking-[0.15em] uppercase">
              about_me.ts
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-black text-bright leading-tight">
              Crafting Digital
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">
                {' '}Experiences
              </span>
            </h2>
            <div className="mt-6 space-y-4">
              {profile.bio.map((para, i) => (
                <p key={i} className="text-muted font-body leading-relaxed text-sm sm:text-base">
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 text-sm font-body text-muted">
                <span
                  className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot"
                  aria-hidden="true"
                />
                Available for new projects
              </span>
              <span className="text-muted/30">·</span>
              <span className="text-sm font-body text-muted">{profile.location}</span>
            </div>
          </motion.div>
        </div>

        {/* Stats grid */}
        <motion.div
          ref={statsRef}
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4"
          aria-label="Career statistics"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} isActive={statsInView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
