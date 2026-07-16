import type { MetaFunction } from 'react-router';
import { Services } from '~/components/route/Services/';
import { serviceOfferings, servicesFaqs } from '~/data/freelanceServices';
import { buildSocialMeta } from '~/utils/socialMeta';
import { serializeStructuredData } from '~/utils/structuredData';

export const meta: MetaFunction = () =>
  buildSocialMeta({
    title: 'Website Design & Development Services - Mitchell Martinez',
    description:
      'Custom websites, redesigns, WordPress, web apps and technical SEO foundations for Australian small businesses and creative professionals.',
    url: '/services',
  });

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://mitchellmartinez.tech/#professional-service',
      name: 'Mitchell Martinez Website Design and Development',
      url: 'https://mitchellmartinez.tech/services/',
      areaServed: { '@type': 'Country', name: 'Australia' },
      provider: { '@id': 'https://mitchellmartinez.tech/#person' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Website design and development services',
        itemListElement: serviceOfferings.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.summary,
          },
        })),
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: servicesFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
};

export default function ServicesRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }}
      />
      <Services />
    </>
  );
}
