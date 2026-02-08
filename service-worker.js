// public/service-worker.js
const CACHE_NAME = 'markdown-mobile-reader-v2'; // Updated cache version
const urlsToCache = [
  '/md-mobile-webapp/',
  '/md-mobile-webapp/index.html',
  '/md-mobile-webapp/pwa-icon.svg',
  '/md-mobile-webapp/manifest.json',
  // IMPORTANT: These asset names change with each build.
  // They need to be updated manually or via a build script.
  '/md-mobile-webapp/assets/index-BSQPxBFF.js',
  '/md-mobile-webapp/assets/index-C0aBUYT_.css',
  'https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap',
  'https://fonts.gstatic.com'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // For requests to assets, try network first, then fall back to cache
  if (event.request.url.includes('/assets/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request);
      })
    );
  } else {
    // For other requests, try cache first, then fall back to network
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
    );
  }
});
