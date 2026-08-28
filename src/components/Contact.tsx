'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageSquare, Copy, Check, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { SiteProfile, SiteSettings, Availability } from '@/data/types';

interface ContactProps {
  profile: SiteProfile;
  settings: SiteSettings;
  availability: Availability;
}

export default function Contact({ profile, settings, availability }: ContactProps) {
  const [copied, setCopied] = useState(false);

  const emailToDisplay = profile.email || 'khan1234arish@gmail.com';
  const phoneToDisplay = profile.phone || '+91 8287313307';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailToDisplay);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.06] relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
        {/* Left Column: Headline & Bio callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-crimson-500">
                INITIATE COLLABORATION
              </span>
            </div>

            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase text-white leading-[0.95]">
              {settings.contactHeadline || 'HAVE AN IDEA?'}
              <br />
              <span className="text-crimson-500">{settings.contactSubtitle || "LET'S BUILD IT."}</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed max-w-lg">
              Whether you need an enterprise web platform, a high-converting digital product, or a fluid mobile application across iOS and Android, I am available to bring your vision to life.
            </p>
          </div>

          {/* Availability Badge Card */}
          <div className="p-6 rounded-2xl bg-surface-card border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-crimson-400 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-crimson-500 animate-ping" />
              <span>{availability.statusLabel || 'CURRENTLY AVAILABLE FOR NEW PROJECTS'}</span>
            </div>
            <p className="text-xs font-mono text-text-muted leading-relaxed">
              {availability.statusNote || 'Open for freelance contracts, full-stack product builds, and iOS/Android applications.'}
            </p>
          </div>
        </motion.div>

        {/* Right Column: Direct Contact Dispatch Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-4"
        >
          {/* Email Direct Action Card */}
          <div className="p-6 rounded-3xl bg-surface-card border border-white/[0.08] hover:border-crimson-500/40 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-crimson-500" />
                EMAIL DISPATCH
              </span>
              <span className="text-[10px] font-mono text-crimson-400 px-2 py-0.5 rounded bg-crimson-950/40 border border-crimson-800/40">
                FAST RESPONSE
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={`mailto:${emailToDisplay}`}
                className="flex-1 inline-flex items-center justify-between gap-4 px-5 py-3.5 rounded-xl bg-surface-subtle border border-white/[0.06] hover:border-white/20 text-white font-mono text-sm sm:text-base font-semibold transition-colors group cursor-interactive"
              >
                <span className="truncate">{emailToDisplay}</span>
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-crimson-400 transition-colors shrink-0" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-surface-subtle border border-white/[0.06] hover:border-white/20 text-xs font-mono text-text-secondary hover:text-white transition-colors cursor-interactive shrink-0"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-crimson-400" />
                    <span className="text-crimson-400 font-bold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* WhatsApp Direct Action Card */}
          <div className="p-6 rounded-3xl bg-surface-card border border-white/[0.08] hover:border-crimson-500/40 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-crimson-500" />
                INSTANT WHATSAPP CHAT
              </span>
              <span className="text-[10px] font-mono text-text-muted">
                ACTIVE
              </span>
            </div>

            <a
              href="https://wa.me/918287313307"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-between gap-4 px-5 py-3.5 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white font-mono text-sm sm:text-base font-bold transition-all shadow-lg shadow-crimson-950/40 group cursor-interactive"
            >
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Phone / Call Direct Action Card */}
          <div className="p-6 rounded-3xl bg-surface-card border border-white/[0.08] hover:border-crimson-500/40 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-crimson-500" />
                DIRECT CALL
              </span>
              <span className="text-[10px] font-mono text-text-muted">
                +91 (INDIA)
              </span>
            </div>

            <a
              href={`tel:${phoneToDisplay.replace(/\s+/g, '')}`}
              className="w-full inline-flex items-center justify-between gap-4 px-5 py-3.5 rounded-xl bg-surface-subtle border border-white/[0.06] hover:border-white/20 text-white font-mono text-sm sm:text-base font-semibold transition-colors group cursor-interactive"
            >
              <span>{phoneToDisplay}</span>
              <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-crimson-400 transition-colors" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
