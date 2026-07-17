import type { MetaFunction } from 'react-router';
import { Pricing } from '~/components/route/Pricing/';
import { carePlan, pricingFaqs, websitePackages } from '~/data/freelanceServices';
import { buildSocialMeta } from '~/utils/socialMeta';
import { serializeStructuredData } from '~/utils/structuredData';

export const meta: MetaFunction = () =>
  buildSocialMeta({
    title: 'Website Packages & Pricing - Mitchell Martinez',
    description:
      'Website packages from A$2,000 for Australian small businesses, with clear scope, timelines and optional ongoing care.',
    url: '/pricing',
  });

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'OfferCatalog',
      name: 'Website packages and pricing',
      url: 'https://mitchellmartinez.tech/pricing/',
      itemListElement: [
        ...websitePackages.map((websitePackage) => ({
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
        })),
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
    {
      '@type': 'FAQPage',
      mainEntity: pricingFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
};

export default function PricingRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }}
      />
      <Pricing />
    </>
  );
}
