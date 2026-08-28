'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProcessStep } from '@/data/types';

interface ProcessProps {
  steps: ProcessStep[];
}

export default function Process({ steps }: ProcessProps) {
  return (
    <section id="process" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Section Title */}
      <div className="max-w-3xl mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-crimson-500" />
          <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-crimson-500">
            ENGINEERING WORKFLOW
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase text-white">
          FROM IDEA TO LAUNCH
        </h2>
        <p className="mt-3 text-base sm:text-lg text-text-secondary">
          A disciplined, 4-stage engineering lifecycle designed to eliminate uncertainty and deliver high-impact products.
        </p>
      </div>

      {/* Process Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-3xl bg-surface-card border border-white/[0.08] p-6 sm:p-8 hover:border-crimson-500/40 transition-all duration-500 flex flex-col justify-between"
          >
            <div>
              {/* Step indicator */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.06]">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-md bg-white/[0.04] text-crimson-400 border border-white/[0.06]">
                  PHASE {step.step}
                </span>
                <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-crimson-500 transition-colors" />
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-crimson-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-xs font-mono text-text-muted mt-1 mb-4">
                {step.subtitle}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Deliverables List */}
            {step.deliverables && step.deliverables.length > 0 && (
              <div className="pt-6 mt-6 border-t border-white/[0.06] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block mb-2">
                  Key Artifacts
                </span>
                {step.deliverables.map((item, itemIdx) => (
                  <div key={itemIdx} className="text-[11px] font-mono text-text-secondary flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-crimson-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
