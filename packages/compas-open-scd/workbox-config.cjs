const packageJson = require('./package.json');

module.exports = {
  cacheId: `compas-${packageJson.version}`,
  globDirectory: 'build/',
  globPatterns: [
    '_snowpack/**/*.{md,js,png,xml,pdf,css,html,info,json,ico,svg,wasm}',
    'public/**/*.{md,js,png,xml,pdf,css,html,info,json,ico,svg,wasm}',
    'src/**/*.{md,js,png,xml,pdf,css,html,info,json,ico,svg,wasm}',
    'plugins/**/*.{md,js,png,xml,pdf,css,html,info,json,ico,svg,wasm}',
    'external-plugins/**/*.{md,js,png,xml,pdf,css,html,info,json,ico,svg,wasm}',
    '*.{md,json,ico,xml}',
    'package.json.proxy.js',
  ],
  globIgnores: [
    'public/nsdoc/README.md'
  ],
  swDest: 'build/sw.js',
  runtimeCaching: [
    {
      urlPattern: /package\.json\.proxy\.js$/,
      handler: 'NetworkFirst',
    },
    {
      urlPattern: /\/(_snowpack|public|src)\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'compas-runtime-http',
        fetchOptions: {
          credentials: 'include',
        },
      },
    },
  ],
  skipWaiting: true,
  clientsClaim: true,
  inlineWorkboxRuntime: true,
  cleanupOutdatedCaches: true,
};
