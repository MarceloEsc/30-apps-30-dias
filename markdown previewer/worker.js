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
            './app.js',
            './FileSaver.js',
            './worker.js',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css',
            'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
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