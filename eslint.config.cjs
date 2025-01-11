const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const vitest = require('eslint-plugin-vitest');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'vitest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:vitest/recommended'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  }
}; 