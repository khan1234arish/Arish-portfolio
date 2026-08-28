'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Code2, Sparkles, ArrowUpRight } from 'lucide-react';
import { SiteProfile } from '@/data/types';

interface AboutProps {
  profile: SiteProfile;
}

export default function About({ profile }: AboutProps) {
  return (
    <section id="about" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Visual & Monogram Frame */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="relative rounded-3xl bg-surface-card border border-white/[0.08] p-8 overflow-hidden shadow-2xl">
            {/* Ambient crimson glow */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-crimson-600/10 rounded-full blur-[90px] pointer-events-none" />

            <div className="space-y-6">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] text-[11px] font-mono text-text-muted">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-crimson-600" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <span>arish.identity</span>
              </div>

              {/* Developer Monogram / Visual Card */}
              <div className="h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-[#0e0e0e] to-[#141414] border border-white/[0.06] p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div className="font-mono text-xs text-crimson-500 font-bold uppercase tracking-widest">
                    // DEVELOPER ID
                  </div>
                  <Terminal className="w-4 h-4 text-text-muted" />
                </div>

                <div className="my-auto text-center space-y-2">
                  <div className="text-5xl sm:text-6xl font-black font-mono tracking-tighter text-white">
                    {profile.name.toUpperCase()}
                  </div>
                  <div className="text-xs font-mono text-text-muted uppercase tracking-wider">
                    {profile.role}
                  </div>
                </div>

                <div className="flex justify-between items-end text-[10px] font-mono text-text-muted border-t border-white/[0.04] pt-3">
                  <span>LOCATION: {profile.location}</span>
                  <span className="text-crimson-400">ACTIVE BUILDER</span>
                </div>
              </div>

              {/* Quick Philosophy Pillars */}
              <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                <div className="p-3 rounded-xl bg-surface-subtle border border-white/[0.04]">
                  <span className="text-text-muted block text-[10px]">PHILOSOPHY</span>
                  <span className="text-white font-semibold mt-0.5 block">Sub-Second Speed</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-subtle border border-white/[0.04]">
                  <span className="text-text-muted block text-[10px]">CRAFT</span>
                  <span className="text-white font-semibold mt-0.5 block">Zero Bloat Code</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Bio & Core Narrative */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-crimson-500" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-crimson-500">
                PROFILE &amp; BACKGROUND
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white leading-tight">
              THE DEVELOPER BEHIND THE WORK
            </h2>
          </div>

          {/* Bio Paragraphs */}
          <div className="space-y-4 text-base sm:text-lg text-text-secondary leading-relaxed">
            {profile.bioDetailed.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Key Facts / Core Focus */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
            <div className="p-4 rounded-2xl bg-surface-card border border-white/[0.06]">
              <div className="text-xs font-mono text-crimson-400 font-bold mb-1">DISCIPLINES</div>
              <div className="text-sm font-semibold text-white">Websites · Web Apps · iOS</div>
            </div>
            <div className="p-4 rounded-2xl bg-surface-card border border-white/[0.06]">
              <div className="text-xs font-mono text-crimson-400 font-bold mb-1">FOUNDATION</div>
              <div className="text-sm font-semibold text-white">Next.js, TypeScript &amp; Swift</div>
            </div>
            <div className="p-4 rounded-2xl bg-surface-card border border-white/[0.06]">
              <div className="text-xs font-mono text-crimson-400 font-bold mb-1">STANDARDS</div>
              <div className="text-sm font-semibold text-white">Production-Ready &amp; Scalable</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
