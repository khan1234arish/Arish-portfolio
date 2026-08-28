'use client';

import React, { useState } from 'react';
import { Availability } from '@/data/types';
import { Check, Loader2, Radio } from 'lucide-react';

interface AvailabilityToggleProps {
  initialAvailability: Availability;
}

export default function AvailabilityToggle({
  initialAvailability,
}: AvailabilityToggleProps) {
  const [availability, setAvailability] = useState<Availability>(initialAvailability);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (updated: Availability) => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ availability: updated }),
      });

      if (res.ok) {
        setAvailability(updated);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (e) {
      console.error('Failed to update availability', e);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = (statusType: Availability['statusType']) => {
    let statusLabel = 'AVAILABLE FOR SELECT PROJECTS';
    let isAvailable = true;

    if (statusType === 'available') {
      statusLabel = 'AVAILABLE FOR WORK';
      isAvailable = true;
    } else if (statusType === 'select_projects') {
      statusLabel = 'AVAILABLE FOR SELECT PROJECTS';
      isAvailable = true;
    } else {
      statusLabel = 'CURRENTLY BOOKED';
      isAvailable = false;
    }

    const updated: Availability = {
      ...availability,
      isAvailable,
      statusType,
      statusLabel,
    };

    setAvailability(updated);
    handleSave(updated);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-white/[0.08] space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <Radio className="w-4 h-4 text-crimson-500" />
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
            Public Availability Indicator
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {saving && (
            <span className="flex items-center gap-1 text-xs font-mono text-text-muted">
              <Loader2 className="w-3 h-3 animate-spin text-crimson-500" />
              <span>Updating...</span>
            </span>
          )}
          {saved && (
            <span className="flex items-center gap-1 text-xs font-mono text-crimson-400">
              <Check className="w-3.5 h-3.5" />
              <span>Live on Site</span>
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => handleStatusChange('select_projects')}
          className={`p-4 rounded-2xl border text-left transition-all font-mono text-xs ${
            availability.statusType === 'select_projects'
              ? 'bg-crimson-950/40 border-crimson-600 text-white shadow-lg'
              : 'bg-surface-subtle border-white/[0.06] text-text-secondary hover:border-white/20'
          }`}
        >
          <div className="flex items-center gap-2 font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
            <span>Select Projects</span>
          </div>
          <p className="text-[11px] text-text-muted">
            ● AVAILABLE FOR SELECT PROJECTS
          </p>
        </button>

        <button
          type="button"
          onClick={() => handleStatusChange('available')}
          className={`p-4 rounded-2xl border text-left transition-all font-mono text-xs ${
            availability.statusType === 'available'
              ? 'bg-crimson-950/40 border-crimson-600 text-white shadow-lg'
              : 'bg-surface-subtle border-white/[0.06] text-text-secondary hover:border-white/20'
          }`}
        >
          <div className="flex items-center gap-2 font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
            <span>Fully Available</span>
          </div>
          <p className="text-[11px] text-text-muted">
            ● AVAILABLE FOR WORK
          </p>
        </button>

        <button
          type="button"
          onClick={() => handleStatusChange('booked')}
          className={`p-4 rounded-2xl border text-left transition-all font-mono text-xs ${
            availability.statusType === 'booked'
              ? 'bg-white/[0.08] border-white/40 text-white shadow-lg'
              : 'bg-surface-subtle border-white/[0.06] text-text-secondary hover:border-white/20'
          }`}
        >
          <div className="flex items-center gap-2 font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-text-muted" />
            <span>Booked</span>
          </div>
          <p className="text-[11px] text-text-muted">
            ● CURRENTLY BOOKED
          </p>
        </button>
      </div>

      <div>
        <label htmlFor="customLabel" className="block text-xs font-mono text-text-muted mb-1.5 uppercase">
          Custom Status Display Text
        </label>
        <div className="flex gap-2">
          <input
            id="customLabel"
            type="text"
            value={availability.statusLabel}
            onChange={(e) => setAvailability({ ...availability, statusLabel: e.target.value })}
            className="flex-1 px-4 py-2.5 rounded-xl bg-surface-subtle border border-white/[0.08] text-xs font-mono text-white focus:border-crimson-500"
          />
          <button
            type="button"
            onClick={() => handleSave(availability)}
            className="px-5 py-2.5 rounded-xl bg-white text-black hover:bg-crimson-600 hover:text-white font-mono text-xs font-bold uppercase transition-colors"
          >
            Save Label
          </button>
        </div>
      </div>
    </div>
  );
}
