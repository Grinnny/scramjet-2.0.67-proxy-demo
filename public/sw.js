importScripts("/controller/controller.sw.js");

const { route, shouldRoute } = $scramjetController;

self.addEventListener("fetch", (event) => {
    if (shouldRoute(event)) {
        event.respondWith(route(event));
    }
});