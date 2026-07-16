import type { MetaFunction } from 'react-router';
import { About } from '~/components/route/About/';
import { buildSocialMeta } from '~/utils/socialMeta';

export const meta: MetaFunction = () =>
  buildSocialMeta({
    title: 'About Mitchell Martinez - Sydney Product Engineer',
    description:
      'Meet Mitchell Martinez, a Sydney website developer and product engineer combining strategy, expressive interface design, React, TypeScript and WordPress.',
    url: '/about',
    image: '/images/social/home-preview.png',
    imageAlt: 'Mitchell Martinez, Sydney website developer and product engineer',
  });

export default function AboutRoute() {
  return <About />;
}
