import matter from 'gray-matter';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeShiki from '@shikijs/rehype';
import { unified } from 'unified';

export interface PostCover {
  src: string;
  alt: string;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: PostCover;
}

export interface PostSummary extends PostFrontmatter {
  slug: string;
  readingTime: string;
}

export interface Post extends PostSummary {
  html: string;
}

// Inline every blog post's raw markdown into the server bundle at build time.
// No filesystem reads happen at runtime.
const rawPosts = import.meta.glob('../../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

interface ParsedPost {
  slug: string;
  raw: string;
  data: PostFrontmatter;
  body: string;
  readingTime: string;
}

function slugFromPath(path: string): string {
  const file = path.split('/').pop() ?? path;
  return file.replace(/\.md$/, '');
}

function parseAll(): ParsedPost[] {
  return Object.entries(rawPosts).map(([path, raw]) => {
    const { data, content } = matter(raw);
    const fm = data as Partial<PostFrontmatter>;
    if (!fm.title || !fm.date) {
      throw new Error(`Post ${path} is missing required frontmatter (title, date).`);
    }
    return {
      slug: slugFromPath(path),
      raw,
      data: {
        title: fm.title,
        description: fm.description ?? '',
        date: new Date(fm.date).toISOString(),
        tags: fm.tags ?? [],
        cover: fm.cover,
      },
      body: content,
      readingTime: readingTime(content).text,
    };
  });
}

const parsed = parseAll().sort(
  (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
);

const summaries: PostSummary[] = parsed.map((p) => ({
  slug: p.slug,
  readingTime: p.readingTime,
  ...p.data,
}));

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: 'wrap',
    properties: { className: ['heading-anchor'] },
  })
  .use(rehypeShiki, {
    themes: { light: 'github-light', dark: 'github-dark' },
  })
  .use(rehypeStringify);

const htmlCache = new Map<string, string>();

export function getAllPosts(): PostSummary[] {
  return summaries;
}

export function getAllSlugs(): string[] {
  return parsed.map((p) => p.slug);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const found = parsed.find((p) => p.slug === slug);
  if (!found) return null;
  let html = htmlCache.get(slug);
  if (!html) {
    const result = await processor.process(found.body);
    html = String(result);
    htmlCache.set(slug, html);
  }
  return {
    slug: found.slug,
    readingTime: found.readingTime,
    html,
    ...found.data,
  };
}
