import type { MetaFunction } from 'react-router';
import { NotFound } from '~/components/route/NotFound/';
import { buildSocialMeta } from '~/utils/socialMeta';

export const meta: MetaFunction = () =>
  buildSocialMeta({
    title: '404 - Page Not Found - Mitchell Martinez',
    description: 'This page could not be found.',
  });

export default function CatchAllRoute() {
  return <NotFound />;
}
