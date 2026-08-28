import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Globe, Monitor, Smartphone, Code2, Info } from 'lucide-react';
import { getSiteContent } from '@/lib/contentStore';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const content = await getSiteContent();
  const project = content.projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} — Case Study | Arish`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — ${project.subtitle}`,
      description: project.shortDescription,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const content = await getSiteContent();
  const project = content.projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const isProduction = project.projectNature === 'production';

  return (
    <main className="min-h-screen bg-background text-text-primary">
      <Navigation availability={content.availability} />

      <div className="pt-32 pb-24 px-6 sm:px-8 max-w-5xl mx-auto">
        {/* Back Link */}
        <div className="mb-10">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-text-secondary hover:text-crimson-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Selected Work</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="space-y-6 pb-12 border-b border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-3">
            {isProduction ? (
              <span className="px-3 py-1 rounded-full bg-crimson-950/80 border border-crimson-700/60 text-crimson-300 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
                CLIENT PRODUCTION
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-text-secondary text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
                BUILT BY ME
              </span>
            )}

            <span className="px-3 py-1 rounded-full bg-surface-card border border-white/[0.06] text-text-muted text-xs font-mono">
              {project.category}
            </span>

            {project.platforms && (
              <div className="flex items-center gap-1.5">
                {project.platforms.map((plat) => (
                  <span
                    key={plat}
                    className="px-2.5 py-1 rounded-md bg-surface-card border border-white/[0.06] text-white text-xs font-mono flex items-center gap-1"
                  >
                    {plat === 'Web' ? (
                      <Monitor className="w-3 h-3 text-crimson-500" />
                    ) : (
                      <Smartphone className="w-3 h-3 text-crimson-500" />
                    )}
                    {plat}
                  </span>
                ))}
              </div>
            )}

            <span className="text-xs font-mono text-text-muted ml-auto">
              {project.year} // {project.role}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-text-secondary font-medium leading-relaxed">
            {project.subtitle}
          </p>

          {/* Project Context Callout */}
          <div className="p-4 rounded-2xl bg-surface-card border border-white/[0.06] flex items-start gap-3 text-xs font-mono text-text-secondary">
            <Info className="w-4 h-4 text-crimson-500 shrink-0 mt-0.5" />
            <div>
              {isProduction ? (
                <p>
                  <strong className="text-white">Client Production:</strong> Designed, engineered, and deployed by Arish for <span className="text-crimson-400">{project.client}</span>. Live and active at <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-crimson-400">{project.liveUrl}</a>.
                </p>
              ) : (
                <p>
                  <strong className="text-white">Built by Arish:</strong> Designed and engineered independently as a complete software product across its target platforms.
                </p>
              )}
            </div>
          </div>

          {/* Action links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-crimson-950/40"
              >
                <span>Visit Live Platform</span>
                <Globe className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-card border border-white/[0.1] text-white hover:border-white/30 text-xs font-mono transition-colors"
              >
                <span>Source Code</span>
                <Code2 className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Project Key Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="my-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-surface-card border border-white/[0.08] flex flex-col justify-between"
              >
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-2">
                  {metric.value}
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-crimson-400 font-semibold">
                    {metric.label}
                  </div>
                  {metric.description && (
                    <div className="text-xs text-text-muted mt-1 leading-relaxed">
                      {metric.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Deep Dive Content Sections */}
        <div className="space-y-16 py-8">
          {/* Executive Overview */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-crimson-500">
              01 // PRODUCT OVERVIEW
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">What I Designed &amp; Engineered</h3>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              {project.fullDescription}
            </p>
          </section>

          {/* Problem and Context */}
          {project.problemAndContext && (
            <section className="space-y-4 p-8 rounded-3xl bg-surface-card border border-white/[0.08]">
              <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-crimson-500">
                02 // PRODUCT CONTEXT &amp; OBJECTIVES
              </h2>
              <h3 className="text-xl sm:text-2xl font-bold text-white">The Operational Challenge</h3>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {project.problemAndContext}
              </p>
            </section>
          )}

          {/* Solution & Engineering Highlights */}
          <section className="space-y-6">
            <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-crimson-500">
              03 // CORE CAPABILITIES &amp; WORKFLOWS
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Feature &amp; System Specifications</h3>

            {project.keyFeatures && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-surface-subtle border border-white/[0.06] space-y-2">
                    <h4 className="text-base font-bold text-white font-mono flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
                      {feat.title}
                    </h4>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {project.highlights && (
              <div className="p-6 rounded-2xl bg-surface-card border border-white/[0.08] space-y-3 mt-4">
                <h4 className="text-xs font-mono text-text-muted uppercase tracking-wider">
                  Key Accomplishments &amp; Capabilities
                </h4>
                <div className="space-y-2.5">
                  {project.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-crimson-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Architecture Breakdown */}
          {project.architecture && (
            <section className="space-y-6 p-8 rounded-3xl bg-surface-card border border-white/[0.08]">
              <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-crimson-500">
                04 // SYSTEM ARCHITECTURE
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Technical Implementation</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-mono">
                {project.architecture.clientLayer && (
                  <div className="p-4 rounded-xl bg-surface-subtle border border-white/[0.04]">
                    <span className="text-text-muted text-xs block mb-1">CLIENT ARCHITECTURE</span>
                    <span className="text-white font-medium">{project.architecture.clientLayer}</span>
                  </div>
                )}
                {project.architecture.stateAndData && (
                  <div className="p-4 rounded-xl bg-surface-subtle border border-white/[0.04]">
                    <span className="text-text-muted text-xs block mb-1">STATE &amp; DATA PIPELINE</span>
                    <span className="text-white font-medium">{project.architecture.stateAndData}</span>
                  </div>
                )}
                {project.architecture.designSystem && (
                  <div className="p-4 rounded-xl bg-surface-subtle border border-white/[0.04]">
                    <span className="text-text-muted text-xs block mb-1">DESIGN SYSTEM &amp; TOKENS</span>
                    <span className="text-white font-medium">{project.architecture.designSystem}</span>
                  </div>
                )}
                {project.architecture.performanceAndOps && (
                  <div className="p-4 rounded-xl bg-surface-subtle border border-white/[0.04]">
                    <span className="text-text-muted text-xs block mb-1">PERFORMANCE &amp; EDGE</span>
                    <span className="text-white font-medium">{project.architecture.performanceAndOps}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Verified Technologies List */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-crimson-500">
              05 // TECHNOLOGIES USED
            </h2>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-xl text-xs font-mono bg-surface-card border border-white/[0.08] text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Bottom Action Box */}
          {project.liveUrl ? (
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-surface-card to-[#0d1117] border border-crimson-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-crimson-400">
                  <span className="w-2 h-2 rounded-full bg-crimson-500 animate-ping" />
                  <span>PRODUCTION DEPLOYMENT ACTIVE</span>
                </div>
                <h4 className="text-2xl font-bold text-white">Experience {project.title} Live</h4>
                <p className="text-sm text-text-secondary max-w-md">
                  Inspect the live interface, interactive B2B calculators, and responsive component hierarchy.
                </p>
              </div>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black hover:bg-crimson-600 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shrink-0"
              >
                <span>Launch Live Site</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-surface-card border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-white">Looking for a custom product build?</h4>
                <p className="text-xs font-mono text-text-secondary">
                  I design and build custom websites, web apps, and native mobile applications with this exact level of polish.
                </p>
              </div>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black hover:bg-crimson-600 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shrink-0"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>

      <Footer profile={content.profile} />
    </main>
  );
}
