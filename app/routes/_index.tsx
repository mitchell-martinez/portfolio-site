import type { MetaFunction } from 'react-router';
import { Home } from '~/components/route/Home/';
import { carePlan, websitePackages } from '~/data/freelanceServices';
import { buildSocialMeta } from '~/utils/socialMeta';
import { serializeStructuredData } from '~/utils/structuredData';

export const meta: MetaFunction = () =>
  buildSocialMeta({
    title: 'Website Designer & Developer Australia - Mitchell Martinez',
    description:
      'Website design and development for Australian small businesses and creative professionals, including redesigns, WordPress, web apps and search foundations.',
    url: '/',
    image: '/images/social/home-preview.png',
    imageAlt: 'Mitchell Martinez website designer and developer portfolio featuring Studio Zanetti, Budgeto and Friends of Gulf St Vincent',
  });

const packageOffers = websitePackages.map(websitePackage => ({
  '@type': 'Offer',
  name: `${websitePackage.name} website package`,
  url: `https://mitchellmartinez.tech/contact/?package=${websitePackage.slug}`,
  price: websitePackage.price,
  priceCurrency: 'AUD',
  itemOffered: {
    '@type': 'Service',
    name: `${websitePackage.name} website package`,
    description: websitePackage.summary,
    areaServed: { '@type': 'Country', name: 'Australia' },
  },
}));

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://mitchellmartinez.tech/#person',
      name: 'Mitchell Martinez',
      url: 'https://mitchellmartinez.tech/',
      image: {
        '@type': 'ImageObject',
        url: 'https://mitchellmartinez.tech/images/mitchmartinez.jpg',
        caption: 'Mitchell Martinez, Sydney website designer and developer',
      },
      jobTitle: 'Website Designer and Developer',
      description:
        'Sydney-based website designer, product engineer and developer working with Australian small businesses and creative professionals.',
      email: 'mailto:info@mitchellmartinez.tech',
      homeLocation: {
        '@type': 'City',
        name: 'Sydney',
        containedInPlace: { '@type': 'Country', name: 'Australia' },
      },
      sameAs: ['https://linkedin.com/in/mitchellmartinezadl'],
      knowsAbout: [
        'React',
        'TypeScript',
        'Website design and development',
        'WordPress development',
        'Technical SEO',
        'AI-assisted software development',
        'AI search optimisation',
        'Web accessibility',
        'User experience design',
        'Web performance',
      ],
      owns: { '@id': 'https://budgeto.app/#software-application' },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://mitchellmartinez.tech/#professional-service',
      name: 'Mitchell Martinez Website Design and Development',
      url: 'https://mitchellmartinez.tech/',
      description:
        'Website strategy, design and development for Australian businesses, including redesigns, WordPress, web applications, accessibility, performance and search foundations.',
      image: 'https://mitchellmartinez.tech/images/social/home-preview.png',
      email: 'info@mitchellmartinez.tech',
      taxID: 'ABN 40 927 243 914',
      founder: { '@id': 'https://mitchellmartinez.tech/#person' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sydney',
        addressRegion: 'NSW',
        addressCountry: 'AU',
      },
      areaServed: { '@type': 'Country', name: 'Australia' },
      priceRange: 'A$3,000–A$7,500+',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Website design and development packages',
        itemListElement: [
          ...packageOffers,
          {
            '@type': 'Offer',
            name: 'Website Care plan',
            url: 'https://mitchellmartinez.tech/contact/?package=care',
            price: carePlan.price,
            priceCurrency: 'AUD',
            itemOffered: {
              '@type': 'Service',
              name: 'Website Care plan',
              description: carePlan.summary,
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://mitchellmartinez.tech/#website',
      url: 'https://mitchellmartinez.tech/',
      name: 'Mitchell Martinez',
      author: { '@id': 'https://mitchellmartinez.tech/#person' },
      inLanguage: 'en-AU',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://mitchellmartinez.tech/#webpage',
      url: 'https://mitchellmartinez.tech/',
      name: 'Website Designer & Developer Australia - Mitchell Martinez',
      description:
        'Website design and development for Australian small businesses and creative professionals.',
      isPartOf: { '@id': 'https://mitchellmartinez.tech/#website' },
      about: { '@id': 'https://mitchellmartinez.tech/#professional-service' },
      mainEntity: { '@id': 'https://mitchellmartinez.tech/#person' },
      inLanguage: 'en-AU',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://budgeto.app/#software-application',
      name: 'Budgeto',
      url: 'https://budgeto.app/',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      description:
        'A responsive budgeting application focused on showing income, spending and money left before payday.',
      creator: { '@id': 'https://mitchellmartinez.tech/#person' },
    },
    {
      '@type': 'ItemList',
      name: 'Selected website and application work',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'WebSite',
            name: 'Studio Zanetti',
            url: 'https://studiozanetti.com.au/',
            description: 'A headless WordPress photography platform designed and developed by Mitchell Martinez.',
            creator: { '@id': 'https://mitchellmartinez.tech/#person' },
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: { '@id': 'https://budgeto.app/#software-application' },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'WebSite',
            name: 'Friends of Gulf St Vincent',
            url: 'https://fogsv.org.au/',
            description: 'A custom WordPress community and conservation website developed by Mitchell Martinez.',
            creator: { '@id': 'https://mitchellmartinez.tech/#person' },
          },
        },
      ],
    },
  ],
};

export default function Index() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }}
      />
      <Home />
    </>
  );
}
