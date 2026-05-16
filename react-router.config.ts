import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import type { Config } from '@react-router/dev/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = resolve(__dirname, 'content/blog');

const staticPaths = ['/', '/about', '/skills', '/projects', '/blog'];

function getBlogSlugs(): string[] {
  try {
    return readdirSync(contentDir)
      .filter((name) => name.endsWith('.md'))
      .map((name) => name.replace(/\.md$/, ''));
  } catch {
    return [];
  }
}

export default {
  ssr: true,
  // Pre-render all pages as static HTML at build time.
  // The service worker caches these so the site works fully offline
  // after the first visit. React hydrates each page for full interactivity.
  async prerender() {
    return [...staticPaths, ...getBlogSlugs().map((slug) => `/blog/${slug}`)];
  },
} satisfies Config;
