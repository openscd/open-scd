/* eslint-disable import/no-extraneous-dependencies */
const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');
// process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = config => {
  config.set(
    merge(
      createDefaultConfig(config),
      {
        browserDisconnectTimeout: 20000,
        files: [
          'public/js/xmllint.js',
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

        esm: {
          nodeResolve: true,
        },
        // you can overwrite/extend the config further
      }
    )
  );
  return config;
};
