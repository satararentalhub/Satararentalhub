const CACHE_NAME = "satara-rental-hub-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/listing.html",
  "/details.html",
  "/owner_dashboard.html",
  "/admin_dashboard.html",
  "/saved.html",
  "/about_us.html",
  "/Logo.png",
  "/background.png",
  "/firebase-config.js",
  "/lang.js"
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
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          (response) => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                // कॅशमध्ये नवीन फाईल सेव्ह करा (Firebase डेटा कॅश करू नका)
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
