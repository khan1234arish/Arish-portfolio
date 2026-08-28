import React from 'react';
import { getSiteContent } from '@/lib/contentStore';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SelectedWork from '@/components/SelectedWork';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Technology from '@/components/Technology';
import About from '@/components/About';
import Experiments from '@/components/Experiments';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const revalidate = 0; // Dynamic rendering so admin changes reflect immediately

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-background text-text-primary selection:bg-crimson-600 selection:text-white">
      <Navigation availability={content.availability} />
      <Hero profile={content.profile} availability={content.availability} />
      <SelectedWork projects={content.projects} />
      <Services services={content.services} />
      <Process steps={content.process} />
      <Technology technologies={content.technologies} />
      <About profile={content.profile} />
      <Experiments experiments={content.experiments} />
      <Contact profile={content.profile} settings={content.settings} />
      <Footer profile={content.profile} />
    </main>
  );
}
