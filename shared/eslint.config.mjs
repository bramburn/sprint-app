import baseConfig from '../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Add any shared-specific rules here
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
    },
  },
]; 