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
    price: 2000,
    priceLabel: 'From A$2,000',
    timeline: 'Typically 3–4 weeks',
    summary: 'A focused, professional website that makes it easy for customers to understand your business and get in touch.',
    bestFor: 'New businesses, independent professionals, and focused service offers who need a simple web presence for marketing',
    inclusions: [
      'Landing page and core pages',
      'Lead or contact form',
      'Essential analytics-ready setup',
      'Basic AI and SEO content optimisation and searchability using modern web practices',
      'Handover document with guides for future content and instructions for later maintainers',
    ],
  },
  {
    slug: 'grow',
    name: 'Grow',
    price: 5000,
    priceLabel: 'From A$5,000',
    timeline: 'Typically 6–8 weeks',
    summary: 'A larger, editable website for an established business with more services, content, or audiences to support.',
    bestFor: 'Growing businesses, creative studios, and organisations publishing regular content who have a customer base and are looking to grow it',
    inclusions: [
      'Full basic website with multiple pages and sections',
      'Editable CMS and reusable content blocks with out-of-the-box solutions like WordPress or SquareSpace',
      'Basic blog, lead-generation functionalities and limited shop fronts',
      'Full AI and SEO content optimisation and searchability',
      'Basic accessibility and performance optimisations',
      'Detailed post-launch handover and training for your team to manage content and updates',
    ],
  },
  {
    slug: 'custom',
    name: 'Custom',
    price: 7500,
    priceLabel: 'From A$7,500',
    timeline: 'Typically 10–16+ weeks',
    summary: 'A tailored build for advanced content, integrations, custom workflows, or product functionality.',
    bestFor: 'Complex websites, headless CMS builds, integrations, web or mobile applications, SaaS products and other advanced custom digital presences where a greenfield project is required',
    inclusions: [
      'Detailed discovery and technical planning',
      'Fully custom design and implementation with reusable components and content blocks for easy future updates',
      'Custom forms, integrations, or application workflows',
      'AI integrations at the content, search, and findability level where appropriate (priced based on scope of work)',
      'Advanced accessibility and performance optimisations',
      'Extras such as mobile apps, admin panels, and other custom functionality as required (priced based on scope of work)',
      '3 months of ongoing support and maintenance included in price to assist with handover',
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
      'I certainly do - while I am based in Sydney, I work with individuals and businesses across Australia and the European Union. Although my focus is working on local businesses and retaining that personal touch, as a software engineer, I am not restricted by borders or physical presence.',
  },
  {
    question: 'Can you work with an existing website?',
    answer:
      "Usually yes! I can review your existing site and recommend whether an incremental improvement or a rebuild is the better investment. The scope of my ability depends on how much access you have to your website and how it's currently been built. If you've been locked out of your current website and have lost access, I can help you regain control of your digital presence and move forward with a new build.",
  },
  {
    question: 'Will I be able to update the website myself?',
    answer:
      "Absolutely! From the beginning, we'll discuss what your long-term needs will be for your website. If you want to be able to update it yourself, I'll make sure it's built in a way that makes you easy to do so, and provide full handover and upskilling so you can make basic changes yourself.",
  },
  {
    question: 'Can you guarantee a first-page Google or AI search ranking?',
    answer:
      'No. Nobody can guarantee a first-page ranking, and you should be skeptical of people that claim to do so. What I can do is help build your website in a way that makes it easy for Google and AI to understand it, as well as helping you create a marketing plan that will help make it easier for your customers to find you. Google indexes websites based on many factors, and AI assistants use a variety of sources to answer questions. I can help you optimise your website for both and make suggestions to increase your visibility, but I cannot control how they rank or present your business.',
  },
  {
    question: 'What growth will my business have after the website is built?',
    answer:
      "I can't guarantee you growth, but I can work with you on a plan to help your new website be more effective at reaching and converting customers. The growth of your business after the website is built depends on various factors including your marketing efforts, industry trends, and customer engagement; as well as factors outside our control such as location, scalability, and the current state of the economy. What I can do is help set up you and your website for success through strategies that help attract and retain customers.",
  },
  {
    question: 'Can you take care of my website long term?',
    answer:
      'Of course! I offer ongoing care and maintenance for websites starting from $99 a month, including updates, backups, and minor content changes. The Care plan is designed to provide peace of mind and ensure your website remains secure and up-to-date without the need for a long-term commitment.',
  },
  {
    question: 'What if I need a website that is more complex than the packages offered?',
    answer:
      'If your project requires more complex functionality, integrations, or custom workflows, I can provide a tailored solution. We can discuss your specific needs and create a custom proposal that fits your requirements and budget.',
  },
  {question: 'How do you use AI in your website development process?', answer: 'I use AI tools to assist with research, content optimisation, and quality checks. AI can help identify relevant keywords, improve content readability, and ensure that your website is structured in a way that is easily understood by search engines and AI assistants. However, I always apply human judgment and expertise to ensure that the final output aligns with your business goals and provides a great user experience.'},
  {question: 'Do you offer any discounts for non-profits or bootstrapped creatives?', answer: "I'll work with you to understand what your needs and circumstances are before we discuss price. I understand that non-profits, creatives and startups often have limited budgets. I am open to discussing flexible arrangements, deferred payments or reduced rates based on the scope of work and your specific situation. Where appropriate, I can also recommend grants, contacts, and other ways to make your project more affordable. Please reach out to discuss your project and we can explore options together."},
  {
    question: 'How do I get started?',
    answer:
      'You can get started by reaching out through the contact form on my website. Please provide details about your project, including your goals, timeline, and any specific requirements. I will review your information and get back to you to discuss the next steps.',
  }
];

export const pricingFaqs: FrequentlyAskedQuestion[] = [
  {
    question: 'Are these fixed prices?',
    answer:
      'Most businesses fit within these packages, however they are starting points for the scope described. After a short discovery conversation, I provide a written proposal with the exact deliverables, timing, and project price; where additional features or services may be added, these will be at an additional agreed price. If you are a non-profit, an independent creative with limited budget, or a bootstrapped startup, tell me what is realistic. Where capacity allows, I may be able to adjust scope, stage the work, or offer a reduced rate.',
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
