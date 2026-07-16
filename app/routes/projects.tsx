import type { MetaFunction } from 'react-router';
import { Projects } from '~/components/route/Projects/';
import { buildSocialMeta } from '~/utils/socialMeta';

export const meta: MetaFunction = () =>
  buildSocialMeta({
    title: 'Website & Product Development Work - Mitchell Martinez',
    description:
      'Explore selected website and product development work by Sydney developer Mitchell Martinez, including Studio Zanetti, Budgeto and Friends of Gulf St Vincent.',
    url: '/projects',
    image: '/images/social/home-preview.png',
    imageAlt: 'Selected website and product work by Mitchell Martinez',
  });

export default function ProjectsRoute() {
  return <Projects />;
}
