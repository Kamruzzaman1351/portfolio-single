import type { Metadata, Viewport } from 'next';
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SITE_URL, profile } from '@/lib/data';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600'],
});

// ─── Viewport & theme colour (separate export in Next.js 16) ─────────────────
export const viewport: Viewport = {
  themeColor: '#00D4FF',
  width: 'device-width',
  initialScale: 1,
};

// ─── Page metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // Title template — section pages can override the leaf segment
  title: {
    default: 'Md Kamruzzaman | Senior Full Stack & Laravel Developer — Remote',
    template: '%s | Md Kamruzzaman',
  },

  // 150–160 chars, front-loads the strongest keyword phrase
  description:
    'Senior full-stack engineer with 9+ years building Laravel, React, and Next.js applications for enterprise clients. Shopify & BigCommerce expert. Available for remote freelance and contract work in the US, UK, and Ireland.',

  // Keyword clusters — long-tail + entity terms for AI indexing
  keywords: [
    'Md Kamruzzaman',
    'Laravel developer for hire',
    'full stack developer remote',
    'Shopify developer',
    'BigCommerce developer',
    'React Next.js developer',
    'backend Laravel PHP developer',
    'NetSuite Salesforce integration developer',
    'freelance developer Malaysia',
    'remote software engineer',
    'e-commerce developer',
    'headless Shopify developer',
    'Coalition Technologies developer',
    'hire Laravel developer',
  ],

  authors: [{ name: 'Md Kamruzzaman', url: SITE_URL }],
  creator: 'Md Kamruzzaman',
  publisher: 'Md Kamruzzaman',

  // Canonical — prevents duplicate-content penalties
  alternates: {
    canonical: SITE_URL,
  },

  // Open Graph — controls how link previews look on LinkedIn, Facebook, Slack
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Md Kamruzzaman — Developer Portfolio',
    title: 'Md Kamruzzaman | Senior Full Stack & Laravel Developer',
    description:
      'Senior full-stack engineer with 9+ years experience. Laravel, React, Next.js, Shopify & BigCommerce specialist. Available for remote contract work.',
    // Add a 1200×630 branded image at public/og-image.png to enable rich previews
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Md Kamruzzaman — Senior Full Stack Developer',
        type: 'image/png',
      },
    ],
    // OG profile fields help AI extract person-entity data
    firstName: 'Md',
    lastName: 'Kamruzzaman',
    username: 'kamruzzaman-md',
    gender: 'male',
  },

  // Twitter / X card
  twitter: {
    card: 'summary_large_image',
    title: 'Md Kamruzzaman | Senior Full Stack & Laravel Developer',
    description:
      'Senior full-stack engineer with 9+ years experience. Laravel, React, Next.js, Shopify & BigCommerce specialist. Available for remote contract work.',
    images: ['/og-image.png'],
    // Update to your real handle if you create a Twitter/X account
    creator: '@kamruzzaman_md',
  },

  // Indexing directives
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

  // Google Search Console verification — set NEXT_PUBLIC_GOOGLE_VERIFICATION in .env.local
  ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
  }),

  // App / PWA hints
  applicationName: 'Md Kamruzzaman Portfolio',
  referrer: 'origin-when-cross-origin',
  category: 'technology',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-dark text-bright antialiased">{children}</body>
    </html>
  );
}
