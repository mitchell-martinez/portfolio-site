import type { MetaFunction } from 'react-router';
import { About } from '~/components/About/About';

export const meta: MetaFunction = () => [
  { title: 'About — Mitchell Martinez' },
  { name: 'description', content: 'Learn about Mitchell Martinez, a frontend engineer with 5+ years of experience crafting beautiful, performant web applications.' },
  { name: 'og:title', content: 'About — Mitchell Martinez' },
  { name: 'og:description', content: 'Frontend engineer with a passion for building beautiful, performant web applications.' },
];

export default function AboutRoute() {
  return <About />;
}
