export default {
  packageOptions: {
    external: [
      '@web/dev-server-core',
      '@web/dev-server-esbuild',
      'esbuild',
      'crypto',
    ],
  },
  exclude: [
    '**/*.@(spec|test).@(js|mjs)',
    '**/test/**/*',
    '**/out-tsc/**/*',
    '**/.editorconfig',
    '**/.eslintrc.cjs',
    '**/.git/**/*',
    '**/.gitignore',
    '**/.idea/**/*',
    '**/.travis.yml',
    '**/package*',
    '**/tsconfig.json',
    '**/web-test-runner.config.mjs',
    '**/node_modules/**/*',
  ],
  workspaceRoot: '../../',
  mount: {
    './': '/',
    '../plugins/': '/plugins/',
    '../openscd/': '/openscd/',
    '../external-plugins/': '/external-plugins/',
  },
  alias: {
    '@openscd/open-scd': '../openscd/',
    '@openscd/plugins': '../plugins/',
  },
  buildOptions: {
    baseUrl: process.env.PUBLIC_URL || '/',
  },
};
