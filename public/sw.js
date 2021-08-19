// src/sw.js

const CACHE_NAME = "moviedb_cache_v3";
var urlsToCache = [
	"/"
];

self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache) {
				console.log("cache opened");
				return cache.addAll(urlsToCache);
			})
	);
});

self.addEventListener("fetch", function(event) {
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
				if (response) return response;
				return fetch(event.request);
			})
	);
});
