import type { MetaFunction } from 'react-router';
import { Hero } from '~/components/route/Hero/';
import { buildSocialMeta } from '~/utils/socialMeta';

export const meta: MetaFunction = () =>
  buildSocialMeta({
    title: 'Mitchell Martinez - Frontend Engineer',
    description: 'Frontend Engineer specializing in beautiful digital experiences.',
  });

export default function Index() {
  return <Hero />;
}
