'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] p-6">
      {/* Background ambient glow */}
      <div className="absolute w-96 h-96 bg-crimson-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md rounded-3xl bg-surface-card border border-white/[0.08] p-8 shadow-2xl relative">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-crimson-600 flex items-center justify-center text-white font-mono font-bold text-xs">
              A
            </div>
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              PORTFOLIO CONTROL
            </span>
          </div>
          <span className="text-[10px] font-mono text-text-muted px-2 py-0.5 rounded bg-white/[0.05]">
            SECURE ACCESS
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white font-mono">Admin Authorization</h1>
          <p className="text-xs text-text-secondary mt-1.5 font-mono">
            Enter your administrative PIN or access key to manage portfolio content.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="adminPin" className="block text-xs font-mono text-text-muted mb-2 uppercase">
              Access PIN / Password
            </label>
            <div className="relative">
              <input
                id="adminPin"
                type="password"
                required
                autoFocus
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-subtle border border-white/[0.1] focus:border-crimson-500 text-sm text-white font-mono placeholder-white/20 transition-colors"
              />
              <KeyRound className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {error && (
            <p className="text-xs font-mono text-crimson-400 bg-crimson-950/40 p-2.5 rounded-lg border border-crimson-800/40">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-white text-black hover:bg-crimson-600 hover:text-white font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-interactive disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Enter Admin Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-[11px] font-mono text-text-muted">
            Initial default PIN is <code className="text-crimson-400">arish2025</code> (changeable in settings).
          </p>
        </div>
      </div>
    </div>
  );
}
