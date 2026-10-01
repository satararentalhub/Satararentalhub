const CACHE_NAME = "satara-rental-hub-v3";
const urlsToCache = [
  "/Satararentalhub/",
  "/Satararentalhub/index.html",
  "/Satararentalhub/listing.html",
  "/Satararentalhub/details.html",
  "/Satararentalhub/owner_dashboard.html",
  "/Satararentalhub/admin_dashboard.html",
  "/Satararentalhub/saved.html",
  "/Satararentalhub/about_us.html",
  "/Satararentalhub/Logo.png",
  "/Satararentalhub/background.png",
  "/Satararentalhub/firebase-config.js",
  "/Satararentalhub/lang.js"
];

// Install Event: Caching Core Assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Fetch Event: Serve from Cache or Network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          (response) => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                if (event.request.url.indexOf('firestore') === -1) {
                  cache.put(event.request, responseToCache);
                }
              });
            return response;
          }
        );
      })
  );
});

// Activate Event: Clear Old Caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
