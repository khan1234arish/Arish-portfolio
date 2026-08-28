'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Availability } from '@/data/types';

interface NavigationProps {
  availability: Availability;
}

export default function Navigation({ availability }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle scroll detection and active section spy
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);

          const sections = ['work', 'services', 'process', 'tech', 'about', 'contact'];
          const scrollPosition = window.scrollY + 200;

          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile menu
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    },
    [mobileMenuOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const navLinks = [
    { label: 'Work', href: '/#work', id: 'work' },
    { label: 'Services', href: '/#services', id: 'services' },
    { label: 'Process', href: '/#process', id: 'process' },
    { label: 'Tech', href: '/#tech', id: 'tech' },
    { label: 'About', href: '/#about', id: 'about' },
    { label: 'Contact', href: '/#contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-[background-color,padding,border-color] duration-300 ${
          isScrolled
            ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/[0.08] py-3 shadow-2xl'
            : 'bg-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand Monogram */}
          <Link
            href="/"
            className="flex items-center min-h-[44px] gap-2.5 sm:gap-3 group focus-visible:ring-2 focus-visible:ring-crimson-500 rounded-lg px-1 py-1"
            aria-label="Arish Portfolio Home"
          >
            <span className="font-mono text-sm sm:text-base tracking-widest uppercase font-black text-white group-hover:text-crimson-500 transition-colors">
              ARISH
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 group-hover:scale-125 transition-transform" />
            <span className="hidden sm:inline-block text-xs font-mono text-text-muted">
              Developer
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 bg-surface-card/70 backdrop-blur-md border border-white/[0.08] rounded-full px-3 py-1.5 shadow-inner"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-text-secondary hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.12] -z-10" />
                  )}
                  <span className="flex items-center gap-1.5">
                    {isActive && <span className="w-1 h-1 rounded-full bg-crimson-500" />}
                    {link.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Availability Badge & CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            {availability?.isAvailable && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card border border-white/[0.08] text-[11px] font-mono text-text-secondary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson-500"></span>
                </span>
                <span className="tracking-wider uppercase text-[10px]">
                  AVAILABLE
                </span>
              </div>
            )}

            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black hover:bg-crimson-600 hover:text-white text-xs font-semibold tracking-wide transition-colors shadow-md group"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Action & Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="/#contact"
              className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-full bg-crimson-600 active:bg-crimson-700 text-white text-xs font-bold tracking-wide"
            >
              Contact
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-surface-card border border-white/[0.08] text-white active:bg-white/[0.08] transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-30 md:hidden bg-[#050505]/95 backdrop-blur-2xl pt-24 px-6 flex flex-col justify-between pb-8 overflow-y-auto"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted pb-4 border-b border-white/[0.08]">
              <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
              <span>{availability.statusLabel || 'AVAILABLE FOR SELECT PROJECTS'}</span>
            </div>

            <nav className="flex flex-col gap-2" aria-label="Mobile Navigation Links">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl sm:text-2xl font-bold tracking-tight text-white active:text-crimson-500 transition-colors flex items-center justify-between py-3 border-b border-white/[0.04] min-h-[48px]"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-text-muted" />
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/[0.08]">
            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full min-h-[48px] py-3.5 rounded-xl bg-crimson-600 active:bg-crimson-700 text-white font-bold text-center tracking-wide transition-colors flex items-center justify-center text-sm shadow-lg shadow-crimson-950/50"
            >
              Start a Project
            </a>
            <div className="flex flex-col gap-1 text-xs font-mono text-text-muted text-center pt-2">
              <span className="text-white/80">khan1234arish@gmail.com</span>
              <span>+91 8287313307 · India</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
