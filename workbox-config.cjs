module.exports = {
  cacheId: 'compas',
  globDirectory: 'build/',
  globPatterns: [
    '_snowpack/**/*.{md,js,png,xml,pdf,css,html,info,json,ico,svg,wasm}',
    'public/**/*.{md,js,png,xml,pdf,css,html,info,json,ico,svg,wasm}',
    'src/**/*.{md,js,png,xml,pdf,css,html,info,json,ico,svg,wasm}',
    '*.{md,json,ico,xml}',
  ],
  swDest: 'build/sw.js',
  runtimeCaching: [
    {
      urlPattern: /\/(_snowpack|public|src)\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'compas-runtime-http',
        fetchOptions: {
          credentials: 'include',
        },
      }
    },
  ],
  skipWaiting: true,
  inlineWorkboxRuntime: true,
  cleanupOutdatedCaches: true,
};
