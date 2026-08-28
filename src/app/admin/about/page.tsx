'use client';

import React, { useState, useEffect } from 'react';
import { SiteProfile } from '@/data/types';
import { Save, Check, Loader2, User } from 'lucide-react';

export default function AdminAboutPage() {
  const [profile, setProfile] = useState<SiteProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.profile || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="p-12 flex items-center gap-3 font-mono text-sm text-text-muted">
        <Loader2 className="w-4 h-4 animate-spin text-crimson-500" />
        <span>Loading profile data...</span>
      </div>
    );
  }

  return (
    <div className="p-8 sm:p-12 max-w-4xl w-full space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-3xl font-black font-mono tracking-tight text-white uppercase">
            About &amp; Bio Profile Editor
          </h1>
          <p className="text-xs font-mono text-text-secondary mt-1">
            Edit your core developer identity, tagline, narrative, and links.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <span className="flex items-center gap-1 text-xs font-mono text-crimson-400">
              <Check className="w-3.5 h-3.5" />
              <span>Saved</span>
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black hover:bg-crimson-600 hover:text-white font-mono text-xs font-bold uppercase transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Profile</span>
          </button>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-surface-card border border-white/[0.08] space-y-6 text-xs font-mono">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-muted mb-1 uppercase">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
            />
          </div>

          <div>
            <label className="block text-text-muted mb-1 uppercase">Primary Role</label>
            <input
              type="text"
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
            />
          </div>

          <div>
            <label className="block text-text-muted mb-1 uppercase">Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
            />
          </div>

          <div>
            <label className="block text-text-muted mb-1 uppercase">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
            />
          </div>

          <div>
            <label className="block text-text-muted mb-1 uppercase">Phone Number</label>
            <input
              type="text"
              value={profile.phone || ''}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="+91 8287313307"
              className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-text-muted mb-1 uppercase">
              Roles / Subline (Comma separated)
            </label>
            <input
              type="text"
              value={profile.rolesList.join(', ')}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  rolesList: e.target.value.split(',').map((r) => r.trim()).filter(Boolean),
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-text-muted mb-1 uppercase">Hero Tagline</label>
            <input
              type="text"
              value={profile.tagline}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-text-muted mb-1 uppercase">Short Bio (Meta &amp; Intro)</label>
            <textarea
              rows={2}
              value={profile.bioShort}
              onChange={(e) => setProfile({ ...profile, bioShort: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white resize-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-text-muted mb-1 uppercase">Detailed Bio Paragraphs (One per line)</label>
            <textarea
              rows={6}
              value={profile.bioDetailed.join('\n\n')}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  bioDetailed: e.target.value.split('\n\n').filter(Boolean),
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
