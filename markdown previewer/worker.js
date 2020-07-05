var CACHE = 'network-or-cache';
self.addEventListener('install', (evt) => {
    console.log('The service worker is being installed.');

    evt.waitUntil(precache())
});


self.addEventListener('fetch', (evt) => {
    console.log('The service worker is serving the asset.');

    evt.respondWith(fromNetwork(evt.request, 100).catch(() => {
        return fromCache(evt.request);
    }));
});

function precache() {
    return caches.open(CACHE).then((cache) => {
        return cache.addAll([
            './index.html',
            './style.css',
            './github.markdown.css',
            './manifest.json',
            './images/icon72.png',
            './images/icon144.png',
            './app.js',
            './FileSaver.js',
            './worker.js',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css',
            'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
            'https://fonts.googleapis.com/css2?family=Anton&family=Roboto+Mono:wght@500&display=swap',
            'https://fonts.gstatic.com/s/anton/v11/1Ptgg87LROyAm3Kz-C8.woff2',
            'https://fonts.gstatic.com/s/robotomono/v11/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_7Pq_ROW4.woff2',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/webfonts/fa-regular-400.woff2',
        ]);
    });
}

function fromNetwork(request, timeout) {
    return new Promise((fulfill, reject) => {
        var timeoutId = setTimeout(reject, timeout);

        fetch(request).then((response) => {
            clearTimeout(timeoutId);
            fulfill(response);
        }, reject);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then((cache) => {
        return cache.match(request).then((matching) => {
            return matching || Promise.reject('no-match');
        });
    });
}