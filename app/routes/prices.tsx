import type { MetaFunction } from 'react-router';
import { Prices } from '~/components/route/Prices/';

export const meta: MetaFunction = () => [
  { title: 'Prices — Mitchell Martinez' },
  {
    name: 'description',
    content:
      'Transparent pricing for frontend development services — from single-page sites to ongoing engineering support.',
  },
  { property: 'og:title', content: 'Prices — Mitchell Martinez' },
  {
    property: 'og:description',
    content: 'Simple, transparent pricing for frontend web development.',
  },
];

export default function PricesRoute() {
  return <Prices />;
}
