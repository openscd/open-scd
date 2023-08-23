module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc', 'import', 'html'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    // disable the rule for all files
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      "varsIgnorePattern": "_.*",
      "argsIgnorePattern": "_.*"
    }],
    'import/named': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': ['error', 'always', { ignorePackages: true }],
    'import/no-duplicates': 'off',
    'no-duplicate-imports': 'off',
    'tsdoc/syntax': 'warn'
  },
  "env": {
    "browser": true,
  }
};
