import type { MetaFunction } from 'react-router';
import { About } from '~/components/route/About/';
import { buildSocialMeta } from '~/utils/socialMeta';

export const meta: MetaFunction = () =>
  buildSocialMeta({
    title: 'About - Mitchell Martinez',
    description:
      'Frontend engineer with a passion for building beautiful, performant web applications.',
  });

export default function AboutRoute() {
  return <About />;
}
