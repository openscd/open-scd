self.addEventListener('install', e => {
  console.log('Dev (dummy, non-caching) service worker installed');
});

self.addEventListener('fetch', e => {
  if ( e.request.url.match('^.*(/compas-scl-data-service/).*$')
    || e.request.url.match('^.*(/compas-cim-mapping/).*$')
    || e.request.url.match('^.*(/auth/).*$')
     ) {
    return false;
  }
  e.respondWith(fetch(e.request));
});

self.addEventListener('activate', e => {
  console.log('Dev (dummy, non-caching) service worker activated');
});
