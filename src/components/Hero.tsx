'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { SiteProfile, Availability } from '@/data/types';

interface HeroProps {
  profile: SiteProfile;
  availability: Availability;
}

export default function Hero({ profile, availability }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-32 pb-16 px-6 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient background glow - ultra subtle */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-crimson-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-crimson-700/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Background grid texture */}
      <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none -z-10" />

      {/* Top Meta Line: Availability & Role */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-between gap-4 pb-12 border-b border-white/[0.06]"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
            Independent Studio
          </span>
          <span className="text-white/20">/</span>
          <span className="font-mono text-xs text-white/90 font-medium">
            {profile.role}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse-subtle" />
          <span className="font-mono text-xs text-text-secondary tracking-wide uppercase">
            {availability.statusLabel || 'AVAILABLE FOR SELECT PROJECTS'}
          </span>
        </div>
      </motion.div>

      {/* Main Cinematic Hero Content */}
      <div className="my-auto py-12 sm:py-16">
        {/* Name Title */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block mb-6 sm:mb-8"
        >
          <span className="text-xs font-mono font-semibold tracking-[0.3em] uppercase text-crimson-500 block mb-2">
            PORTFOLIO // 2025
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-white leading-[0.95] select-none">
            {profile.name}
            <span className="text-crimson-500">.</span>
          </h1>
        </motion.div>

        {/* Headline Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.2]">
            I design and build modern <br className="hidden sm:inline" />
            <span className="text-white">digital experiences</span>.
          </p>
          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
            Websites, web apps, and iOS apps built with thoughtful design, tactile interaction, and uncompromising performance.
          </p>
        </motion.div>

        {/* Subtitle / Capabilities Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono text-text-secondary"
        >
          {profile.rolesList.map((item, idx) => (
            <React.Fragment key={item}>
              <span className="px-3 py-1 rounded-md bg-surface-card border border-white/[0.08] text-white/90 hover:border-crimson-500/40 transition-colors">
                {item}
              </span>
              {idx < profile.rolesList.length - 1 && (
                <span className="text-white/20">·</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
        >
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-semibold text-sm tracking-wide hover:bg-crimson-600 hover:text-white transition-all duration-300 shadow-xl group cursor-interactive"
          >
            <span>View My Work</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-surface-card border border-white/[0.12] text-white font-medium text-sm tracking-wide hover:border-crimson-500/50 hover:bg-surface-elevated transition-all duration-300 group cursor-interactive"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-crimson-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Bottom Indicators & Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-text-muted"
      >
        <div className="flex items-center gap-6">
          <span>LOCATION: {profile.location}</span>
          <span className="text-white/20">|</span>
          <span>SPECIALTY: WEB &amp; APPLE PLATFORMS</span>
        </div>

        <a
          href="#work"
          className="hidden md:flex items-center gap-2 text-text-secondary hover:text-white transition-colors"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
