import type { MetaFunction } from 'react-router';
import { NotFound } from '~/components/route/NotFound/';

export const meta: MetaFunction = () => [
  { title: '404 — Page Not Found — Mitchell Martinez' },
  { name: 'description', content: 'This page could not be found.' },
];

export default function CatchAllRoute() {
  return <NotFound />;
}
