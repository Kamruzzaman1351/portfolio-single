'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Briefcase } from 'lucide-react';
import { experiences, type Experience } from '@/lib/data';

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, ease: 'easeOut' as const, delay: index * 0.1 }}
      className="relative flex gap-6 sm:gap-8"
    >
      {/* Left: year + dot column */}
      <div className="flex flex-col items-center shrink-0 w-16 sm:w-20">
        {/* Year badge */}
        <div
          className="px-2 py-1 rounded-lg text-[10px] sm:text-xs font-code font-semibold whitespace-nowrap mb-3 border"
          style={{
            color: exp.color,
            borderColor: `${exp.color}30`,
            backgroundColor: `${exp.color}08`,
          }}
        >
          {exp.startDate}
        </div>
        {/* Dot */}
        <div
          className="w-4 h-4 rounded-full border-2 border-dark shrink-0 z-10 relative"
          style={{
            backgroundColor: exp.color,
            boxShadow: `0 0 14px ${exp.color}70`,
          }}
          aria-hidden="true"
        />
        {/* Connector line to next entry */}
        {index < experiences.length - 1 && (
          <div
            className="flex-1 w-px mt-3"
            style={{
              background: `linear-gradient(to bottom, ${exp.color}40, ${experiences[index + 1].color}20)`,
            }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Right: card */}
      <div className="flex-1 pb-12">
        <article
          className="p-6 sm:p-7 bg-surface/60 backdrop-blur-sm rounded-2xl border border-white/[0.06]
                     hover:border-white/10 hover:bg-surface/80 transition-all duration-300
                     hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
        >
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-display font-bold text-bright text-lg sm:text-xl leading-snug">
                {exp.role}
              </h3>
              <p
                className="mt-1 text-sm font-body font-semibold"
                style={{ color: exp.color }}
              >
                {exp.company}
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-dark/70 border border-white/[0.06] rounded-lg text-xs font-code text-muted">
                <Briefcase size={11} aria-hidden="true" />
                {exp.startDate}
                {' — '}
                {exp.endDate}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-dark/70 border border-white/[0.06] rounded-lg text-xs font-code text-muted">
                <MapPin size={11} aria-hidden="true" />
                {exp.location}
              </span>
            </div>
          </div>

          {/* Company description */}
          {exp.companyDescription && (
            <div
              className="mb-5 pl-3 border-l-2 text-xs sm:text-sm font-body text-muted/70 italic leading-relaxed"
              style={{ borderColor: `${exp.color}40` }}
            >
              {exp.companyDescription}
            </div>
          )}

          {/* Separator */}
          <div
            className="mb-4 h-px w-full"
            style={{
              background: `linear-gradient(to right, ${exp.color}20, transparent)`,
            }}
            aria-hidden="true"
          />

          {/* Bullet points */}
          <ul className="space-y-3" aria-label="Responsibilities and achievements">
            {exp.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="shrink-0 mt-[3px] text-lg leading-none font-black select-none"
                  style={{ color: exp.color }}
                  aria-hidden="true"
                >
                  ›
                </span>
                <span className="text-sm font-body text-muted leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-dark relative overflow-hidden"
      aria-label="Work experience section"
    >
      {/* Background glows */}
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan/[0.03] rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-violet/[0.03] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 lg:mb-16"
        >
          <span className="text-xs font-code text-muted tracking-[0.15em] uppercase">
            work_history.json
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-black text-bright">
            Where I&apos;ve
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">
              {' '}Worked
            </span>
          </h2>
          <p className="mt-4 text-muted font-body text-sm sm:text-base max-w-xl">
            My professional journey — building production-grade products, leading teams, and
            growing as an engineer across two continents.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}

          {/* End cap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center gap-3 pl-[52px] sm:pl-[68px]"
            aria-hidden="true"
          >
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <span className="text-xs font-code text-muted/40 tracking-widest">
              2016 — the beginning
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
