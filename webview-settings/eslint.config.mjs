import baseConfig from '../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Add any webview-settings-specific rules here
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
]; 