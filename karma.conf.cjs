/* eslint-disable import/no-extraneous-dependencies */
const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = config => {
  config.set(
    merge(createDefaultConfig(config), {
      coverageReporter: {
        dir: 'coverage',
        subdir: '.',
      },
      browserDisconnectTimeout: 20000,
      files: [
        // runs all files ending with .test in the test folder,
        // can be overwritten by passing a --grep flag. examples:
        //
        // npm run test -- --grep test/foo/bar.test.js
        // npm run test -- --grep test/bar/*
        {
          pattern: config.grep ? config.grep : 'out-tsc/**/test/**/*.test.js',
          type: 'module',
        },
      ],
      proxies: {
        '/public/': '/base/public/',
      },

      esm: {
        nodeResolve: true,
      },
      // you can overwrite/extend the config further
    })
  );
  return config;
};
