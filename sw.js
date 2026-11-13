/* AHM7 Store service worker (v17.108) — offline shell + push notifications.
   Installed at /store/sw.js (scope /store/). Icons live beside it. */
const CACHE_NAME = "ahm7-store-v1";
const SHELL_URLS = ["/", "/store", "/store/index.html"];

// Cache the store shell on install (each URL on its own so one failure
// does not block the rest), then take over immediately.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.all(SHELL_URLS.map((u) => cache.add(u).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

// Drop old caches on activation.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch: API calls are network-first (never serve stale API data).
// Store shell + same-origin pages are network-first with a cached
// fallback so the store still opens when offline.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/v1/")) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({ ok: false, error: "offline" }), {
          headers: { "Content-Type": "application/json" },
        })
      )
    );
    return;
  }
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(event.request, copy))
            .catch(() => {});
          return res;
        })
        .catch(() =>
          caches.match(event.request).then((cached) => cached || caches.match("/store")).then(
            (cached) =>
              cached ||
              new Response("<h1>AHM7 Store</h1><p>You are offline. Please reconnect.</p>", {
                headers: { "Content-Type": "text/html" },
              })
          )
        )
    );
  }
});

// Push: show the notification from the payload (title/body/url).
self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { body: event.data ? event.data.text() : "" };
  }
  const title = data.title || "AHM7 Store";
  const body = data.body || "";
  const targetUrl = data.url || "/store";
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "icon-192.png",
      badge: "icon-192.png",
      data: { url: targetUrl },
    })
  );
});

// Tapping a notification closes it and opens/focuses the store.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || "/store";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ("focus" in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
    })
  );
});
