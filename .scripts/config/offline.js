module.exports = {
  publicPath: '/',
  caches: {
    main: [
      'app.*.js'
    ],
    additional: [
      ':externals:'
    ],
    optional: [
      ':rest:'
    ]
  },
  externals: [
    '/',
    'icons/launcher-zaraina-48x48.png',
    'icons/launcher-zaraina-72x72.png',
    'icons/launcher-zaraina-96x96.png',
    'icons/launcher-zaraina-144x144.png',
    'icons/launcher-zaraina-192x192.png'
  ],
  ServiceWorker: {
    navigateFallbackURL: '/'
  },
  safeToUseOptionalCaches: true
}