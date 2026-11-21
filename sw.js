// Service worker — ERC South Sinai branch site
// Strategy: cache-first for the site shell and static assets so the
// first-aid section and emergency numbers work offline after first visit.
// Map tiles and API calls are never cached (always live).
const CACHE = "erc-ss-v1";
const CORE = ["/", "/index.html", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // Never cache: map tiles, Supabase, external APIs
  if (
    url.hostname.includes("tile.openstreetmap.org") ||
    url.hostname.includes("arcgisonline.com") ||
    url.hostname.includes("supabase.co") ||
    url.hostname.includes("open-meteo.com")
  ) {
    return;
  }
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && url.origin === self.location.origin) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
