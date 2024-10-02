const js = require('@eslint/js');
const { FlatCompat } = require('@eslint/eslintrc');
const globals = require('globals');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = [
  {
    ignores: [
      '**/dist/',
      'node_modules/',
      '.github/',
      'package.json',
      'package-lock.json',
    ],
  },
  ...compat.extends('eslint:recommended', 'prettier'),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },

      ecmaVersion: 2018,
      sourceType: 'commonjs',
    },
  },
];
