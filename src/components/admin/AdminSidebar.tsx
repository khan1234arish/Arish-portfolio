'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderGit2,
  Layers,
  Cpu,
  User,
  FlaskConical,
  Settings,
  Globe,
  LogOut,
  Shield,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Projects', href: '/admin/projects', icon: FolderGit2 },
    { label: 'Services', href: '/admin/services', icon: Layers },
    { label: 'Technologies', href: '/admin/technologies', icon: Cpu },
    { label: 'About & Bio', href: '/admin/about', icon: User },
    { label: 'Experiments', href: '/admin/experiments', icon: FlaskConical },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/admin/login';
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <aside className="w-64 bg-[#080808] border-r border-white/[0.08] flex flex-col justify-between p-6 shrink-0 min-h-screen">
      <div className="space-y-8">
        {/* Brand Bar */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-lg bg-crimson-600 flex items-center justify-center text-white font-mono font-black text-sm">
            A
          </div>
          <div>
            <div className="font-mono text-xs font-bold text-white tracking-wider uppercase">
              ARISH // ADMIN
            </div>
            <div className="text-[10px] font-mono text-text-muted">
              CMS &amp; Platform Engine
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1" aria-label="Admin Navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                  isActive
                    ? 'bg-white/[0.08] text-white font-semibold border border-white/[0.1]'
                    : 'text-text-secondary hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-crimson-500' : 'text-text-muted'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Utility Actions */}
      <div className="space-y-2 pt-6 border-t border-white/[0.08]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono text-text-secondary hover:text-white hover:bg-white/[0.04] transition-colors"
        >
          <Globe className="w-4 h-4 text-crimson-500" />
          <span>View Live Site</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono text-text-muted hover:text-crimson-400 hover:bg-crimson-950/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Admin</span>
        </button>
      </div>
    </aside>
  );
}
