'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Layout, Smartphone } from 'lucide-react';
import { Service } from '@/data/types';

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  const getIcon = (number: string) => {
    switch (number) {
      case '01':
        return <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-crimson-500" />;
      case '02':
        return <Layout className="w-5 h-5 sm:w-6 sm:h-6 text-crimson-500" />;
      case '03':
        return <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-crimson-500" />;
      default:
        return <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-crimson-500" />;
    }
  };

  return (
    <section id="services" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Section Title */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-crimson-500" />
          <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-crimson-500">
            DISCIPLINES &amp; EXPERTISE
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase text-white">
          WHAT I BUILD
        </h2>
        <p className="mt-3 text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed">
          Specialized in high-craft digital products across modern web and native Apple platforms.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {services.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-3xl bg-surface-card border border-white/[0.08] p-6 sm:p-8 hover:border-crimson-500/40 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Ambient hover glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-crimson-600/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="space-y-5 sm:space-y-6">
              {/* Header with Number and Icon */}
              <div className="flex items-center justify-between pb-5 sm:pb-6 border-b border-white/[0.06]">
                <span className="font-mono text-xl sm:text-2xl font-black text-white/30 group-hover:text-crimson-500 transition-colors">
                  {service.number}
                </span>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-surface-subtle border border-white/[0.06] group-hover:border-crimson-500/30 transition-colors">
                  {getIcon(service.number)}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white group-hover:text-crimson-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-mono text-text-muted mt-1">
                  {service.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {service.description}
              </p>

              {/* Deliverables */}
              {service.deliverables && service.deliverables.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                  <span className="text-[10px] sm:text-[11px] font-mono text-text-muted uppercase tracking-wider block mb-2 sm:mb-3">
                    Deliverables &amp; Focus
                  </span>
                  {service.deliverables.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-2 text-xs text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-crimson-500/80 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Technologies Footer */}
            <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-white/[0.06] flex flex-wrap gap-1.5">
              {service.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2 sm:px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono bg-surface-subtle border border-white/[0.04] text-text-muted"
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
