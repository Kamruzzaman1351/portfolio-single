import type { NextConfig } from 'next';

// ─── Security headers ─────────────────────────────────────────────────────────
// Applied to every route. These improve Core Web Vitals scores on PageSpeed
// Insights and satisfy Google's "Security" audit in Lighthouse.
const securityHeaders = [
  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Block clickjacking
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Enable DNS prefetching for faster resource loads
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  // Controls how much referrer info is sent — balances analytics vs. privacy
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable browser features not needed by a portfolio
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Force HTTPS for 2 years — enable only when you have a real domain + SSL
  // { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  // ── Compression ─────────────────────────────────────────────────────────────
  // Gzip/Brotli compression is ON by default in Next.js. Explicit here for clarity.
  compress: true,

  // ── Image optimisation ───────────────────────────────────────────────────────
  // If you add real images later, list allowed external hostnames here.
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // ── HTTP headers ─────────────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Apply security headers to every route
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // Long-lived cache for static assets (fonts, images, JS chunks)
        // Next.js already hashes filenames so stale content is never served.
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache the CV PDF for 1 day — short enough to pick up updates quickly
        source: '/kamruzzaman_cv.pdf',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
          // Ensures the browser downloads the file rather than previewing it
          { key: 'Content-Disposition', value: 'attachment; filename="Kamruzzaman-CV.pdf"' },
        ],
      },
      {
        // Sitemap and robots — short cache so changes propagate within a day
        source: '/(sitemap.xml|robots.txt)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=3600',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
