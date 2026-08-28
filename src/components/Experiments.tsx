'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical } from 'lucide-react';
import { Experiment } from '@/data/types';

interface ExperimentsProps {
  experiments: Experiment[];
}

export default function Experiments({ experiments }: ExperimentsProps) {
  if (!experiments || experiments.length === 0) return null;

  return (
    <section id="experiments" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-crimson-500" />
            <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-crimson-500">
              R&amp;D AND PROTOTYPES
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase text-white">
            EXPERIMENTS
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-text-secondary max-w-2xl leading-relaxed">
            Interactive UI prototypes, motion experiments, and exploratory code labs.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
          <FlaskConical className="w-4 h-4 text-crimson-500" />
          <span>EXPERIMENTAL LAB</span>
        </div>
      </div>

      {/* Experiments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {experiments.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group rounded-3xl bg-surface-card border border-white/[0.08] p-5 sm:p-7 hover:border-crimson-500/40 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-white/[0.06]">
                <span className="text-[11px] font-mono text-crimson-400 font-bold uppercase">
                  {exp.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] border border-white/[0.05] text-text-muted">
                  {exp.status}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-crimson-400 transition-colors">
                {exp.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
                {exp.description}
              </p>
            </div>

            <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-white/[0.06] flex flex-wrap gap-1.5">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-subtle border border-white/[0.04] text-text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
