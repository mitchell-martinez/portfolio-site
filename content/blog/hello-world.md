---
title: Hello, world
description: A first post to kick the tyres on the new blog — Markdown in, static HTML out.
date: 2025-01-15
tags:
  - meta
  - announcements
cover:
  src: /images/blog/hello-world/cover.svg
  alt: A stylised "hello" greeting in soft gradient colours
---

Welcome to the new blog. This page was built from a single Markdown file at build
time — no client-side Markdown parsing, no JavaScript needed to read this article.

## Why a thin CMS?

The goal here is simple:

- **Performance first.** Posts are pre-rendered to static HTML and cached by the
  service worker, so they load instantly and work offline.
- **Zero runtime cost.** The Markdown pipeline only runs during `build`. Visitors
  never download `unified`, `remark`, `rehype`, or Shiki.
- **Plain files in git.** Each post is a `.md` file under `content/blog/`. No
  database, no admin server, no vendor lock-in.

## Code blocks look nice, too

```ts
// Computed at build time — visitors never run this.
import { getAllPosts } from '~/lib/posts.server';

export async function loader() {
  return { posts: getAllPosts() };
}
```

```scss
.prose {
  max-width: 70ch;
  line-height: 1.7;
}
```

## What's next

Tags, an RSS feed, OG image generation, and a Keystatic admin UI for editing posts
in the browser are coming in a follow-up. For now, drop a new `.md` file in
`content/blog/` and rebuild — that's it.
