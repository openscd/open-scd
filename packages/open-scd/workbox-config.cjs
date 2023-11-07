module.exports = {
  globDirectory: 'build/',
  globPatterns: [
    'public/**/*.{md,js,png,xml,pdf,css,html,info,json,ico,svg,wasm}',
    'src/**/*.{md,js,png,xml,pdf,css,html,info,json,ico,svg,wasm}',
    '*.{md,js,png,xml,pdf,css,html,info,json,ico,svg,wasm}',
  ],
  swDest: 'build/sw.js',
  runtimeCaching: [
    {
      urlPattern: /.*/,
      handler: 'NetworkFirst',
    },
  ],
  skipWaiting: true,
  inlineWorkboxRuntime: true,
};
