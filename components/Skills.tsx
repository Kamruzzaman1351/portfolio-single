'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2 } from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiGraphql,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGit,
  SiFigma,
  SiLinux,
  SiRust,
  SiKubernetes,
  SiPrisma,
  SiMysql,
  SiFirebase,
  SiShopify,
  SiSalesforce,
  SiStripe,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import { skills, type Skill } from '@/lib/data';

const ICON_MAP: Partial<Record<string, IconType>> = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  GraphQL: SiGraphql,
  'Node.js': SiNodedotjs,
  Python: SiPython,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  Docker: SiDocker,
  Git: SiGit,
  Figma: SiFigma,
  Linux: SiLinux,
  Rust: SiRust,
  Kubernetes: SiKubernetes,
  Prisma: SiPrisma,
  MySQL: SiMysql,
  Firebase: SiFirebase,
  'Shopify API': SiShopify,
  'Salesforce CRM': SiSalesforce,
  'Stripe / Payment APIs': SiStripe,
};

const CATEGORY_COLORS: Record<Skill['category'], string> = {
  Frontend: 'text-cyan',
  Backend: 'text-violet',
  'DevOps & Tools': 'text-emerald-400',
  Database: 'text-sky-400',
  Integrations: 'text-orange-400',
  'Learning For Fun': 'text-amber-400',
};

const CATEGORY_BORDER: Record<Skill['category'], string> = {
  Frontend: 'border-cyan/20 hover:border-cyan/40',
  Backend: 'border-violet/20 hover:border-violet/40',
  'DevOps & Tools': 'border-emerald-400/20 hover:border-emerald-400/40',
  Database: 'border-sky-400/20 hover:border-sky-400/40',
  Integrations: 'border-orange-400/20 hover:border-orange-400/40',
  'Learning For Fun': 'border-amber-400/20 hover:border-amber-400/40',
};

const DOT_COLORS: Record<Skill['category'], string> = {
  Frontend: 'bg-cyan',
  Backend: 'bg-violet',
  'DevOps & Tools': 'bg-emerald-400',
  Database: 'bg-sky-400',
  Integrations: 'bg-orange-400',
  'Learning For Fun': 'bg-amber-400',
};

const CATEGORIES: Skill['category'][] = [
  'Backend',
  'Frontend',
  'Database',
  'DevOps & Tools',
  'Integrations',
  'Learning For Fun',
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function SkillBadge({ skill }: { skill: Skill }) {
  const IconComponent = ICON_MAP[skill.name];
  const color = CATEGORY_COLORS[skill.category];
  const border = CATEGORY_BORDER[skill.category];
  const dotColor = DOT_COLORS[skill.category];

  return (
    <motion.div
      variants={badgeVariants}
      className={`flex items-center gap-3 px-4 py-3 bg-surface/60 backdrop-blur-sm rounded-xl border transition-all duration-300 cursor-default ${border} hover:bg-surface/80 hover:scale-[1.02] group`}
    >
      <span className={`shrink-0 ${color}`} aria-hidden="true">
        {IconComponent ? (
          <IconComponent size={17} />
        ) : (
          <Code2 size={17} />
        )}
      </span>
      <span className="text-sm font-body text-bright flex-1 min-w-0 truncate">{skill.name}</span>
      <div className="flex gap-1 shrink-0" aria-label={`Proficiency: ${skill.level} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i < skill.level ? dotColor : 'bg-white/10'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-dark relative overflow-hidden"
      aria-label="Skills section"
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/[0.03] rounded-full blur-[120px] pointer-events-none"
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
            tech_stack.json
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-black text-bright">
            Tools I Work
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">
              {' '}With
            </span>
          </h2>
          <p className="mt-4 text-muted font-body text-sm sm:text-base max-w-xl">
            A curated stack I rely on to build fast, scalable, and maintainable software — from prototype to production.
          </p>
        </motion.div>

        {/* Category grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {CATEGORIES.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category);
            // Integrations has 6 items — span both columns so badges have room
            const isWide = category === 'Integrations';
            return (
              <div key={category} className={isWide ? 'md:col-span-2' : ''}>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  className={`text-xs font-code tracking-[0.12em] uppercase mb-4 ${CATEGORY_COLORS[category]}`}
                >
                  {category}
                </motion.h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className={`grid gap-2.5 ${
                    isWide
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2'
                  }`}
                >
                  {categorySkills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
