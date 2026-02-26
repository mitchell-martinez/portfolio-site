import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>
  );
});

// Register the Workbox service worker for offline support.
// Runs only after hydration to avoid any impact on initial page load.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[SW] Registration failed:', err);
      }
    });
  });
}
