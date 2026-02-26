import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    VitePWA({
      // injectManifest: we supply our own sw.ts so we control every caching
      // strategy. The plugin only injects the precache manifest into it.
      strategies: 'injectManifest',
      srcDir: 'app',
      filename: 'sw.ts',
      // Automatically activates the new SW so users get fresh content on the
      // next navigation after a deploy.
      registerType: 'autoUpdate',
      // We register the SW manually in entry.client.tsx for SSR compatibility.
      injectRegister: null,
      injectManifest: {
        // Precache versioned JS/CSS/asset files only. HTML pages are intentionally
        // excluded so the NetworkFirst navigation route in sw.ts handles them —
        // this means users always get fresh HTML when online, and fall back to
        // the most recently cached version when offline.
        globPatterns: ['**/*.{js,css,svg,png,ico,woff2,webmanifest}'],
      },
      manifest: {
        name: 'Mitchell Martinez',
        short_name: 'MitchellM',
        description: 'Frontend Engineer — Building beautiful digital experiences.',
        theme_color: '#0d1117',
        background_color: '#0d1117',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/icons/icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['./app'],
      },
    },
  },
});
