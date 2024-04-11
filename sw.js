/* 

This is the service worker in which will process all requests, send it over to the analytics server, and handle all defined HTTP errors.

*/


// async function handleRequest(url) {
//   try {
//     var cFetch = await fetch(url);
//     var responseHTML = await cFetch.text();

//     var headers = Object.assign({}, cFetch.rawHeaders);

    
//   } catch (e) {
    
//   }
// }

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("Memblu").then((cache) => {
      return cache.addAll(["/assets/404.html", "/assets/offline.html"]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const cache = await caches.open("Memblu");
      const cached = await cache.match(e.request);

      if (cached) console.log(cached);
    })()
  );
});