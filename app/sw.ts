/// <reference lib="webworker" />
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare let self: ServiceWorkerGlobalScope;

// Take immediate control of all open clients (pages) without waiting for reload.
// Combined with registerType: 'autoUpdate' this means users always get the
// latest version on the next navigation after a new deploy.
self.skipWaiting();
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Inject the Workbox precache manifest at build time.
// This precaches ALL pre-rendered HTML pages and all versioned JS/CSS assets,
// giving the browser instant first-load performance and offline capability.
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// Navigation requests (HTML pages): NetworkFirst strategy.
// Try to fetch fresh HTML from the server (3 s timeout). If the user is
// offline or the server is slow, serve the pre-rendered HTML from cache.
// This means any route the user has visited before works fully offline.
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages-cache',
    networkTimeoutSeconds: 3,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
      }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  })
);
