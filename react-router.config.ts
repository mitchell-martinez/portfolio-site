import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  // Pre-render the home page as static HTML at build time.
  // React will hydrate it on the client for full interactivity.
  prerender: ["/"],
} satisfies Config;
