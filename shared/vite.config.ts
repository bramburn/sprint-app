import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './src'),
      '@shared/react': path.resolve(__dirname, './src/react'),
      '@shared/dist': path.resolve(__dirname, './dist'),
      '@extension': path.resolve(__dirname, '../src'),
      '@webview': path.resolve(__dirname, '../webview-settings/src'),
      '@sidebar': path.resolve(__dirname, '../webview-sidebar/src')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: '../out/shared/coverage'
    },
    outputFile: {
      junit: '../out/shared/junit.xml'
    }
  },
  build: {
    outDir: '../out/shared',
    emptyOutDir: true
  }
});
