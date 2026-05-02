'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials, type Testimonial } from '@/lib/data';

const AVATAR_COLORS: Record<string, { bg: string; ring: string; text: string }> = {
  DK: { bg: 'from-cyan/20 to-violet/20', ring: '#00D4FF', text: 'text-cyan' },
  RJ: { bg: 'from-violet/20 to-pink-500/20', ring: '#7B61FF', text: 'text-violet' },
};

const FALLBACK_STYLE = { bg: 'from-cyan/10 to-violet/10', ring: '#00D4FF', text: 'text-cyan' };

function QuoteIcon({ color }: { color: string }) {
  return (
    <svg
      width="36"
      height="28"
      viewBox="0 0 36 28"
      fill="none"
      aria-hidden="true"
      className="shrink-0 opacity-80"
    >
      <path
        d="M0 28V17.6C0 14.1333 0.693333 10.9867 2.08 8.16C3.46667 5.28 5.49333 2.85333 8.16 0.879999L11.68 4.08C9.6 5.70667 8.05333 7.57333 7.04 9.68C6.02667 11.7333 5.52 13.8933 5.52 16.16H11.04V28H0ZM20.96 28V17.6C20.96 14.1333 21.6533 10.9867 23.04 8.16C24.4267 5.28 26.4533 2.85333 29.12 0.879999L32.64 4.08C30.56 5.70667 29.0133 7.57333 28 9.68C26.9867 11.7333 26.48 13.8933 26.48 16.16H32V28H20.96Z"
        fill={color}
      />
    </svg>
  );
}

function StarRating() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} className="fill-amber-400 text-amber-400" aria-hidden="true" />
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const style = AVATAR_COLORS[t.avatar] ?? FALLBACK_STYLE;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: 'easeOut' as const, delay: index * 0.15 }}
      className="flex flex-col h-full p-7 sm:p-8 bg-surface/60 backdrop-blur-sm rounded-2xl
                 border border-white/[0.06] hover:border-white/10
                 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]
                 transition-all duration-300 group"
    >
      {/* Top row: quote icon + stars */}
      <div className="flex items-start justify-between mb-6">
        <QuoteIcon color={style.ring} />
        <StarRating />
      </div>

      {/* Review text */}
      <blockquote className="flex-1 text-sm sm:text-base font-body text-muted leading-relaxed">
        &ldquo;{t.review}&rdquo;
      </blockquote>

      {/* Divider */}
      <div
        className="my-6 h-px w-full"
        style={{ background: `linear-gradient(to right, ${style.ring}25, transparent)` }}
        aria-hidden="true"
      />

      {/* Reviewer info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.bg} border flex items-center justify-center shrink-0`}
          style={{ borderColor: `${style.ring}30` }}
          aria-hidden="true"
        >
          <span className={`text-sm font-display font-black ${style.text}`}>{t.avatar}</span>
        </div>

        {/* Name + title */}
        <div className="min-w-0">
          <p className="font-display font-bold text-bright text-sm truncate">{t.name}</p>
          <p className="text-xs font-body text-muted truncate">{t.title}</p>
          <p className={`text-xs font-code truncate ${style.text}`}>{t.company}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-surface/20 relative overflow-hidden"
      aria-label="Client testimonials"
    >
      {/* Background glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan/[0.03] rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet/[0.03] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 lg:mb-16 text-center"
        >
          <span className="text-xs font-code text-muted tracking-[0.15em] uppercase">
            client_reviews[]
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-black text-bright">
            What Clients
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">
              {' '}Say
            </span>
          </h2>
          <p className="mt-4 text-muted font-body text-sm sm:text-base max-w-xl mx-auto">
            Honest words from people I've had the pleasure of working with.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} />
          ))}
        </div>

        {/* Bottom CTA nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="https://www.linkedin.com/in/kamruzzaman-md/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-body text-muted hover:text-cyan transition-colors duration-200 group"
            aria-label="View more recommendations on LinkedIn"
          >
            <span>View more on LinkedIn</span>
            <span
              className="inline-block group-hover:translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
