const CACHE_NAME = 'ai-humanizer-v1';
const ASSETS = [
    './',
    './index.html',
    './css/main.css',
    './css/animations.css',
    './js/main.js',
    './js/textProcessor.js',
    './js/uiManager.js',
    './js/textWorker.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then(response => response || fetch(e.request))
    );
});