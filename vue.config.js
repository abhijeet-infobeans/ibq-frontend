module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: 'IB-Q App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      background_color: "#42b983",
      start_url: "/?utm_source=a2hs"
    },
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
        // swSrc is required in InjectManifest mode.
      swSrc: 'public/service-worker.js',
      // swDest: 'service-worker.js',
      // ...other Workbox options...
    }
  }
}