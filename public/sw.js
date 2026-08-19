// ============================================================
// Oja Marketplace – Progressive Web App Service Worker
// Strategy:
//   • Pre-cached assets & offline route   ➜ Cache-first
//   • Static build assets (Next.js, icons) ➜ Cache-first
//   • Page Navigations                     ➜ Network-first with offline fallback
//   • Media / External Images              ➜ Stale-while-revalidate
// ============================================================

const CACHE_VERSION = 'v1.0.1';
const STATIC_CACHE = `oja-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `oja-dynamic-${CACHE_VERSION}`;

const PRECACHE_ASSETS = [
    '/',
    '/offline',
    '/manifest.json',
    '/favicon.ico',
    '/icons/android-chrome-192x192.png',
    '/icons/android-chrome-512x512.png',
    '/icons/apple-touch-icon.png',
];

// ── Install Event: Precache core shell assets ──────────────────
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_ASSETS))
    );
    self.skipWaiting();
});

// ── Activate Event: Clean up outdated caches ───────────────────
self.addEventListener('activate', (event) => {
    const validCaches = new Set([STATIC_CACHE, DYNAMIC_CACHE]);
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.filter((k) => !validCaches.has(k)).map((k) => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

// ── Fetch Event: Intelligent routing ─────────────────────────
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests and non-HTTP protocols
    if (request.method !== 'GET') return;
    if (!url.protocol.startsWith('http')) return;

    // Cross-origin control: allow same-origin or explicit assets (e.g. photos)
    if (url.origin !== self.location.origin && !url.hostname.includes('picsum.photos')) {
        return;
    }

    // Static assets (Next.js static files, icons, fonts) -> Cache-first
    if (isStaticAsset(url)) {
        event.respondWith(cacheFirst(request, STATIC_CACHE));
        return;
    }

    // HTML Navigation -> Network-first with offline fallback page
    if (request.mode === 'navigate') {
        event.respondWith(networkFirstNavigate(request));
        return;
    }

    // Dynamic resources -> Stale-while-revalidate
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
});

// ── Helper Functions ──────────────────────────────────────────

function isStaticAsset(url) {
    return (
        url.pathname.startsWith('/_next/static/') ||
        url.pathname.startsWith('/icons/') ||
        /\.(css|js|woff2?|ttf|otf|eot|ico|svg|png|jpg|jpeg|webp|gif|avif)$/i.test(url.pathname)
    );
}

async function cacheFirst(request, cacheName) {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        return new Response('Asset unavailable offline', { status: 503 });
    }
}

async function networkFirstNavigate(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        // 1. Try matching exact cached route
        const cachedRoute = await caches.match(request);
        if (cachedRoute) return cachedRoute;

        // 2. Fallback to precached offline page
        const offlinePage = await caches.match('/offline');
        if (offlinePage) return offlinePage;

        // 3. Fallback to home page shell
        const rootPage = await caches.match('/');
        if (rootPage) return rootPage;

        return new Response(
            '<html><body><h1>Offline</h1><p>Please check your connection.</p></body></html>',
            { headers: { 'Content-Type': 'text/html' }, status: 503 }
        );
    }
}

async function staleWhileRevalidate(request, cacheName) {
    const cached = await caches.match(request);
    const fetchPromise = fetch(request)
        .then((response) => {
            if (response.ok) {
                caches.open(cacheName).then((c) => c.put(request, response.clone()));
            }
            return response;
        })
        .catch(() => cached);
    return cached || fetchPromise;
}
