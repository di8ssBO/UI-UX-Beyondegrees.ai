/* BeyonDegrees.ai — Service Worker
 * Strategy:
 *   - Precache the shared "app shell" (design system + home + icons).
 *   - Navigations (HTML): network-first, fall back to cache, then home.
 *   - Other same-origin assets: stale-while-revalidate.
 * Bump CACHE_VERSION whenever you ship new assets to force an update.
 */
const CACHE_VERSION = 'v2';
const CACHE_NAME = `beyondegrees-${CACHE_VERSION}`;
// The device router at '/' decides desktop vs mobile, so it's the offline entry.
const OFFLINE_FALLBACK = '/';

// Shared shell — loaded by (almost) every screen. A single 404 here must not
// abort installation, so we add them with allSettled below.
const PRECACHE_URLS = [
  OFFLINE_FALLBACK,
  '/mobile/onboarding/home/index.html',
  '/desktop/onboarding/home/index.html',
  '/mobile/manifest.json',
  '/design-system/tokens.css',
  '/design-system/base.css',
  '/design-system/layout.css',
  '/design-system/animations.css',
  '/design-system/components/interactive.css',
  '/design-system/components/display.css',
  '/design-system/components/navigation.css',
  '/shared/scripts/ui/i18n.js',
  '/shared/scripts/ui/bd-profile.js',
  '/shared/icons/icon-192.png',
  '/shared/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(
        PRECACHE_URLS.map((url) =>
          cache.add(new Request(url, { cache: 'reload' }))
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('beyondegrees-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle same-origin GET requests; let the browser do the rest.
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // HTML navigations: network-first so users get fresh content when online.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match(OFFLINE_FALLBACK))
        )
    );
    return;
  }

  // Static assets: stale-while-revalidate.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
