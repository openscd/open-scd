// import { playwrightLauncher } from '@web/test-runner-playwright';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';


export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  /** we run test directly on TypeScript files */
  plugins: [esbuildPlugin({ ts: true })],

  /** Resolve bare module imports */
  nodeResolve: true,

  /** filter browser logs
   * Plugins have a fix URL and do not fit to the file structure in test environment.
   * Creating open-scd in the tests leads to error in the browser log - we had to disable the browser log
  */
  browserLogs: false,

  /** specify groups for unit and integrations tests
   * hint: no --group definition runs all groups
  */
  groups: [
    {
      name: 'unit',
      files: 'test/unit/**/*.test.ts',
    },
    {
      name: 'integration',
      files: 'test/integration/**/*.test.ts',
    },
    // {
    //   name: 'single',
    //   files: 'test/integration/validators/ValidateTemplates.test.ts',
    // },
  ],

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto',

  /** Amount of browsers to run concurrently */
  // concurrentBrowsers: 2,

  /** Amount of test files per browser to test concurrently */
  // concurrency: 1,

  /** Browsers to run tests on */
  browsers: [
    playwrightLauncher({
      // concurrency: 1,
      product: 'chromium',
      launchOptions: {
        headless: true,
        devtools: false,
      },
    }),
    // playwrightLauncher({ product: 'firefox' }),
    // playwrightLauncher({ product: 'webkit' }),
  ],

  // See documentation for all available options
});
