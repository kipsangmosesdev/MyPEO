const CACHE_NAME = 'moses-portfolio-v1';
const APP_SHELL = [
  '/',
  '/static/portfolio/manifest.webmanifest',
  '/static/portfolio/style.css',
  '/static/portfolio/site.js',
  '/static/portfolio/pwa.js',
  '/static/portfolio/icon.svg',
  '/static/portfolio/icon-192.png',
  '/static/portfolio/icon-512.png',
  '/static/portfolio/offline.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith('moses-portfolio-') && key !== CACHE_NAME).map((key) => caches.delete(key)),
    )),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put('/', copy));
          }
          return response;
        })
        .catch(async () => (await caches.match('/')) || caches.match('/static/portfolio/offline.html')),
    );
    return;
  }

  if (url.pathname.startsWith('/static/portfolio/')) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((response) => {
        if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
        return response;
      })),
    );
  }
});
