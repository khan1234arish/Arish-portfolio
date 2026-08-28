'use client';

import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050505]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-2xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo / Brand Monogram */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Arish Portfolio Home"
          >
            <span className="font-mono text-sm tracking-widest uppercase font-bold text-white group-hover:text-crimson-500 transition-colors">
              ARISH
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-crimson-500 group-hover:scale-125 transition-transform" />
            <span className="hidden md:inline-block text-xs font-mono text-text-muted">
              Web & App Developer
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 bg-surface-card/60 backdrop-blur-md border border-white/[0.08] rounded-full px-4 py-1.5 shadow-inner"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-text-secondary hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.12] -z-10 animate-fade-in" />
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
          <div className="hidden lg:flex items-center gap-4">
            {availability?.isAvailable && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card border border-white/[0.08] text-[11px] font-mono text-text-secondary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson-500"></span>
                </span>
                <span className="tracking-wider uppercase text-[10px]">
                  {availability.statusLabel || 'AVAILABLE'}
                </span>
              </div>
            )}

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black hover:bg-crimson-600 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 shadow-md group"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href="#contact"
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-crimson-600 text-white text-xs font-semibold tracking-wide"
            >
              Let&apos;s Talk
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-surface-card border border-white/[0.08] text-white hover:text-crimson-500 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-[#050505]/95 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-12 animate-fade-in">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted pb-4 border-b border-white/[0.08]">
              <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
              <span>{availability.statusLabel}</span>
            </div>

            <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold tracking-tight text-white hover:text-crimson-500 transition-colors flex items-center justify-between py-2 border-b border-white/[0.04]"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-text-muted" />
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4 pt-8 border-t border-white/[0.08]">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white font-semibold text-center tracking-wide transition-colors"
            >
              Start a Project
            </a>
            <div className="flex flex-col gap-1 text-xs font-mono text-text-muted">
              <div className="flex justify-between items-center">
                <span className="text-white/80">khan1234arish@gmail.com</span>
                <span>India</span>
              </div>
              <div className="text-[11px] text-text-muted">
                +91 8287313307
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
