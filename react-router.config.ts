import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  // Pre-render all pages as static HTML at build time.
  // The service worker caches these so the site works fully offline
  // after the first visit. React hydrates each page for full interactivity.
  prerender: ["/", "/about", "/skills", "/projects", "/contact"],
} satisfies Config;
