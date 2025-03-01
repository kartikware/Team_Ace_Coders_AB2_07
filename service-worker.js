// /service-worker.js
const CACHE_NAME = 'blood-finder-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/src/styles/global.css',
    '/src/scripts/app.js',
    '/src/scripts/firebase.js',
    '/src/scripts/auth.js',
    '/src/scripts/utils.js',
    '/src/pages/login.html',
    '/src/pages/profile_basic.html',
    '/src/pages/profile_personal.html',
    '/assets/images/blood_bottle.webp',
    '/assets/images/user_icon.webp',
    '/assets/images/user-icon.png',
    '/assets/icons/icon-192x192.png',
    '/assets/icons/icon-512x512.png',
    '/manifest.json',
    '/src/pages/signup.html',
    '/src/pages/requests.html',
    '/src/pages/dashboard.html'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)

            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => 
    {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached response if found, otherwise fetch from network
                return response || fetch(event.request);
            }).catch(() => {
                // Fallback to index.html for SPA navigation if offline
                return caches.match('/index.html');
            })
    );
});

self.addEventListener('activate', (event) =>
     {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => 
                    {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                }
            )
            );
        })
    );
});