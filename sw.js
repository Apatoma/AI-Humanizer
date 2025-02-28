const CACHE_NAME = 'ai-humanizer-v3';
const ASSETS = [
    './',
    './index.html',
    './css/main.css',
    './css/animations.css',
    './js/main.js',
    './js/textProcessor.js',
    './js/uiManager.js',
    './js/textWorker.js',
    './404.html'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('fetch', (e) => {
    if (e.request.url.includes('/js/textWorker.js')) {
        e.respondWith(fetch(e.request));
        return;
    }

    e.respondWith(
        caches.match(e.request)
            .then(response => response || fetch(e.request))
    );
});
