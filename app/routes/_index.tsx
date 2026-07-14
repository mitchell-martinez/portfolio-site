import type { MetaFunction } from 'react-router';
import { Hero } from '~/components/route/Hero/';
import { buildSocialMeta } from '~/utils/socialMeta';

export const meta: MetaFunction = () =>
  buildSocialMeta({
    title: 'Mitchell Martinez - Product Engineer',
    description: 'Frontend Engineer specialising in beautiful, functional digital experiences.',
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
      jobTitle: 'Product Engineer',
      sameAs: ['https://linkedin.com/in/mitchellmartinezadl'],
      knowsAbout: [
        'React',
        'TypeScript',
        'Frontend engineering',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
    </>
  );
}
