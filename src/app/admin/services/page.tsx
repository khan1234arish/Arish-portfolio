'use client';

import React, { useState, useEffect } from 'react';
import { Service } from '@/data/types';
import { Save, Check, Loader2, Layers } from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services }),
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

  const updateServiceField = (id: string, field: keyof Service, value: any) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  if (loading) {
    return (
      <div className="p-12 flex items-center gap-3 font-mono text-sm text-text-muted">
        <Loader2 className="w-4 h-4 animate-spin text-crimson-500" />
        <span>Loading services...</span>
      </div>
    );
  }

  return (
    <div className="p-8 sm:p-12 max-w-5xl w-full space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-3xl font-black font-mono tracking-tight text-white uppercase">
            Services &amp; Capabilities Editor
          </h1>
          <p className="text-xs font-mono text-text-secondary mt-1">
            Manage the primary disciplines displayed on the public site.
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
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-white/[0.08] space-y-4"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <span className="font-mono text-sm font-bold text-crimson-500">
                CATEGORY {service.number}
              </span>
              <span className="text-xs font-mono text-text-muted">
                {service.id}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="block text-text-muted mb-1 uppercase">Title</label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => updateServiceField(service.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
                />
              </div>

              <div>
                <label className="block text-text-muted mb-1 uppercase">Subtitle</label>
                <input
                  type="text"
                  value={service.subtitle}
                  onChange={(e) => updateServiceField(service.id, 'subtitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-text-muted mb-1 uppercase">Description</label>
                <textarea
                  rows={3}
                  value={service.description}
                  onChange={(e) => updateServiceField(service.id, 'description', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white resize-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-text-muted mb-1 uppercase">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={service.technologies.join(', ')}
                  onChange={(e) =>
                    updateServiceField(
                      service.id,
                      'technologies',
                      e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                    )
                  }
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
