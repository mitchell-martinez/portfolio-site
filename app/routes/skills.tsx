import type { MetaFunction } from 'react-router';
import { Skills } from '~/components/route/Skills/';
import { buildSocialMeta } from '~/utils/socialMeta';

export const meta: MetaFunction = () =>
  buildSocialMeta({
    title: 'Skills - Mitchell Martinez',
    description:
      'Expert-level React & TypeScript skills, advanced Node.js, testing, performance and accessibility.',
  });

export default function SkillsRoute() {
  return <Skills />;
}
