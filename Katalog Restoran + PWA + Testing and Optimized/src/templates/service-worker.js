const CACHE_NAME = 'app-shell-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/manifest.json',
];

// Install event - caching app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Pre-caching app shell');
        return cache.addAll(FILES_TO_CACHE);
      }),
  );
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME, DATA_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhitelist.includes(cacheName)) {
          console.log('Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        }
      }),
    )),
  );
  self.clients.claim();
});

// Fetch event - caching API responses
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => fetch(event.request)
        .then((response) => {
          // If the response was good, clone it and store it in the cache.
          if (response.status === 200) {
            cache.put(event.request.url, response.clone());
          }
          return response;
        }).catch(() =>
        // Network request failed, try to get it from the cache.
          cache.match(event.request))),
    );
    return;
  }

  // Handle non-API requests (application shell)
  event.respondWith(
    // eslint-disable-next-line max-len
    caches.match(event.request).then((response) => response || fetch(event.request)),
  );
});
