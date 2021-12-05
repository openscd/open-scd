// import { playwrightLauncher } from '@web/test-runner-playwright';


export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  /** Test files to run */
  files: 'out-tsc/test/**/*.test.js',

  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: [],
  },

  /** filter browser logs*/
  browserLogs: false,


  /** unit tests in a specific group */
  groups: [
    {
      name: 'unit',
      files: 'out-tsc/test/unit/**/*.test.js',
    },
    {
      name: 'integration',
      files: 'out-tsc/test/integration/**/*.test.js',
    },
  ],
  
  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto',

  /** Amount of browsers to run concurrently */
  // concurrentBrowsers: 2,

  /** Amount of test files per browser to test concurrently */
  // concurrency: 1,

  /** Browsers to run tests on */
  // browsers: [
  //   playwrightLauncher({ product: 'chromium' }),
  //   playwrightLauncher({ product: 'firefox' }),
  //   playwrightLauncher({ product: 'webkit' }),
  // ],

  // See documentation for all available options
});
