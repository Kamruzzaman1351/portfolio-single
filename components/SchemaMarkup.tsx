/**
 * SchemaMarkup — injects all JSON-LD structured data into <head>.
 *
 * Schemas included:
 *  1. Person          — who Kamruzzaman is (AI entity extraction)
 *  2. WebSite         — site identity + SearchAction potential
 *  3. ProfilePage     — signals this is a personal/portfolio page
 *  4. FAQPage         — makes FAQ answers eligible for SGE / AI answers
 *  5. ItemList        — services offered (machine-readable)
 *
 * Why multiple schemas? Google SGE and AI assistants (ChatGPT Browse,
 * Claude, Gemini) parse JSON-LD to extract structured facts. Combining
 * Person + FAQPage maximises the chance of appearing in AI-generated answers.
 */

import { profile, faqs, SITE_URL } from '@/lib/data';

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// ─── 1. Person ────────────────────────────────────────────────────────────────
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Md Kamruzzaman',
  alternateName: ['Kamruzzaman', 'Kam'],
  url: SITE_URL,
  image: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/og-image.png`,
    width: 1200,
    height: 630,
  },
  description:
    'Senior full-stack software engineer with 9+ years of experience building production-grade web applications for enterprise clients worldwide. Specialist in Laravel, PHP, React, Next.js, Shopify, and BigCommerce.',
  jobTitle: [
    'Senior Full Stack Developer',
    'Backend Laravel Developer',
    'Shopify Developer',
    'React / Next.js Specialist',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Software Engineer',
    occupationLocation: {
      '@type': 'Country',
      name: 'Malaysia',
    },
    description:
      'Full-stack web development specialising in Laravel, PHP, React, Next.js, Shopify & BigCommerce integrations, ERP/CRM middleware, and SaaS architecture.',
    skills:
      'Laravel, PHP, React, Next.js, TypeScript, Vue.js, Node.js, MySQL, PostgreSQL, Docker, AWS, DigitalOcean, Shopify API, BigCommerce API, NetSuite ERP, Salesforce CRM, GraphQL, Stripe',
    estimatedSalary: {
      '@type': 'MonetaryAmountDistribution',
      name: 'Hourly rate (freelance)',
      currency: 'USD',
      duration: 'PT1H',
    },
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Coalition Technologies',
    url: 'https://coalitiontechnologies.com',
    description:
      'Leading US-based digital agency delivering web development, SEO, and e-commerce solutions to enterprise clients worldwide.',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MY',
    addressRegion: 'Malaysia',
  },
  email: profile.email,
  knowsAbout: [
    'Laravel',
    'PHP',
    'React',
    'Next.js',
    'TypeScript',
    'Vue.js',
    'Node.js',
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'Docker',
    'AWS',
    'DigitalOcean',
    'Shopify API',
    'BigCommerce API',
    'NetSuite ERP',
    'Salesforce CRM',
    'GraphQL',
    'REST API Design',
    'SaaS Architecture',
    'Headless Commerce',
    'ERP Integrations',
    'Stripe',
    'Tailwind CSS',
  ],
  knowsLanguage: [
    { '@type': 'Language', name: 'English' },
    { '@type': 'Language', name: 'Bengali' },
  ],
  sameAs: [
    profile.socials.github,
    profile.socials.linkedin,
  ],
};

// ─── 2. WebSite ───────────────────────────────────────────────────────────────
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: 'Md Kamruzzaman — Developer Portfolio',
  description:
    'Portfolio of Md Kamruzzaman, a senior full-stack developer specialising in Laravel, React, Next.js, and e-commerce platforms.',
  author: { '@id': PERSON_ID },
  inLanguage: 'en-US',
};

// ─── 3. ProfilePage ───────────────────────────────────────────────────────────
// Helps Google understand this is a person's profile page — improves
// Knowledge Panel eligibility and AI entity association.
const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: 'Md Kamruzzaman — Senior Full Stack Developer Portfolio',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': PERSON_ID },
  mainEntity: { '@id': PERSON_ID },
  dateModified: new Date().toISOString().split('T')[0],
};

// ─── 4. FAQPage ───────────────────────────────────────────────────────────────
// Each Q&A pair is eligible to appear in Google's "People also ask" boxes
// and as a direct source for AI assistant answers (SGE, ChatGPT, Gemini).
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

// ─── 5. ItemList — Services ───────────────────────────────────────────────────
// Machine-readable services list — used by AI to answer
// "what services does [name] offer?" queries.
const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/#services`,
  name: 'Services offered by Md Kamruzzaman',
  description: 'Professional software development services available for hire',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Full Stack Web Development',
      description:
        'End-to-end web application development using Laravel, PHP, React, and Next.js.',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Shopify & BigCommerce Development',
      description:
        'Custom app development, headless storefronts, theme customisation, and marketplace integrations for Shopify and BigCommerce.',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'ERP / CRM Integration',
      description:
        'Middleware platforms connecting e-commerce systems with NetSuite ERP, Salesforce CRM, Celigo, and Monday.com.',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'SaaS Architecture & API Design',
      description:
        'Multi-tenant SaaS platforms, REST API design, and scalable backend architecture on AWS and DigitalOcean.',
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Cloud Infrastructure & DevOps',
      description:
        'Server setup, CI/CD pipelines, Docker containerisation, and managed hosting on AWS EC2/RDS and DigitalOcean.',
    },
    {
      '@type': 'ListItem',
      position: 6,
      name: 'Technical Consulting',
      description:
        'Architecture reviews, pre-sales scoping, project estimation, and technical proposal writing for digital agencies.',
    },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────
// This is a Server Component (no 'use client') — plain <script> tags are the
// correct way to inject JSON-LD in the App Router. next/script is NOT needed
// and causes hydration warnings when used for structured data.
export default function SchemaMarkup() {
  const schemas = [
    personSchema,
    websiteSchema,
    profilePageSchema,
    faqSchema,
    servicesSchema,
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          id={`schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
