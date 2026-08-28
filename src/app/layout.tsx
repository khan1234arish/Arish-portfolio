import type { Metadata, Viewport } from 'next';
import './globals.css';
import { getSiteContent } from '@/lib/contentStore';
import CustomCursor from '@/components/CustomCursor';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const { profile, settings } = content;

  return {
    title: {
      default: `${profile.name} — ${profile.role} | Websites · Web Apps · iOS Apps`,
      template: `%s | ${profile.name} — ${profile.role}`,
    },
    description: settings.seoDescription || profile.bioShort,
    keywords: [
      'Arish',
      'Web Developer',
      'App Developer',
      'iOS Developer',
      'SwiftUI',
      'Next.js',
      'React Developer',
      'TypeScript',
      'MEHAR',
      'Portfolio',
    ],
    authors: [{ name: profile.name, url: 'https://arish.dev' }],
    creator: profile.name,
    publisher: profile.name,
    metadataBase: new URL('https://arish.dev'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://arish.dev',
      title: `${profile.name} — ${profile.role}`,
      description: profile.tagline,
      siteName: `${profile.name} Portfolio`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.name} — ${profile.role}`,
      description: profile.tagline,
      creator: '@arish',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getSiteContent();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: content.profile.name,
    jobTitle: content.profile.role,
    description: content.profile.bioShort,
    url: 'https://arish.dev',
    sameAs: [
      content.profile.socialLinks.github,
      content.profile.socialLinks.linkedin,
      content.profile.socialLinks.twitter,
    ].filter(Boolean),
    knowsAbout: [
      'Web Development',
      'iOS App Development',
      'Next.js',
      'React',
      'TypeScript',
      'Swift',
      'SwiftUI',
      'UI/UX Architecture',
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-text-primary antialiased selection:bg-crimson-600 selection:text-white font-sans">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
