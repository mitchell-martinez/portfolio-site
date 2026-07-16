export type PackageSlug = 'launch' | 'grow' | 'custom' | 'care';

export interface ServiceOffering {
  id: string;
  name: string;
  summary: string;
  outcomes: string[];
}

export interface WebsitePackage {
  slug: Exclude<PackageSlug, 'care'>;
  name: string;
  price: number;
  priceLabel: string;
  timeline: string;
  summary: string;
  bestFor: string;
  inclusions: string[];
}

export interface FrequentlyAskedQuestion {
  question: string;
  answer: string;
}

export const serviceOfferings: ServiceOffering[] = [
  {
    id: 'business-websites',
    name: 'New business websites',
    summary:
      'A complete, responsive website designed around your customers and the actions you need them to take.',
    outcomes: [
      'A clear structure that helps visitors find the right service',
      'A polished experience across mobile and desktop',
      'A practical path from first visit to enquiry',
    ],
  },
  {
    id: 'website-redesigns',
    name: 'Website redesigns',
    summary:
      'A thoughtful rebuild for an existing website that is difficult to use, slow, inconsistent, or no longer reflects the business.',
    outcomes: [
      'Simpler navigation and clearer calls to action',
      'Improved accessibility, performance, and maintainability',
      'A design system that can grow with the business',
    ],
  },
  {
    id: 'cms-development',
    name: 'WordPress and headless CMS development',
    summary:
      'Flexible content management without giving up a fast, custom customer experience.',
    outcomes: [
      'Reusable content blocks your team can update',
      'Content workflows matched to the way you already work',
      'Training and handover instead of long-term lock-in',
    ],
  },
  {
    id: 'web-apps',
    name: 'Web applications and SaaS',
    summary:
      'Custom interfaces and workflows for products that need more than a standard marketing website.',
    outcomes: [
      'User-friendly flows for complex tasks',
      'Maintainable React and TypeScript implementation',
      'Responsive, accessible product experiences',
    ],
  },
  {
    id: 'search-foundations',
    name: 'Search and content foundations',
    summary:
      'Technical and structural work that helps search engines and AI assistants understand what your business offers.',
    outcomes: [
      'Descriptive metadata and crawlable page structure',
      'Structured data where it accurately represents visible content',
      'A content hierarchy built around real customer questions',
    ],
  },
  {
    id: 'agency-support',
    name: 'Agency development support',
    summary:
      'Frontend and CMS implementation support for agencies that need dependable delivery capacity.',
    outcomes: [
      'A developer comfortable working within an existing system',
      'Clear communication and documented handover',
      'Support for React, TypeScript, and WordPress projects',
    ],
  },
];

export const sharedPackageInclusions = [
  'Discovery and project planning',
  'Responsive custom design and development',
  'Technical SEO and metadata foundations',
  'AI-assisted quality, findability, and competitor checks',
  'Accessibility and performance checks',
  'Two rounds of consolidated feedback',
  'Deployment, handover, and training',
  '14 days of post-launch defect support',
];

export const websitePackages: WebsitePackage[] = [
  {
    slug: 'launch',
    name: 'Launch',
    price: 3000,
    priceLabel: 'From A$3,000',
    timeline: 'Typically 3–4 weeks',
    summary: 'A focused, professional website that makes it easy for customers to understand your business and get in touch.',
    bestFor: 'New businesses, independent professionals, and focused service offers',
    inclusions: [
      'Up to three core pages',
      'Lead or contact form',
      'Essential analytics-ready setup',
    ],
  },
  {
    slug: 'grow',
    name: 'Grow',
    price: 5000,
    priceLabel: 'From A$5,000',
    timeline: 'Typically 6–8 weeks',
    summary: 'A larger, editable website for an established business with more services, content, or audiences to support.',
    bestFor: 'Growing businesses, creative studios, and organisations publishing regular content',
    inclusions: [
      'Up to seven core pages',
      'Editable CMS and reusable content blocks',
      'Basic blog or news capability',
    ],
  },
  {
    slug: 'custom',
    name: 'Custom',
    price: 7500,
    priceLabel: 'From A$7,500',
    timeline: 'Typically 10–16+ weeks',
    summary: 'A tailored build for advanced content, integrations, custom workflows, or product functionality.',
    bestFor: 'Complex websites, headless CMS builds, integrations, and web applications',
    inclusions: [
      'Detailed discovery and technical planning',
      'Advanced content models or headless WordPress',
      'Custom forms, integrations, or application workflows',
    ],
  },
];

export const carePlan = {
  slug: 'care' as const,
  name: 'Care',
  price: 99,
  priceLabel: 'From A$99/month',
  summary: 'Practical upkeep after launch without an unlimited-support commitment.',
  inclusions: [
    'Monitoring and routine dependency or security updates',
    'Platform-appropriate backups',
    'Up to 30 minutes of minor content changes each month',
  ],
  exclusions:
    'Unused time does not roll over. Hosting, platform fees, larger changes, and urgent support are quoted separately.',
};

export const packageExclusions = [
  'Final copy and imagery are supplied and approved by the client',
  'Copywriting and substantial content migration are quoted separately',
  'Domains, hosting, premium tools, and third-party fees are not included',
  'Timelines begin once the required content, access, and booking payment are received',
];

export const servicesFaqs: FrequentlyAskedQuestion[] = [
  {
    question: 'Do you work with businesses outside Sydney?',
    answer:
      'Yes. I am based in Sydney and work remotely with businesses and organisations across Australia.',
  },
  {
    question: 'Can you work with an existing website?',
    answer:
      'Yes. I can review and redesign an existing site, retain useful content, and recommend whether an incremental improvement or a rebuild is the better investment.',
  },
  {
    question: 'Will I be able to update the website myself?',
    answer:
      'When editing is part of the brief, I build around an appropriate content management system and include training and handover so you are not dependent on me for routine updates.',
  },
  {
    question: 'Can you guarantee a first-page Google or AI search ranking?',
    answer:
      'No reputable developer can guarantee rankings. I provide strong technical, structural, and content foundations, then explain the ongoing work that may improve discoverability over time.',
  },
];

export const pricingFaqs: FrequentlyAskedQuestion[] = [
  {
    question: 'Are these fixed prices?',
    answer:
      'They are starting points for the scope described. After a short discovery conversation, I provide a written proposal with the exact deliverables, timing, and project price. If you are a non-profit, an independent creative under pressure, or a bootstrapped startup, tell me what is realistic. Where capacity allows, I may be able to adjust scope, stage the work, or offer a reduced rate.',
  },
  {
    question: 'How are projects paid for?',
    answer:
      'Projects are normally 50% to book and 50% before launch. Payment plans are available by agreement, and larger Custom projects can use milestone billing.',
  },
  {
    question: 'What do I need to provide?',
    answer:
      'You provide the approved copy, imagery, brand assets, and access needed for the build. I can help define the structure and can quote separately for copywriting or substantial content migration.',
  },
  {
    question: 'Are hosting and ongoing costs included?',
    answer:
      'Domains, hosting, premium tools, and third-party platform fees are separate so you can see and control the ongoing costs. I will recommend suitable options before the project begins.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'Every package includes handover, training, and 14 days of defect support. The optional Care plan starts from A$99 per month for routine maintenance and small content updates.',
  },
];

export const allPackageSlugs: PackageSlug[] = ['launch', 'grow', 'custom', 'care'];

export function isPackageSlug(value: string): value is PackageSlug {
  return allPackageSlugs.includes(value as PackageSlug);
}
