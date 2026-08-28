'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TechStackItem } from '@/data/types';

interface TechnologyProps {
  technologies: TechStackItem[];
}

export default function Technology({ technologies }: TechnologyProps) {
  // Group technologies by category
  const categories: TechStackItem['category'][] = [
    'Frontend',
    'Mobile / iOS',
    'Backend & Data',
    'Architecture & Tools',
  ];

  return (
    <section id="tech" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-crimson-500" />
          <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-crimson-500">
            TECHNICAL ARSENAL
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase text-white">
          TECHNOLOGY &amp; STACK
        </h2>
        <p className="mt-3 text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed">
          A restrained, production-tested toolchain chosen for maximum reliability, speed, and long-term maintainability.
        </p>
      </div>

      {/* Categories Grouped Presentation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {categories.map((category, catIdx) => {
          const items = technologies.filter((t) => t.category === category);
          if (items.length === 0) return null;

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: catIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-surface-card border border-white/[0.08] p-5 sm:p-8 hover:border-white/20 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 sm:pb-6 mb-4 sm:mb-6 border-b border-white/[0.06]">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
                    {category}
                  </h3>
                  <span className="font-mono text-[11px] text-crimson-400">
                    0{catIdx + 1}
                  </span>
                </div>

                <div className="space-y-3">
                  {items.map((tech) => (
                    <div
                      key={tech.id}
                      className="group/item flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 p-2.5 sm:p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-crimson-500/60 group-hover/item:bg-crimson-500 transition-colors shrink-0" />
                        <span className="text-sm sm:text-base lg:text-lg font-bold text-white font-mono tracking-tight">
                          {tech.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-text-muted pl-4 sm:pl-0 sm:truncate sm:max-w-xs break-words">
                        {tech.focus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
