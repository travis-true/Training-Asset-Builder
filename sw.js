const CACHE_PREFIX = 'learning-asset-builder';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key.startsWith(CACHE_PREFIX)).map(key => caches.delete(key))
    ))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys => Promise.all(
        keys.filter(key => key.startsWith(CACHE_PREFIX)).map(key => caches.delete(key))
      )),
      self.registration.unregister(),
      self.clients.matchAll({ type: 'window' }).then(clients => Promise.all(
        clients.map(client => client.navigate(client.url))
      ))
    ])
  );
});
