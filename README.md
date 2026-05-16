# portfolio-site
Marketing and portfolio site built in React Router powering mitchellmartinez.tech

## Deployment

- GitHub Actions deploy workflow: `.github/workflows/deploy.yml`
- Container build file: `Dockerfile`
- Recommended server routing (on VPS Caddy):

```caddyfile
mitchellmartinez.tech {
  reverse_proxy 127.0.0.1:3000
}
```

## Writing Articles

Articles are markdown files in `content/blog/`.

1. Create a new file: `content/blog/my-new-article.md`
2. Add frontmatter at the top.
3. Write markdown below it.
4. Run `npm run build` to verify it renders.

Example frontmatter:

```md
---
title: Building a Better React Architecture
description: Full article summary shown on the article page and used for SEO fallback.
frontPageDescription: Short teaser for the /articles page and SEO description.
date: 2026-05-16
tags:
  - react
  - architecture
cover:
  src: /images/blog/building-better-react-architecture/cover.webp
  alt: Illustration of layered app architecture
---
```

Notes:

- `frontPageDescription` is optional.
- If `frontPageDescription` is omitted, `description` is used on the Blog page and SEO.
- Blog list is at `/blog`.
- Individual article URLs are `/blog/:slug`.
