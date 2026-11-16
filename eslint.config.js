/**
 * @file eslint.config.js
 * @description Flat ESLint configuration enforcing clean TypeScript code standards.
 */

export default [
  {
    ignores: [
      'dist/*',
      'dist-ssr/*',
      'node_modules/*',
      'scripts/*',
      '*.test.mjs'
    ]
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'prefer-const': 'error',
      'no-var': 'error'
    }
  }
];
