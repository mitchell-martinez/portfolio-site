import type { MetaFunction } from 'react-router';
import { Projects } from '~/components/route/Projects/';
import { buildSocialMeta } from '~/utils/socialMeta';

export const meta: MetaFunction = () =>
  buildSocialMeta({
    title: 'Projects - Mitchell Martinez',
    description: 'A selection of projects combining technical depth with thoughtful design.',
  });

export default function ProjectsRoute() {
  return <Projects />;
}
