'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { SiteProfile } from '@/data/types';

interface FooterProps {
  profile: SiteProfile;
}

export default function Footer({ profile }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#030303] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
        {/* Left: Identity Monogram & Role */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="text-base sm:text-lg font-black font-mono tracking-widest text-white uppercase">
              {profile.name}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
              {profile.role}
            </span>
          </div>

          <p className="text-xs font-mono text-text-muted">
            Websites · Web Apps · iOS Apps
          </p>
        </div>

        {/* Center: Location & Direct Contact */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs font-mono text-text-muted">
          <span>{profile.location}</span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <a
            href={`mailto:${profile.email}`}
            className="text-text-secondary hover:text-crimson-400 active:text-crimson-300 transition-colors inline-flex items-center min-h-[44px] py-2"
          >
            {profile.email}
          </a>
          {profile.phone && (
            <>
              <span className="text-white/20 hidden sm:inline">|</span>
              <a
                href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                className="text-text-secondary hover:text-crimson-400 active:text-crimson-300 transition-colors inline-flex items-center min-h-[44px] py-2"
              >
                {profile.phone}
              </a>
            </>
          )}
        </div>

        {/* Right: Scroll to top & Signature */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4 pt-4 md:pt-0 border-t border-white/[0.04] md:border-t-0">
          <span className="text-xs font-mono text-text-muted">
            © {new Date().getFullYear()} {profile.name}.
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center p-3 rounded-full bg-surface-card border border-white/[0.08] hover:border-crimson-500/40 active:bg-white/[0.06] text-text-secondary hover:text-white transition-colors cursor-interactive"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
