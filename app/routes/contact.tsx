import type { MetaFunction } from 'react-router';
import { Contact } from '~/components/route/Contact/';

export const meta: MetaFunction = () => [
  { title: 'Contact — Mitchell Martinez' },
  {
    name: 'description',
    content: 'Get in touch with Mitchell Martinez — send an email or connect on LinkedIn.',
  },
  { property: 'og:title', content: 'Contact — Mitchell Martinez' },
  {
    property: 'og:description',
    content: 'Reach out to discuss projects, collaborations, or just to say hello.',
  },
];

export default function ContactRoute() {
  return <Contact />;
}
