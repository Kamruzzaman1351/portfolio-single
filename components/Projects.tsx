'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects, type Project } from '@/lib/data';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col bg-surface/60 backdrop-blur-sm rounded-2xl border border-white/[0.06] overflow-hidden
                 hover:border-cyan/20 hover:shadow-[0_0_40px_rgba(0,212,255,0.08)] transition-all duration-300"
    >
      {/* Thumbnail */}
      <div
        className={`relative h-44 sm:h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
        aria-hidden="true"
      >
        <span className="text-5xl font-display font-black text-white/10 select-none">
          {project.initials}
        </span>
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-dark/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-bright text-sm font-body hover:bg-white/20 transition-colors min-h-[44px]"
            onClick={(e) => e.stopPropagation()}
          >
            <FaGithub size={16} aria-hidden="true" />
            Code
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live demo of ${project.title}`}
            className="flex items-center gap-2 px-4 py-2 bg-cyan/90 text-dark rounded-lg text-sm font-body font-semibold hover:bg-cyan transition-colors min-h-[44px]"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={16} aria-hidden="true" />
            Live
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-display font-bold text-bright text-lg leading-tight group-hover:text-cyan transition-colors duration-200">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="text-muted hover:text-bright transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
            >
              <FaGithub size={17} aria-hidden="true" />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="text-muted hover:text-cyan transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
            >
              <ExternalLink size={17} aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className="text-muted font-body text-sm leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-dark/70 border border-white/[0.06] rounded-md text-xs font-code text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-surface/30 relative overflow-hidden"
      aria-label="Projects section"
    >
      {/* Background accent */}
      <div
        className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-violet/[0.04] rounded-full blur-[120px] pointer-events-none"
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
            featured_projects[]
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-black text-bright">
            Things I&apos;ve
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">
              {' '}Built
            </span>
          </h2>
          <p className="mt-4 text-muted font-body text-sm sm:text-base max-w-xl">
            A selection of projects I&apos;m proud of — from open-source libraries to production SaaS products.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-body text-muted hover:text-cyan transition-colors duration-200"
            aria-label="View all projects on GitHub"
          >
            View All Projects
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
