'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { profile } from '@/lib/data';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const SOCIALS = [
  { Icon: FaGithub, href: profile.socials.github, label: 'GitHub' },
  { Icon: FaLinkedinIn, href: profile.socials.linkedin, label: 'LinkedIn' },
];

function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required,
}: {
  id: keyof FormState;
  label: string;
  type?: string;
  value: string;
  onChange: (id: keyof FormState, val: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-code text-muted tracking-wide">
        {label}
        {required && <span className="text-cyan ml-1">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        required={required}
        className="w-full bg-dark/60 border border-white/[0.08] rounded-xl px-4 py-3 text-bright font-body text-sm
                   placeholder:text-muted/40 focus:outline-none focus:border-cyan/50
                   focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)] transition-all duration-200 min-h-[44px]"
        placeholder={`Enter your ${label.toLowerCase()}`}
        aria-required={required}
      />
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (id: keyof FormState, val: string) =>
    setForm((s) => ({ ...s, [id]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate network call
    await new Promise((r) => setTimeout(r, 1600));
    setStatus('success');
  };

  const handleReset = () => {
    setForm({ name: '', email: '', subject: '', message: '' });
    setStatus('idle');
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-surface/30 relative overflow-hidden"
      aria-label="Contact section"
    >
      {/* Glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan/[0.03] rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet/[0.04] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 lg:mb-16"
        >
          <span className="text-xs font-code text-muted tracking-[0.15em] uppercase">
            contact.ts
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-black text-bright">
            Let&apos;s Build Something
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">
              {' '}Great
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <p className="text-muted font-body leading-relaxed text-sm sm:text-base">
              Whether you have a project in mind, want to collaborate, or just want to say hello — my inbox is always open. I&apos;ll get back to you within 24 hours.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan/8 border border-cyan/15 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-cyan" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-code text-muted mb-0.5">Email</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-bright font-body text-sm hover:text-cyan transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-violet/8 border border-violet/15 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-violet" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-code text-muted mb-0.5">Location</p>
                  <p className="text-bright font-body text-sm">{profile.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/8 border border-emerald-400/15 flex items-center justify-center shrink-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-dot"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-xs font-code text-muted mb-0.5">Availability</p>
                  <p className="text-emerald-400 font-body text-sm font-medium">
                    Open to opportunities
                  </p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="mt-10">
              <p className="text-xs font-code text-muted mb-4 tracking-wide">Find me on</p>
              <div className="flex items-center gap-4" aria-label="Social links">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-surface border border-white/[0.06] flex items-center justify-center text-muted hover:text-cyan hover:border-cyan/30 hover:bg-cyan/5 transition-all duration-200"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="bg-surface/60 backdrop-blur-sm rounded-2xl border border-white/[0.06] p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
                    className="flex flex-col items-center justify-center py-12 gap-5 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center"
                    >
                      <CheckCircle size={32} className="text-cyan" aria-hidden="true" />
                    </motion.div>
                    <div>
                      <h3 className="font-display font-bold text-bright text-xl">Message Sent!</h3>
                      <p className="mt-2 text-muted font-body text-sm">
                        Thanks for reaching out. I&apos;ll be in touch within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="mt-2 px-5 py-2.5 border border-white/10 rounded-xl text-sm font-body text-muted hover:text-bright hover:border-white/20 transition-all"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    noValidate
                    aria-label="Contact form"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField
                        id="name"
                        label="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                      <InputField
                        id="email"
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <InputField
                      id="subject"
                      label="Subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    />
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-code text-muted tracking-wide">
                        Message <span className="text-cyan">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        required
                        placeholder="Tell me about your project..."
                        className="w-full bg-dark/60 border border-white/[0.08] rounded-xl px-4 py-3 text-bright font-body text-sm
                                   placeholder:text-muted/40 focus:outline-none focus:border-cyan/50
                                   focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)] transition-all duration-200 resize-none"
                        aria-required="true"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="relative group flex items-center justify-center gap-2.5 w-full py-3.5 bg-cyan text-dark
                                 font-body font-semibold text-sm rounded-xl overflow-hidden
                                 shadow-[0_0_20px_rgba(0,212,255,0.25)]
                                 hover:shadow-[0_0_35px_rgba(0,212,255,0.45)]
                                 disabled:opacity-70 disabled:cursor-not-allowed
                                 transition-all duration-300 hover:scale-[1.02] min-h-[44px]"
                      aria-label="Send message"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 size={17} className="animate-spin" aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={17} aria-hidden="true" />
                          Send Message
                          {/* Shimmer */}
                          <span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                                       -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
