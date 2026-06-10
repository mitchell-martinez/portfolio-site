import type { MetaFunction } from 'react-router';
import { Hero } from '~/components/route/Hero/';
import { buildSocialMeta } from '~/utils/socialMeta';

export const meta: MetaFunction = () =>
  buildSocialMeta({
    title: 'Mitchell Martinez - Product Engineer',
    description: 'Frontend Engineer specialising in beautiful, functional digital experiences.',
  });

export default function Index() {
  return <Hero />;
}
