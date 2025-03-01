self.addEventListener("install", (event) => {
  console.log("Service Worker Installed!");
  event.waitUntil(
    caches.open("app-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/pages/login.html",
        "/pages/profile_page.html",
        "/css/styles.css",
        "/js/script.js",
        "/manifest.json",
        "/assets/icons/icon-192x192.png",
        "/assets/icons/icon-512x512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
