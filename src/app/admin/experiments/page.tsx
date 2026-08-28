'use client';

import React, { useState, useEffect } from 'react';
import { Experiment } from '@/data/types';
import { Plus, Trash2, Save, Check, Loader2, FlaskConical } from 'lucide-react';

export default function AdminExperimentsPage() {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setExperiments(data.experiments || []);
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
        body: JSON.stringify({ experiments }),
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

  const handleAddExperiment = () => {
    const newExp: Experiment = {
      id: `exp-${Date.now()}`,
      title: 'New Interaction Experiment',
      category: 'Interactive UI',
      description: 'Description of prototype, motion dynamics, or graphics technique.',
      tech: ['TypeScript', 'Framer Motion'],
      status: 'Live',
    };
    setExperiments([...experiments, newExp]);
  };

  const handleDelete = (id: string) => {
    setExperiments(experiments.filter((e) => e.id !== id));
  };

  const updateExp = (id: string, field: keyof Experiment, value: any) => {
    setExperiments((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  if (loading) {
    return (
      <div className="p-12 flex items-center gap-3 font-mono text-sm text-text-muted">
        <Loader2 className="w-4 h-4 animate-spin text-crimson-500" />
        <span>Loading experiments...</span>
      </div>
    );
  }

  return (
    <div className="p-8 sm:p-12 max-w-5xl w-full space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-3xl font-black font-mono tracking-tight text-white uppercase">
            Experiments &amp; Prototypes Lab
          </h1>
          <p className="text-xs font-mono text-text-secondary mt-1">
            Add or edit UI experiments, animation prototypes, and creative code demos.
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
            onClick={handleAddExperiment}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-card border border-white/[0.08] hover:border-white/20 text-white font-mono text-xs font-bold uppercase transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Experiment</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black hover:bg-crimson-600 hover:text-white font-mono text-xs font-bold uppercase transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Experiments</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {experiments.map((exp) => (
          <div
            key={exp.id}
            className="p-6 rounded-2xl bg-surface-card border border-white/[0.08] space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="text-xs font-mono font-bold text-crimson-400 uppercase">
                {exp.category}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(exp.id)}
                className="text-xs font-mono text-text-muted hover:text-crimson-500 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs font-mono">
              <div className="sm:col-span-6">
                <label className="block text-text-muted mb-1 uppercase">Title</label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => updateExp(exp.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-text-muted mb-1 uppercase">Category</label>
                <input
                  type="text"
                  value={exp.category}
                  onChange={(e) => updateExp(exp.id, 'category', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-text-muted mb-1 uppercase">Status</label>
                <select
                  value={exp.status}
                  onChange={(e) => updateExp(exp.id, 'status', e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
                >
                  <option value="Live">Live</option>
                  <option value="Prototype">Prototype</option>
                  <option value="Concept">Concept</option>
                </select>
              </div>

              <div className="sm:col-span-12">
                <label className="block text-text-muted mb-1 uppercase">Description</label>
                <textarea
                  rows={2}
                  value={exp.description}
                  onChange={(e) => updateExp(exp.id, 'description', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white resize-none"
                />
              </div>

              <div className="sm:col-span-12">
                <label className="block text-text-muted mb-1 uppercase">Tech (comma separated)</label>
                <input
                  type="text"
                  value={exp.tech.join(', ')}
                  onChange={(e) =>
                    updateExp(
                      exp.id,
                      'tech',
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
