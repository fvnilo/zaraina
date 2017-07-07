module.exports = {
  caches: {
    main: [
      'app.*.js',
      'index.html'
    ],
    optional: [
      ':rest:'
    ]
  },
  ServiceWorker: {
    events: true
  },
  AppCache: {
    events: true
  }
}