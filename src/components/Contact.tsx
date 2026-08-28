'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Copy, Check, Send, Sparkles } from 'lucide-react';
import { SiteProfile, SiteSettings } from '@/data/types';

interface ContactProps {
  profile: SiteProfile;
  settings: SiteSettings;
}

export default function Contact({ profile, settings }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Website',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const emailToDisplay = settings.contactEmail || profile.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailToDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', projectType: 'Website', message: '' });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to send message.');
      }
    } catch (err) {
      setErrorMsg('Something went wrong. Please email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/[0.06] relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
        {/* Left Column: Huge Minimal Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-8 flex flex-col justify-between"
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

            <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed max-w-md">
              Whether you need an enterprise web platform, a fast responsive website, or a fluid native iOS app, I am available to bring your vision to life.
            </p>
          </div>

          {/* Direct Contact Dispatch Box */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-text-muted block">
              DIRECT DISPATCH
            </span>

            {/* Email Contact Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={`mailto:${emailToDisplay}`}
                className="flex-1 inline-flex items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-surface-card border border-white/[0.1] hover:border-crimson-500/50 text-white font-mono text-sm sm:text-base font-medium transition-all duration-300 group cursor-interactive"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Mail className="w-4 h-4 text-crimson-500 shrink-0" />
                  <span className="truncate">{emailToDisplay}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-white transition-colors shrink-0" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-surface-card border border-white/[0.08] hover:border-white/20 text-xs font-mono text-text-secondary hover:text-white transition-colors cursor-interactive shrink-0"
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

            {/* Phone & WhatsApp Contact Box */}
            {profile.phone && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                  className="flex-1 inline-flex items-center justify-between gap-4 px-6 py-3.5 rounded-2xl bg-surface-card border border-white/[0.1] hover:border-crimson-500/50 text-white font-mono text-sm font-medium transition-all duration-300 group cursor-interactive"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-crimson-500" />
                    <span>{profile.phone}</span>
                  </div>
                  <span className="text-xs text-text-muted group-hover:text-crimson-400 font-mono">
                    Direct Call
                  </span>
                </a>

                {profile.socialLinks?.whatsapp && (
                  <a
                    href={profile.socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-surface-card border border-white/[0.08] hover:border-crimson-500/40 text-xs font-mono text-text-secondary hover:text-white transition-colors cursor-interactive shrink-0"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-crimson-400" />
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Column: Direct Interactive Inquiry Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <div className="rounded-3xl bg-surface-card border border-white/[0.08] p-6 sm:p-8 relative">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.06]">
              <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                PROJECT INQUIRY FORM
              </span>
              <span className="text-[10px] font-mono text-crimson-400 px-2 py-0.5 rounded bg-crimson-950/40 border border-crimson-800/40">
                FAST RESPONSE
              </span>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-crimson-600/20 border border-crimson-500/40 flex items-center justify-center mx-auto text-crimson-400">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Inquiry Received</h3>
                <p className="text-sm text-text-secondary max-w-sm mx-auto">
                  Thank you for reaching out. I will review your requirements and respond promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-surface-subtle border border-white/[0.08] text-xs font-mono text-white hover:border-white/20 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-text-muted mb-1.5 uppercase">
                    Your Name / Organization
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-white/[0.08] focus:border-crimson-500 text-sm text-white placeholder-white/20 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-text-muted mb-1.5 uppercase">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-white/[0.08] focus:border-crimson-500 text-sm text-white placeholder-white/20 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-xs font-mono text-text-muted mb-1.5 uppercase">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-white/[0.08] focus:border-crimson-500 text-sm text-white transition-colors"
                  >
                    <option value="Website" className="bg-surface text-white">Modern Website</option>
                    <option value="Web Application" className="bg-surface text-white">Web Application / Platform</option>
                    <option value="iOS Application" className="bg-surface text-white">Native iOS Application</option>
                    <option value="Full-Stack System" className="bg-surface text-white">Full-Stack Digital Product</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-text-muted mb-1.5 uppercase">
                    Project Summary &amp; Goals
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your project requirements, timeline, and goals..."
                    className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-white/[0.08] focus:border-crimson-500 text-sm text-white placeholder-white/20 transition-colors resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs font-mono text-crimson-400">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-white text-black hover:bg-crimson-600 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-interactive disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Dispatching...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
