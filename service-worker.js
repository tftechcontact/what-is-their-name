/* 
  WRAPPER: service-worker
  Purpose: Minimal service worker to make the site PWA-friendly and allow PWABuilder to pick it up.
           This is a simple cache-first worker; expand as you like later.
*/
const CACHE_NAME = 'whats-their-name-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/settings.html',
  '/name-page-template.html',
  // add other babyX.html and petX.html once created
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
