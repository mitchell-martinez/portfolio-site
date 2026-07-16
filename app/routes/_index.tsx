import type { MetaFunction } from 'react-router';
import { Hero } from '~/components/route/Hero/';
import { buildSocialMeta } from '~/utils/socialMeta';
import { serializeStructuredData } from '~/utils/structuredData';

export const meta: MetaFunction = () =>
  buildSocialMeta({
    title: 'Website Designer & Developer Australia - Mitchell Martinez',
    description:
      'Website design and development for Australian small businesses and creative professionals, including redesigns, WordPress, web apps and search foundations.',
    url: '/',
  });

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://mitchellmartinez.tech/#person',
      name: 'Mitchell Martinez',
      url: 'https://mitchellmartinez.tech/',
      jobTitle: 'Website Designer and Developer',
      sameAs: ['https://linkedin.com/in/mitchellmartinezadl'],
      knowsAbout: [
        'React',
        'TypeScript',
        'Website design and development',
        'WordPress development',
        'Technical SEO',
        'Web accessibility',
        'User experience design',
        'Web performance',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://mitchellmartinez.tech/#website',
      url: 'https://mitchellmartinez.tech/',
      name: 'Mitchell Martinez',
      author: { '@id': 'https://mitchellmartinez.tech/#person' },
      inLanguage: 'en-AU',
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
      <Hero />
    </>
  );
}
