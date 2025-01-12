import { defineConfig, mergeConfig } from 'vite';
import baseConfig from '../vite.base.config';
import path from 'path';

export default mergeConfig(baseConfig, defineConfig({
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './src'),

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
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'SharedLibrary',
      fileName: (format) => `index.${format}.js`
    }
  }
}));
