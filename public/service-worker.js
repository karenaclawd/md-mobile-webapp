// public/service-worker.js
const CACHE_NAME = 'markdown-mobile-reader-v1';
const urlsToCache = [
  '/md-mobile-webapp/',
  '/md-mobile-webapp/index.html',
  '/md-mobile-webapp/pwa-icon.svg',
  '/md-mobile-webapp/manifest.json',
  '/md-mobile-webapp/assets/index-DsWZ5Itd.js', // Adjust if asset names change
  '/md-mobile-webapp/assets/index-iOYdgb3F.css', // Adjust if asset names change
  'https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap',
  'https://fonts.gstatic.com'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
