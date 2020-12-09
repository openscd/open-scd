const cacheName = 'open-scd-v1';

self.addEventListener('install', e => {
  console.log('[Service Worker] installed');
});

self.addEventListener('fetch', e => {
  /* // uncomment to activate caching for offline installation
  e.respondWith(
    caches.match(e.request).then(r => {
      return (
        r ||
        fetch(e.request).then(response => {
          return caches.open(cacheName).then(cache => {
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
  */
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
