import type { MetaFunction } from 'react-router';
import { Hero } from '~/components/route/Hero/';

export const meta: MetaFunction = () => [
  { title: 'Mitchell Martinez — Frontend Engineer' },
  {
    name: 'description',
    content:
      'Frontend Engineer specializing in beautiful digital experiences. Building modern web applications with React, TypeScript, and cutting-edge technologies.',
  },
  { property: 'og:title', content: 'Mitchell Martinez — Frontend Engineer' },
  {
    property: 'og:description',
    content: 'Frontend Engineer specializing in beautiful digital experiences.',
  },
];

export default function Index() {
  return <Hero />;
}
