export default {
  plugins: ['@snowpack/plugin-typescript'],
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
  },
  alias: {
    '@openscd/open-scd': '../open-scd/src/',
    '@openscd/plugins': '../plugins/',
  },
};
