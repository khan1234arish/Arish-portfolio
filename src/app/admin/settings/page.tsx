'use client';

import React, { useState, useEffect } from 'react';
import { SiteSettings } from '@/data/types';
import { Save, Check, Loader2, KeyRound, Shield } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newPin, setNewPin] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data.settings || null);
        if (data.settings?.adminPin) {
          setNewPin(data.settings.adminPin);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    setSaved(false);

    const updatedSettings = {
      ...settings,
      adminPin: newPin || settings.adminPin || 'arish2025',
    };

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: updatedSettings }),
      });
      if (res.ok) {
        setSettings(updatedSettings);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="p-12 flex items-center gap-3 font-mono text-sm text-text-muted">
        <Loader2 className="w-4 h-4 animate-spin text-crimson-500" />
        <span>Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="p-8 sm:p-12 max-w-4xl w-full space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-3xl font-black font-mono tracking-tight text-white uppercase">
            Global Site Settings &amp; Security
          </h1>
          <p className="text-xs font-mono text-text-secondary mt-1">
            Configure contact section copy, SEO metadata, and admin access keys.
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
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {/* Contact Section Settings */}
      <div className="p-8 rounded-3xl bg-surface-card border border-white/[0.08] space-y-6 text-xs font-mono">
        <div className="pb-3 border-b border-white/[0.06] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-crimson-500" />
          <h2 className="text-sm font-bold text-white uppercase">Contact Section Configuration</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-muted mb-1 uppercase">Contact Headline</label>
            <input
              type="text"
              value={settings.contactHeadline}
              onChange={(e) => setSettings({ ...settings, contactHeadline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
            />
          </div>

          <div>
            <label className="block text-text-muted mb-1 uppercase">Contact Subtitle</label>
            <input
              type="text"
              value={settings.contactSubtitle}
              onChange={(e) => setSettings({ ...settings, contactSubtitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
            />
          </div>

          <div>
            <label className="block text-text-muted mb-1 uppercase">Primary Contact Email</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
            />
          </div>

          <div>
            <label className="block text-text-muted mb-1 uppercase">Primary Contact Phone</label>
            <input
              type="text"
              value={settings.contactPhone || ''}
              onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              placeholder="+91 8287313307"
              className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
            />
          </div>
        </div>
      </div>

      {/* SEO & Meta Settings */}
      <div className="p-8 rounded-3xl bg-surface-card border border-white/[0.08] space-y-6 text-xs font-mono">
        <div className="pb-3 border-b border-white/[0.06] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-crimson-500" />
          <h2 className="text-sm font-bold text-white uppercase">SEO &amp; OpenGraph Metadata</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-text-muted mb-1 uppercase">SEO Title Template</label>
            <input
              type="text"
              value={settings.seoTitle}
              onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
            />
          </div>

          <div>
            <label className="block text-text-muted mb-1 uppercase">Default Meta Description</label>
            <textarea
              rows={3}
              value={settings.seoDescription}
              onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white resize-none"
            />
          </div>
        </div>
      </div>

      {/* Admin Security PIN */}
      <div className="p-8 rounded-3xl bg-surface-card border border-white/[0.08] space-y-6 text-xs font-mono">
        <div className="pb-3 border-b border-white/[0.06] flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-crimson-500" />
          <h2 className="text-sm font-bold text-white uppercase">Admin Security Key</h2>
        </div>

        <div>
          <label className="block text-text-muted mb-1 uppercase">
            Private Access PIN / Password
          </label>
          <input
            type="text"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            placeholder="Change PIN..."
            className="w-full max-w-sm px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
          />
          <p className="text-[10px] text-text-muted mt-2">
            This PIN is required to log in to <code className="text-crimson-400">/admin</code>. Keep it private.
          </p>
        </div>
      </div>
    </div>
  );
}
