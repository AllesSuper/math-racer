// Retire the previous Math Racer offline cache when replacing the game.
// Requests pass through to the network; saved learning progress is untouched.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith('math-racer-')).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});
