'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/data/types';
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  Check,
  Globe,
  Loader2,
  Sparkles,
  ArrowUpRight,
  Code2,
} from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const saveProjects = async (updatedProjects: Project[]) => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects: updatedProjects }),
      });
      if (res.ok) {
        setProjects(updatedProjects);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateNew = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      slug: `new-project-${Date.now().toString().slice(-4)}`,
      title: 'New Digital Product',
      category: 'Web Application',
      projectNature: 'personal_build',
      badge: 'BUILT BY ME',
      subtitle: 'Modern Web / Native Application',
      featured: false,
      order: projects.length + 1,
      year: '2025',
      coverImage: '/projects/placeholder.png',
      shortDescription: 'Description of the digital product, architecture, and goals.',
      fullDescription: 'Comprehensive case study detailing product engineering and architecture.',
      role: 'Full-Stack Architecture & Engineering',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      highlights: ['Engineered scalable frontend architecture', 'Achieved high performance metrics'],
      metrics: [
        { value: '< 1s', label: 'Load Speed', description: 'Core Web Vitals' },
        { value: '100%', label: 'Responsiveness', description: 'Cross-platform' },
      ],
    };

    setEditingProject(newProj);
  };

  const handleSaveModal = () => {
    if (!editingProject) return;
    const exists = projects.some((p) => p.id === editingProject.id);
    let updated: Project[];
    if (exists) {
      updated = projects.map((p) => (p.id === editingProject.id ? editingProject : p));
    } else {
      updated = [...projects, editingProject];
    }
    saveProjects(updated);
    setEditingProject(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter((p) => p.id !== id);
      saveProjects(updated);
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex items-center gap-3 font-mono text-sm text-text-muted">
        <Loader2 className="w-4 h-4 animate-spin text-crimson-500" />
        <span>Loading projects...</span>
      </div>
    );
  }

  return (
    <div className="p-8 sm:p-12 max-w-6xl w-full space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-3xl font-black font-mono tracking-tight text-white uppercase">
            Project Showcase Manager
          </h1>
          <p className="text-xs font-mono text-text-secondary mt-1">
            Add, update, or reorder projects displayed on the public site and case study pages.
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
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black hover:bg-crimson-600 hover:text-white font-mono text-xs font-bold uppercase transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((proj) => {
          const isMehar = proj.slug === 'mehar';
          return (
            <div
              key={proj.id}
              className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isMehar
                  ? 'bg-crimson-950/20 border-crimson-800/40'
                  : 'bg-surface-card border-white/[0.08]'
              }`}
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-crimson-400 font-bold">
                    #{proj.order}
                  </span>
                  <h3 className="text-lg font-bold text-white font-mono">
                    {proj.title}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-text-muted">
                    {proj.category}
                  </span>
                  {proj.featured && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-crimson-600 text-white font-bold">
                      FEATURED
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-text-secondary truncate max-w-xl">
                  {proj.subtitle}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.technologies.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-subtle border border-white/[0.04] text-text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-surface-subtle border border-white/[0.06] text-text-muted hover:text-white transition-colors"
                    title="Live URL"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setEditingProject(proj)}
                  className="p-2 rounded-xl bg-surface-subtle border border-white/[0.06] text-text-muted hover:text-crimson-400 transition-colors"
                  title="Edit Project"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {!isMehar && (
                  <button
                    type="button"
                    onClick={() => handleDelete(proj.id)}
                    className="p-2 rounded-xl bg-surface-subtle border border-white/[0.06] text-text-muted hover:text-crimson-500 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit / Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-3xl bg-surface-card border border-white/[0.1] p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <h2 className="text-xl font-bold font-mono text-white">
                Edit Project: {editingProject.title}
              </h2>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="text-xs font-mono text-text-muted hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="block text-text-muted mb-1 uppercase">Title</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
                />
              </div>

              <div>
                <label className="block text-text-muted mb-1 uppercase">Slug (URL Path)</label>
                <input
                  type="text"
                  value={editingProject.slug}
                  onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
                />
              </div>

              <div>
                <label className="block text-text-muted mb-1 uppercase">Category</label>
                <select
                  value={editingProject.category}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
                >
                  <option value="Web Application">Web Application</option>
                  <option value="iOS Application">iOS Application</option>
                  <option value="Website">Website</option>
                  <option value="Digital Platform">Digital Platform</option>
                </select>
              </div>

              <div>
                <label className="block text-text-muted mb-1 uppercase">Project Nature / Status</label>
                <select
                  value={editingProject.projectNature || 'personal_build'}
                  onChange={(e) => setEditingProject({ ...editingProject, projectNature: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
                >
                  <option value="production">Client Production</option>
                  <option value="personal_build">Built by Me</option>
                </select>
              </div>

              <div>
                <label className="block text-text-muted mb-1 uppercase">Year</label>
                <input
                  type="text"
                  value={editingProject.year}
                  onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-text-muted mb-1 uppercase">Subtitle</label>
                <input
                  type="text"
                  value={editingProject.subtitle}
                  onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-text-muted mb-1 uppercase">Live URL</label>
                <input
                  type="text"
                  value={editingProject.liveUrl || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-text-muted mb-1 uppercase">Short Description (Card)</label>
                <textarea
                  rows={2}
                  value={editingProject.shortDescription}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white resize-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-text-muted mb-1 uppercase">Full Case Study Description</label>
                <textarea
                  rows={4}
                  value={editingProject.fullDescription}
                  onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white resize-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-text-muted mb-1 uppercase">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProject.technologies.join(', ')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-surface-subtle border border-white/[0.08] text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-5 py-2.5 rounded-xl bg-surface-subtle border border-white/[0.08] text-xs font-mono text-text-muted hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveModal}
                className="px-6 py-2.5 rounded-xl bg-white text-black hover:bg-crimson-600 hover:text-white font-mono text-xs font-bold uppercase transition-colors"
              >
                Save Project Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
