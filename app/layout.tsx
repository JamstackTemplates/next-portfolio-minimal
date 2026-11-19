import type { Metadata, Viewport } from 'next';
import { Schibsted_Grotesk } from 'next/font/google';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { profile } from '../content/profile';
import { site } from '../lib/site';
import './tailwind.input.css';

// Downloaded at build time and served from this site: visitors never contact Google.
const grotesk = Schibsted_Grotesk({ subsets: ['latin'], variable: '--font-grotesk', display: 'swap' });

// Absolute URLs only when the deployed URL is known at build time. Never fall back to localhost.
const socialImage = site.url ? [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: `${profile.name} — ${profile.role}` }] : undefined;

export const metadata: Metadata = {
  title: { default: `${profile.name} — ${profile.role}`, template: `%s — ${profile.name}` },
  description: site.description || profile.introduction,
  applicationName: site.name,
  authors: [{ name: profile.name }],
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${profile.name} — ${profile.role}`,
    description: site.description || profile.introduction,
    ...(site.url ? { url: `${site.url}/` } : {}),
    images: socialImage,
  },
  twitter: { card: socialImage ? 'summary_large_image' : 'summary' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f4f0' },
    { media: '(prefers-color-scheme: dark)', color: '#0c1322' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={grotesk.variable} suppressHydrationWarning>
      <head><ThemeScript /></head>
      <body>
        <ThemeProvider>
          <a className="absolute -top-16 left-4 z-10 rounded-ui bg-ink px-4 py-2.5 text-bg no-underline focus:top-4" href="#main">Skip to content</a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
