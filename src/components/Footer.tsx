'use client';

import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { SiteProfile } from '@/data/types';

interface FooterProps {
  profile: SiteProfile;
}

export default function Footer({ profile }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#030303] py-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left: Identity Monogram & Role */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black font-mono tracking-widest text-white uppercase">
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
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-text-muted">
          <span>{profile.location}</span>
          <span className="text-white/20">|</span>
          <a
            href={`mailto:${profile.email}`}
            className="text-text-secondary hover:text-crimson-400 transition-colors"
          >
            {profile.email}
          </a>
          {profile.phone && (
            <>
              <span className="text-white/20">|</span>
              <a
                href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                className="text-text-secondary hover:text-crimson-400 transition-colors"
              >
                {profile.phone}
              </a>
            </>
          )}
        </div>

        {/* Right: Scroll to top & Signature */}
        <div className="flex items-center gap-6">
          <span className="text-xs font-mono text-text-muted">
            Designed &amp; Built by {profile.name}.
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-3 rounded-full bg-surface-card border border-white/[0.08] hover:border-crimson-500/40 text-text-secondary hover:text-white transition-colors cursor-interactive"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
