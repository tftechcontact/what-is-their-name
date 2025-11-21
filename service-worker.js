/* 
  WRAPPER: service-worker
  Purpose: Minimal service worker (cache-first) to support PWA packaging. Expand as needed.
*/
const CACHE_NAME = 'whats-their-name-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/settings.html',
  '/name-page-template.html'
  // add babyX.html and petX.html here once created
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
