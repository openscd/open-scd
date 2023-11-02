self.addEventListener('install', () => {
  console.log('Dev (dummy, non-caching) service worker installed');
});

self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});

self.addEventListener('activate', () => {
  console.log('Dev (dummy, non-caching) service worker activated');
});
