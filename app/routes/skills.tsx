import type { MetaFunction } from 'react-router';
import { Skills } from '~/components/Skills/Skills';

export const meta: MetaFunction = () => [
  { title: 'Skills — Mitchell Martinez' },
  { name: 'description', content: 'Mitchell Martinez\'s technical skills: React, TypeScript, CSS/SCSS, Node.js, Vite, Testing, Performance, Accessibility, and more.' },
  { name: 'og:title', content: 'Skills — Mitchell Martinez' },
  { name: 'og:description', content: 'Expert-level React & TypeScript skills, advanced Node.js, testing, performance and accessibility.' },
];

export default function SkillsRoute() {
  return <Skills />;
}
