// ─── Site-wide constant — update this when you deploy to a real domain ───────
export const SITE_URL = 'https://mdkam.dev';

export interface Social {
  github: string;
  linkedin: string;
}

export interface Profile {
  name: string;
  title: string;
  roles: string[];
  bio: string[];
  location: string;
  email: string;
  availability: boolean;
  socials: Social;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'DevOps & Tools' | 'Database' | 'Integrations' | 'Learning For Fun';
  level: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  gradient: string;
  initials: string;
  tags: string[];
  github: string;
  demo: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  employmentType: string;
  companyDescription?: string;
  bullets: string[];
  color: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const profile: Profile = {
  name: 'Md Kamruzzaman',
  title: 'Software Developer',
  roles: ['Backend Developer', 'Laravel Developer','Full Stack Developer', 'React / Next.js Specialist', 'Node.js Engineer'],
  bio: [
    "I'm a senior full-stack engineer with 9+ years building production-grade web applications for enterprise clients across the USA, Canada, EU and globally. My core stack is Laravel, Php, React, Next.js, and AWS, with deep expertise in ERP/CRM integrations, Shopify & BigCommerce Partner development, and SaaS architecture.",
    "I've delivered complex projects for clients including Lamborghini, Drinkmate, Gradwear, Inhaven, Mom's Pantry and Bisect Hosting — from custom API platforms and multi-tenant SaaS to Shopify Plus apps and NetSuite/Salesforce integrations.",
    "Currently based in Malaysia, working remotely as a Backend Laravel Developer for a US-based software company, Coalition Technologies. I collaborate with distributed teams across Europe and the United States. I’m also available for contract and freelance opportunities, particularly with teams in Ireland, the UK, and the US.",
    "When I’m not coding, I explore new technologies, contribute to open source, and write about software engineering best practices. I also enjoy developing games and mobile applications for fun.",
  ],
  location: 'San Francisco, CA - Remote',
  email: 'mdrashed1351@gmail.com',
  availability: true,
  socials: {
    github: 'https://github.com/Kamruzzaman1351',
    linkedin: 'https://www.linkedin.com/in/kamruzzaman-md/',
  },
};

export const stats: Stat[] = [
  { value: 9, suffix: '+', label: 'Years Experience' },
  { value: 130, suffix: '+', label: 'Projects Completed' },
  { value: 100, suffix: '+', label: 'Happy Clients' },
  { value: 10, suffix: 'K+', label: 'GitHub Stars' },
];

export const skills: Skill[] = [
  { name: 'React', category: 'Frontend', level: 5 },
  { name: 'Next.js', category: 'Frontend', level: 5 },
  { name: 'TypeScript', category: 'Frontend', level: 5 },
  { name: 'VueJs', category: 'Frontend', level: 5 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 5 },
  { name: 'Framer Motion', category: 'Frontend', level: 4 },
  { name: 'Laravel', category: 'Backend', level: 5 },
  { name: 'PHP', category: 'Backend', level: 5 },
  { name: 'Node.js', category: 'Backend', level: 5 },
  { name: 'Django / Python', category: 'Backend', level: 5 },
  { name: 'Ruby on Rails', category: 'Backend', level: 4 },
  { name: 'REST API Design', category: 'Backend', level: 5 },
  { name: 'Docker', category: 'DevOps & Tools', level: 4 },
  { name: 'AWS', category: 'DevOps & Tools', level: 4 },
  { name: 'DigitalOcean', category: 'DevOps & Tools', level: 5 },
  { name: 'Git', category: 'DevOps & Tools', level: 5 },
  { name: 'Figma', category: 'DevOps & Tools', level: 3 },
  { name: 'Linux', category: 'DevOps & Tools', level: 4 },
  { name: 'MySQL', category: 'Database', level: 5 },
  { name: 'PostgreSQL', category: 'Database', level: 4 },
  { name: 'Firebase', category: 'Database', level: 4 },
  { name: 'MongoDB', category: 'Database', level: 4 },
  { name: 'Shopify API', category: 'Integrations', level: 5 },
  { name: 'BigCommerce API', category: 'Integrations', level: 4 },
  { name: 'NetSuite ERP', category: 'Integrations', level: 4 },
  { name: 'Salesforce CRM', category: 'Integrations', level: 4 },
  { name: 'Monday / Celigo', category: 'Integrations', level: 3 },
  { name: 'Stripe / Payment APIs', category: 'Integrations', level: 5 },
  { name: 'Rust', category: 'Learning For Fun', level: 2 },
  { name: 'Unity', category: 'Learning For Fun', level: 2 },
  { name: 'C#', category: 'Learning For Fun', level: 3 },
  { name: 'Java', category: 'Learning For Fun', level: 3 },
  { name: 'Mobile App Development', category: 'Learning For Fun', level: 3 },
  { name: 'Game Development', category: 'Learning For Fun', level: 3 },
];

export const projects: Project[] = [
  {
    id: 'drinkmate',
    title: 'DrinkMate',
    description:
      "Architected and delivered a custom middleware platform integrating Shopify, ShipStation, Salesforce, and logistics providers such as FedEx and UPS. Implemented scalable APIs and automated workflows to manage end-to-end sales, order fulfillment, and customer data synchronization. Developed a headless Shopify architecture, improving performance, flexibility, and integration capabilities across systems.",
    gradient: 'from-cyan-500/20 via-blue-500/10 to-violet-500/20',
    initials: 'DM',
    tags: ['Laravel','PHP', 'React', 'MySQL', 'Shopify Headless', 'NextJs', 'AWS', 'Tailwind CSS', 'Salesforce', 'ShipStation', 'FedEx', 'UPS', 'USPS', 'GraphQL',],
    github: '#',
    demo: 'https://idrinkproducts.com/',
  },
  {
    id: 'lncurtis',
    title: 'LN CURTIS',
    description:
      "Architected and delivered a custom middleware platform integrating BigCommerce, NetSuite, Celigo, and Loop return. Implemented scalable APIs and automated workflows to manage end-to-end sales, order fulfillment, and customer data synchronization.",
    gradient: 'from-cyan-500/20 via-blue-500/10 to-violet-500/20',
    initials: 'LN',
    tags: ['Laravel','PHP', 'React', 'MySQL', 'BigCommerce', 'BigCommerce API', 'GraphQL', 'DigitalOcean', 'NetSuite', 'Celigo', 'Loop', 'Salesforce'],
    github: '#',
    demo: 'https://lncurtis.com/',
  },
  {
    id: 'gradwear',
    title: 'GradWear',
    description:
      'Architected and delivered a custom App integrated with Shopify platform for college students to buy and sell used clothing, with a focus on sustainability and community building.',
    gradient: 'from-violet-500/20 via-purple-500/10 to-pink-500/20',
    initials: 'GW',
    tags: ['Laravel','PHP', 'Vue.js', 'MySQL', 'Shopify', 'DigitalOcean', 'Tailwind CSS', 'Design Lab', 'REST API', 'GraphQL',],
    github: '#',
    demo: 'https://www.gradwear.ca/',
  },
  {
    id: 'lamborghini',
    title: 'Lamborghini',
    description:
      'Architected and delivered a custom App integrated with Shopify platform for Lamborghini to sell car racing event tickets, manage dealer relationships, with a focus on luxury branding and seamless user experience.',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
    initials: 'LM',
    tags: ['Laravel','PHP', 'React', 'MySQL', 'Shopify', 'DigitalOcean', 'Salesforce', 'Tailwind CSS', 'REST API', 'GraphQL',],
    github: '#',
    demo: 'https://eventsala.com/',
  },
    {
    id: 'inhaven',
    title: 'InHaven',
    description:
      "Architected and delivered a custom middleware platform integrating BigCommerce, NetSuite, Celigo, Salesforce and Monday.com. Implemented scalable APIs and automated workflows to manage end-to-end sales, order fulfillment, and customer data synchronization.",
    gradient: 'from-cyan-500/20 via-blue-500/10 to-violet-500/20',
    initials: 'IH',
    tags: ['Laravel','PHP', 'React', 'MySQL', 'BigCommerce', 'BigCommerce API', 'GraphQL', 'DigitalOcean', 'NetSuite', 'Celigo', 'Monday.com', 'Salesforce'],
    github: '#',
    demo: 'https://inhaven.com/',
  },
  {
    id: 'moms-pantry',
    title: 'Mom\'s Pantry',
    description:
      "Architected and delivered a custom middleware platform integrating Shopify, ShipStation, Salesforce, and logistics providers such as FedEx and UPS. Implemented scalable APIs and automated workflows to manage end-to-end sales, order fulfillment, and customer data synchronization. Developed a headless Shopify architecture, improving performance, flexibility, and integration capabilities across systems.",
    gradient: 'from-cyan-500/20 via-blue-500/10 to-violet-500/20',
    initials: 'DM',
    tags: ['Laravel','PHP', 'React', 'MySQL', 'Shopify Headless', 'NextJs', 'AWS', 'Tailwind CSS', 'Salesforce', 'ShipStation', 'FedEx', 'UPS', 'USPS', 'GraphQL',],
    github: '#',
    demo: 'https://momspantry.ca/',
  },
];

export const experiences: Experience[] = [
  {
    id: 'coalition',
    company: 'Coalition Technologies',
    role: 'Backend Developer',
    startDate: '2022',
    endDate: 'Present',
    location: 'USA · Remote',
    employmentType: 'Full Time · Remote',
    companyDescription:
      'Coalition Technologies is a leading US-based digital agency delivering web development, SEO, and e-commerce solutions to enterprise clients worldwide.',
    bullets: [
      "Delivered 30+ full-cycle web and e-commerce projects for clients including Lamborghini, Drinkmate, Gradwear, Inhaven, Mom's Pantry and Bisect Hosting achieving on-time delivery rates above 95%.",
      "Architected and launched 35+ custom Shopify and BigCommerce applications, with 2 published on public marketplaces — driving recurring revenue streams for client businesses.",
      "Engineered complex ERP/CRM integrations (NetSuite, Salesforce, Celigo) that reduced manual data processing time by an estimated 40% for multiple enterprise clients.",
      "Led cloud infrastructure setup and ongoing maintenance on AWS (EC2, S3, RDS) and DigitalOcean for 30+ production environments, ensuring 99.9% uptime SLAs.",
      "Collaborated directly with the Sales team on pre-sales calls and project scoping, producing technical proposals that converted at a higher-than-average rate.",
      "Conducted regular client-facing meetings, translating complex technical progress into clear business updates and proactively managing expectations.",
    ],
    color: '#00D4FF',
  },
  {
    id: 'coderhand',
    company: 'CoderHand',
    role: 'Senior Full-Stack Developer & Team Lead',
    startDate: '2016',
    endDate: '2022',
    location: 'On-site · Full Time',
    employmentType: 'Full Time',
    companyDescription: undefined,
    bullets: [
      'Mentored a team of 4 junior developers in deployment practices, server management, system architecture, and client communication — reducing onboarding time by 30%.',
      'Built bespoke Laravel-based web platforms for SME and enterprise clients across e-commerce, SaaS, and internal tooling verticals.',
      'Developed React and Vue.js front-ends integrated with RESTful APIs, improving page performance and reducing load times by up to 50%.',
      'Managed complete project lifecycles — from client discovery workshops and wireframing through to deployment and post-launch support.',
      'Integrated third-party services including payment gateways, shipping APIs, and CRM platforms, expanding client system capabilities with minimal disruption.',
      'Maintained PostgreSQL and MySQL databases for high-traffic applications, implementing query optimisation strategies that improved performance by 35%.',
    ],
    color: '#7B61FF',
  },
];

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  review: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// Questions real people & AI assistants ask about a developer for hire.
// These feed both the visible FAQ section and the FAQPage JSON-LD schema.
export const faqs: FAQ[] = [
  {
    question: 'Who is Md Kamruzzaman?',
    answer:
      'Md Kamruzzaman is a senior full-stack software engineer with over 9 years of professional experience building production-grade web applications for enterprise clients across the USA, Canada, the EU, and globally. He is currently a Backend Laravel Developer at Coalition Technologies, a US-based digital agency, working fully remotely from Malaysia.',
  },
  {
    question: 'What services does Md Kamruzzaman offer?',
    answer:
      'Md Kamruzzaman offers full-stack web development, Laravel and PHP backend development, React and Next.js frontend development, Shopify and BigCommerce app development, ERP/CRM integrations (NetSuite, Salesforce, Celigo), headless e-commerce architecture, SaaS platform development, REST API design, cloud infrastructure setup on AWS and DigitalOcean, and technical consulting.',
  },
  {
    question: 'What technologies does Md Kamruzzaman specialise in?',
    answer:
      'His core stack is Laravel, PHP, React, Next.js, and TypeScript, with deep expertise in MySQL, PostgreSQL, Docker, AWS, and DigitalOcean. He also has hands-on experience with Shopify and BigCommerce APIs, GraphQL, Salesforce CRM, NetSuite ERP, Stripe payment integrations, and Vue.js.',
  },
  {
    question: 'Is Md Kamruzzaman available for freelance or contract work?',
    answer:
      'Yes. Md Kamruzzaman is available for freelance and contract engagements, particularly with teams based in Ireland, the UK, and the United States. He works fully remote and is open to both short-term project-based contracts and longer-term engagements.',
  },
  {
    question: 'Where is Md Kamruzzaman based and does he work remotely?',
    answer:
      'Md Kamruzzaman is currently based in Malaysia and works fully remotely. He has extensive experience collaborating with distributed teams across Europe and North America, with no timezone barriers for async-first teams.',
  },
  {
    question: 'What notable clients has Md Kamruzzaman worked with?',
    answer:
      'He has delivered projects for well-known clients including Lamborghini, DrinkMate, Gradwear, InHaven, Mom\'s Pantry, LN Curtis, and Bisect Hosting — spanning luxury brand e-commerce, headless Shopify, BigCommerce integrations, and custom SaaS platforms.',
  },
  {
    question: 'What is Md Kamruzzaman\'s experience with Shopify development?',
    answer:
      'Md Kamruzzaman has built 35+ custom Shopify and BigCommerce applications, including 2 published on public marketplaces. He has delivered headless Shopify architectures, custom storefront APIs, Shopify Plus integrations, and end-to-end middleware platforms connecting Shopify with Salesforce, ShipStation, and logistics providers like FedEx, UPS, and USPS.',
  },
  {
    question: 'How can I contact Md Kamruzzaman to hire him?',
    answer:
      'You can reach Md Kamruzzaman via the contact form on this website, by emailing mdrashed1351@gmail.com, or by connecting on LinkedIn at linkedin.com/in/kamruzzaman-md. He typically responds within 24 hours.',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'dalit',
    name: 'Dalit Kaplan',
    title: 'Director',
    company: 'Just World Group · Storywell',
    avatar: 'DK',
    review:
      "Kam created two websites for me — my business website and my personal website. The websites look great and are highly visible. His response time and turnaround time was incredibly quick. He is always available to help out with technical queries and he empowers me to work on my own website as well. And he's such a nice guy! Highly recommended!",
  },
  {
    id: 'rodney',
    name: 'Rodney Janover',
    title: 'Founder',
    company: 'Hellomello™',
    avatar: 'RJ',
    review:
      'Kamruzzaman was an excellent help for two of my websites. He showed great knowledge of any issues that we faced and was able to handle any questions I had. His work ethic is also excellent and gets work done very quickly when needed. I enjoyed working with Kam and I plan on continuing our work relationship into the future.',
  },
];
