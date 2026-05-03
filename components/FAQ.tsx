'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '@/lib/data';

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' as const, delay: index * 0.07 }}
      className="border border-white/[0.06] rounded-2xl overflow-hidden
                 hover:border-white/10 transition-colors duration-300"
    >
      {/* Question row — native button for keyboard & screen-reader access */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5
                   bg-surface/50 hover:bg-surface/80 text-left transition-colors duration-200
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50"
      >
        {/* The question text is the <h3> for correct heading hierarchy */}
        <h3 className="text-sm sm:text-base font-body font-semibold text-bright leading-snug">
          {question}
        </h3>
        <span
          className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200 ${
            isOpen ? 'bg-cyan/15 text-cyan' : 'bg-white/5 text-muted'
          }`}
          aria-hidden="true"
        >
          {isOpen ? <Minus size={15} /> : <Plus size={15} />}
        </span>
      </button>

      {/* Answer — AnimatePresence for smooth height transition */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' as const }}
            className="overflow-hidden"
          >
            {/*
              The answer text is wrapped in a <p> so search crawlers and AI
              parsers can extract it as plain prose — matching the FAQPage schema.
            */}
            <p className="px-5 sm:px-6 pb-5 pt-3 text-sm font-body text-muted leading-relaxed border-t border-white/[0.04]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-dark relative overflow-hidden"
      aria-label="Frequently asked questions"
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-violet/[0.03] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left — sticky header column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <span className="text-xs font-code text-muted tracking-[0.15em] uppercase">
              faq.json
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-black text-bright leading-tight">
              Common
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">
                {' '}Questions
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base font-body text-muted leading-relaxed">
              Everything you need to know about working with me — answered directly.
            </p>

            {/* Decorative accent */}
            <div
              className="mt-8 hidden lg:block h-px w-16 bg-gradient-to-r from-cyan to-violet"
              aria-hidden="true"
            />
          </motion.div>

          {/* Right — accordion list */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
