'use client';

import React, { useState, useEffect } from 'react';
import { TechStackItem } from '@/data/types';
import { Plus, Trash2, Save, Check, Loader2, Cpu } from 'lucide-react';

export default function AdminTechnologiesPage() {
  const [technologies, setTechnologies] = useState<TechStackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setTechnologies(data.technologies || []);
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
        body: JSON.stringify({ technologies }),
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

  const handleAddTech = () => {
    const newItem: TechStackItem = {
      id: `tech-${Date.now()}`,
      name: 'New Technology',
      category: 'Frontend',
      level: 'Core',
      focus: 'Production use case & focus area',
    };
    setTechnologies([...technologies, newItem]);
  };

  const handleDelete = (id: string) => {
    setTechnologies(technologies.filter((t) => t.id !== id));
  };

  const updateItem = (id: string, field: keyof TechStackItem, value: any) => {
    setTechnologies((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  if (loading) {
    return (
      <div className="p-12 flex items-center gap-3 font-mono text-sm text-text-muted">
        <Loader2 className="w-4 h-4 animate-spin text-crimson-500" />
        <span>Loading technologies...</span>
      </div>
    );
  }

  return (
    <div className="p-8 sm:p-12 max-w-5xl w-full space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-3xl font-black font-mono tracking-tight text-white uppercase">
            Technology Stack Editor
          </h1>
          <p className="text-xs font-mono text-text-secondary mt-1">
            Maintain your verified, production-tested technologies.
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
            onClick={handleAddTech}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-card border border-white/[0.08] hover:border-white/20 text-white font-mono text-xs font-bold uppercase transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black hover:bg-crimson-600 hover:text-white font-mono text-xs font-bold uppercase transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Stack</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {technologies.map((tech) => (
          <div
            key={tech.id}
            className="p-4 rounded-2xl bg-surface-card border border-white/[0.08] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
          >
            <div className="sm:col-span-3">
              <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Name</label>
              <input
                type="text"
                value={tech.name}
                onChange={(e) => updateItem(tech.id, 'name', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-surface-subtle border border-white/[0.08] text-xs font-mono text-white"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Category</label>
              <select
                value={tech.category}
                onChange={(e) => updateItem(tech.id, 'category', e.target.value as any)}
                className="w-full px-3 py-1.5 rounded-lg bg-surface-subtle border border-white/[0.08] text-xs font-mono text-white"
              >
                <option value="Frontend">Frontend</option>
                <option value="Mobile / iOS">Mobile / iOS</option>
                <option value="Backend & Data">Backend & Data</option>
                <option value="Architecture & Tools">Architecture & Tools</option>
              </select>
            </div>

            <div className="sm:col-span-5">
              <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Focus / Expertise</label>
              <input
                type="text"
                value={tech.focus}
                onChange={(e) => updateItem(tech.id, 'focus', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-surface-subtle border border-white/[0.08] text-xs font-mono text-white"
              />
            </div>

            <div className="sm:col-span-1 flex justify-end">
              <button
                type="button"
                onClick={() => handleDelete(tech.id)}
                className="p-2 rounded-lg text-text-muted hover:text-crimson-500 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
