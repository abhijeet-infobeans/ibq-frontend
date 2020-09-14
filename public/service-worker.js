// This is custom service worker !!!
self.importScripts('/swHelper/sw-utility.js');

if(typeof workbox !== 'undefined') {
    /**
     * apply precaching. In the built version, the precacheManifest will
     * be imported using importScripts (as is workbox itself) and we can
     * precache this. This is all we need for precaching
     */
    workbox.core.setCacheNameDetails({prefix: "ibq-f"});
    // self.__precacheManifest = [].concat(self.__precacheManifest || []);
    // workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
    workbox.precaching.precacheAndRoute(self.__precacheManifest);


    /**
     * Make sure to return a specific response for all navigation requests.
     * Since we have a SPA here, this should be index.html always.
     * https://stackoverflow.com/questions/49963982/vue-router-history-mode-with-pwa-in-offline-mode
     * alternate way to handle it add the following code in vue.config.js not worked
         workboxOptions: {
            navigateFallback: 'index.html'
         }
     */
    // Offline mode for the whole application not only the login page
    workbox.routing.registerNavigationRoute(
        // '/index.html' has been precached with the script above,
        // look up its corresponding cache key.
        workbox.precaching.getCacheKeyForURL('/index.html')
    );


    workbox.routing.registerRoute(/.*(?:googleapis|gstatic)\.com.*$/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts',
            plugins: [
                new workbox.expiration.Plugin({
                    // Only cache requests for a week
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                    // Only cache 10 requests.
                    maxEntries: 10,
                }),
            ],
        }));
    /**
     * cache version of storing project list api response
     */
    workbox.routing.registerRoute(/.*(?:projectList)\.*$/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'project-list'
        })
    );
    /**
     * BackgroundSync
     */
    const bgSyncPlugin = new workbox.backgroundSync.Plugin('IBQF-add-project-queue', {
        maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
    });

    workbox.routing.registerRoute(
        /.*(?:addProject)\.*$/,
        new workbox.strategies.NetworkOnly({
            plugins: [bgSyncPlugin]
        }),
        'POST'
    );
    // TODO: need to revisit it as indexedDB is not yet to be explored in vuejs
    /* workbox.routing.registerRoute(/.*(?:projectList)\.*$/, function(args) {
        self.console.log('Is---here??', args)
        return fetch(args.event.request)
            .then(function (res) {
                let clonedRes = res.clone();
                clearAllData('projects')
                    .then(function () {
                        return clonedRes.json();
                    })
                    .then(function (data) {
                        for (let key in data) {
                            writeData('projects', data[key])
                        }
                    });
                return res;
            }).catch((error) => {
                console.log(error)
            });
    });*/
}

/**
 * Other variation
 * //If workbox available
 if ('undefined' !== typeof workbox) {
    workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

    workbox.routing.registerRoute(
        new RegExp('/static/'),
        new workbox.strategies.StaleWhileRevalidate()
    );

    // Offline mode for the whole application not only the login page
    workbox.routing.registerNavigationRoute(
        // '/index.html' has been precached with the script above,
        // look up its corresponding cache key.
        workbox.precaching.getCacheKeyForURL('/index.html')
    );
}
 */