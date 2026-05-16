import type { MetaFunction } from 'react-router';
import { Projects } from '~/components/route/Projects/';

export const meta: MetaFunction = () => [
  { title: 'Projects - Mitchell Martinez' },
  {
    name: 'description',
    content:
      'Featured projects by Mitchell Martinez - Budgeto, Studio Zanetti, FOG SV, and enterprise frontend work at Optus.',
  },
  { property: 'og:title', content: 'Projects - Mitchell Martinez' },
  {
    property: 'og:description',
    content: 'A selection of projects combining technical depth with thoughtful design.',
  },
];

export default function ProjectsRoute() {
  return <Projects />;
}
