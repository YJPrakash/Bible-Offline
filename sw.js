if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('sw.js').then((registration) => {
			console.log("Service Worker registration successful: ", registration);
		}, (err) => {
			console.log("Registration failed", err);
		});
	});
}

let cache_name = location.host;

let urls_to_cache = [
	'/',
	'/images/favicon.ico',
	'/css/materialize.min.css',
	'/iconfont/material-icons.css',
	'/iconfont/MaterialIcons-Regular.eot',
	'/iconfont/MaterialIcons-Regular.woff2',
	'/iconfont/MaterialIcons-Regular.woff',
	'/iconfont/MaterialIcons-Regular.ttf',
	'/fetchData.js',
	'/main.js'
];

self.addEventListener('install', (e) => {
	e.waitUntil(caches.open(cache_name).then((cache) => {
		return cache.addAll(urls_to_cache);
	}));
});

self.addEventListener('fetch', (e) => {
	e.respondWith(caches.match(e.request).then((response) => {
		if (response)
			return response;
		else
			return fetch(e.request);
	}));
});