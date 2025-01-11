/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/react-setup.ts'],
    include: ['src/**/*.{test,spec}.{tsx,ts}'],
    exclude: [
      'node_modules/**',
      'dist/**',
      '../src/**' // Exclude parent extension tests
    ],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'src/tests/**'
      ]
    },
    poolOptions: {
      threads: {
        singleThread: true,
      },
      forks: {
        singleFork: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});