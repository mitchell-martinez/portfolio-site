import type { MetaFunction } from 'react-router';
import { Contact } from '~/components/Contact/Contact';

export const meta: MetaFunction = () => [
  { title: 'Contact — Mitchell Martinez' },
  { name: 'description', content: 'Get in touch with Mitchell Martinez — send an email or connect on LinkedIn.' },
  { name: 'og:title', content: 'Contact — Mitchell Martinez' },
  { name: 'og:description', content: 'Reach out to discuss projects, collaborations, or just to say hello.' },
];

export default function ContactRoute() {
  return <Contact />;
}
