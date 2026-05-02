import type { Metadata } from 'next';
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'Md Kamruzzaman | Full Stack Developer',
  description:
    'Software developer specializing in React, Next.js, and Node.js. Building high-performance web applications with a focus on clean architecture and great user experiences.',
  keywords: ['developer', 'portfolio', 'react', 'nextjs', 'typescript', 'full stack', 'software engineer'],
  authors: [{ name: 'Md Kamruzzaman' }],
  openGraph: {
    title: 'Md Kamruzzaman | Full Stack Developer',
    description: 'Software developer specializing in React, Next.js, and Node.js.',
    url: 'https://alexmorgan.dev',
    siteName: 'Md Kamruzzaman Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Md Kamruzzaman | Full Stack Developer',
    description: 'Software developer specializing in React, Next.js, and Node.js.',
    creator: '@alexmorgan',
  },
  robots: {
    index: true,
    follow: true,
  },
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
