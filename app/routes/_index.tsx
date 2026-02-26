import { lazy, Suspense } from 'react';
import type { MetaFunction } from 'react-router';
import { Header } from '~/components/Header/Header';
import { Hero } from '~/components/Hero/Hero';
import { Footer } from '~/components/Footer/Footer';

const About = lazy(() => import('~/components/About/About').then(m => ({ default: m.About })));
const Skills = lazy(() => import('~/components/Skills/Skills').then(m => ({ default: m.Skills })));
const Projects = lazy(() => import('~/components/Projects/Projects').then(m => ({ default: m.Projects })));
const Contact = lazy(() => import('~/components/Contact/Contact').then(m => ({ default: m.Contact })));

export const meta: MetaFunction = () => [
  { title: 'Mitchell Martinez — Frontend Engineer' },
  { name: 'description', content: 'Frontend Engineer specializing in beautiful digital experiences. Building modern web applications with React, TypeScript, and cutting-edge technologies.' },
  { name: 'og:title', content: 'Mitchell Martinez — Frontend Engineer' },
  { name: 'og:description', content: 'Frontend Engineer specializing in beautiful digital experiences.' },
];

const SectionFallback = () => (
  <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid #0071e3', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
  </div>
);

export default function Index() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
