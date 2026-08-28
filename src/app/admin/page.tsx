import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getSiteContent } from '@/lib/contentStore';
import {
  FolderGit2,
  Layers,
  Cpu,
  User,
  FlaskConical,
  Settings,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import AvailabilityToggle from '@/components/admin/AvailabilityToggle';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect('/admin/login');
  }

  const content = await getSiteContent();

  const stats = [
    { label: 'Featured Projects', count: content.projects.length, href: '/admin/projects', icon: FolderGit2 },
    { label: 'Active Services', count: content.services.length, href: '/admin/services', icon: Layers },
    { label: 'Verified Tech', count: content.technologies.length, href: '/admin/technologies', icon: Cpu },
    { label: 'Lab Experiments', count: content.experiments.length, href: '/admin/experiments', icon: FlaskConical },
  ];

  return (
    <div className="p-8 sm:p-12 max-w-6xl w-full space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-crimson-400">
            <Activity className="w-4 h-4 text-crimson-500 animate-pulse" />
            <span>PORTFOLIO PLATFORM ONLINE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white uppercase">
            Admin Console
          </h1>
          <p className="text-xs font-mono text-text-secondary mt-1">
            Real-time content management for Arish&apos;s personal portfolio.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black hover:bg-crimson-600 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
        >
          <span>Preview Live Site</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Live Availability Status Card (Interactive) */}
      <AvailabilityToggle initialAvailability={content.availability} />

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="p-6 rounded-2xl bg-surface-card border border-white/[0.08] hover:border-crimson-500/40 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-text-muted uppercase">
                  {stat.label}
                </span>
                <Icon className="w-4 h-4 text-text-muted group-hover:text-crimson-400 transition-colors" />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-3xl font-bold font-mono text-white">
                  {stat.count}
                </span>
                <span className="text-xs font-mono text-crimson-400 group-hover:underline flex items-center gap-1">
                  <span>Manage</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Featured Showcase Quick Status */}
      <div className="p-6 rounded-2xl bg-surface-card border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-crimson-500" />
            <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              Featured Flagship: MEHAR
            </h2>
          </div>
          <Link
            href="/admin/projects"
            className="text-xs font-mono text-crimson-400 hover:underline"
          >
            Edit Project Data &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-surface-subtle border border-white/[0.04]">
            <span className="text-text-muted block text-[10px]">CATEGORY</span>
            <span className="text-white font-medium mt-0.5 block">Web Application / B2B Platform</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-subtle border border-white/[0.04]">
            <span className="text-text-muted block text-[10px]">PRODUCTION URL</span>
            <a
              href="https://www.meharbatteries.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crimson-400 font-medium mt-0.5 block hover:underline"
            >
              meharbatteries.com
            </a>
          </div>
          <div className="p-3 rounded-xl bg-surface-subtle border border-white/[0.04]">
            <span className="text-text-muted block text-[10px]">CASE STUDY URL</span>
            <span className="text-white font-medium mt-0.5 block">/work/mehar</span>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="p-6 rounded-2xl bg-surface-subtle border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-text-muted">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-4 h-4 text-crimson-500" />
          <span>Local Persistence Store Active (site-content.json)</span>
        </div>
        <div>
          <span>Last Synchronized: {new Date(content.lastUpdated).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
