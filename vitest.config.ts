import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: [
      'src/**/*.{test,spec}.{ts,tsx}',
      'webview-ui/src/**/*.{test,spec}.{js,jsx,ts,tsx}'
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/out/**'
    ],
    setupFiles: [
      './src/tests/setup.ts',
      './webview-ui/src/setupTests.ts'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      all: true,
      include: [
        'src/**/*.{ts,tsx}',
        'webview-ui/src/**/*.{js,jsx,ts,tsx}'
      ],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/tests/**/*',
        'webview-ui/**/*.test.{js,jsx,ts,tsx}'
      ]
    },
    root: path.resolve(__dirname, './'),
    resolveSnapshotPath: (testPath, snapExtension) => {
      return testPath.replace(/\.{ts,tsx,js,jsx}$/, snapExtension);
    },
    deps: {
      optimizer: {
        ssr: {
          external: ['vscode']
        }
      }
    },
    // Add global types for Vitest
    typecheck: {
      tsconfig: './tsconfig.json'
    }
  }
});
