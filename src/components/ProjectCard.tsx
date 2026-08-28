'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Globe, Monitor, Smartphone } from 'lucide-react';
import { Project } from '@/data/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isMehar = project.slug === 'mehar';
  const isProduction = project.projectNature === 'production';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-3xl bg-surface-card border border-white/[0.08] hover:border-crimson-500/40 transition-all duration-500 overflow-hidden flex flex-col justify-between ${
        isMehar ? 'lg:col-span-12 p-8 sm:p-12' : 'lg:col-span-6 p-6 sm:p-8'
      }`}
    >
      {/* Background crimson ambient glow on hover */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-crimson-600/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Card Header: Badge & Platforms */}
      <div>
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-2.5">
            {isProduction ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-crimson-950/80 border border-crimson-700/60 text-crimson-300 font-mono text-xs font-bold tracking-wider uppercase shadow-sm">
                <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
                CLIENT PRODUCTION
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-text-secondary font-mono text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
                BUILT BY ME
              </span>
            )}

            <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-surface-subtle border border-white/[0.04] text-text-muted">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
            <span>0{project.order}</span>
            <span>/</span>
            <span>{project.year}</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="mt-8 space-y-6">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white group-hover:text-crimson-400 transition-colors">
                {project.title}
              </h3>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/[0.06] hover:bg-crimson-600 text-white transition-colors"
                  aria-label={`Open live site for ${project.title}`}
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="mt-2 text-sm sm:text-base font-mono text-text-secondary">
              {project.subtitle}
            </p>

            {/* Platform pill badges */}
            {project.platforms && (
              <div className="flex items-center gap-2 mt-3 text-[11px] font-mono text-text-muted">
                <span className="text-white/40">PLATFORMS:</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.platforms.map((plat) => (
                    <span
                      key={plat}
                      className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-white flex items-center gap-1"
                    >
                      {plat === 'Web' ? (
                        <Monitor className="w-3 h-3 text-crimson-500" />
                      ) : (
                        <Smartphone className="w-3 h-3 text-crimson-500" />
                      )}
                      {plat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-2 pt-2">
              {project.highlights.slice(0, isMehar ? 4 : 3).map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-muted">
                  <CheckCircle2 className="w-4 h-4 text-crimson-500 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.06]">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-surface-subtle border border-white/[0.04]">
                  <div className="text-base sm:text-lg font-bold text-white font-mono">{metric.value}</div>
                  <div className="text-[10px] text-text-muted truncate mt-0.5">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-surface-subtle border border-white/[0.06] text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Links */}
      <div className="flex items-center gap-4 pt-8 mt-6 border-t border-white/[0.04]">
        <Link
          href={`/work/${project.slug}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-crimson-600 hover:text-white transition-all duration-300 shadow-md group/btn cursor-interactive"
        >
          <span>View Case Study</span>
          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Link>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-white transition-colors"
          >
            <span>Live Project</span>
            <Globe className="w-3.5 h-3.5 text-crimson-500" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
