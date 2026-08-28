'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/data/types';
import ProjectCard from './ProjectCard';

interface SelectedWorkProps {
  projects: Project[];
}

export default function SelectedWork({ projects }: SelectedWorkProps) {
  const [filter, setFilter] = useState<string>('All');

  const categories = [
    { label: 'All', value: 'All' },
    { label: 'Client Production', value: 'production' },
    { label: 'Web Applications', value: 'Web Application' },
    { label: 'Web & Mobile Platforms', value: 'Web & Mobile Platform' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'production') return p.projectNature === 'production';
    return p.category === filter;
  });

  return (
    <section id="work" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-crimson-500" />
            <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-crimson-500">
              PORTFOLIO ARCHIVE
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase text-white">
            SELECTED WORK
          </h2>
          <p className="mt-3 text-base sm:text-lg text-text-secondary max-w-2xl">
            A selection of production platforms and digital products designed and built with thoughtful interaction and high performance.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setFilter(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-interactive ${
                filter === cat.value
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-surface-card border border-white/[0.08] text-text-secondary hover:text-white hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {filteredProjects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}
