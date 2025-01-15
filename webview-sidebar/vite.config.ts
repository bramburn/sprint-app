  import { defineConfig, mergeConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import baseConfig from '../vite.base.config';
import path from 'path';

// https://vitejs.dev/config/
export default mergeConfig(baseConfig as UserConfig, defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@sprint-app/shared': path.resolve(__dirname, '../shared/src'),
      '@sprint-app/webview-settings': path.resolve(__dirname, '../webview-settings/src'),
      '@sprint-app/webview-sidebar': path.resolve(__dirname, '../webview-sidebar/src'),
      '@webview': path.resolve(__dirname, '../webview-ui/src'),
      '@sidebar': path.resolve(__dirname, '../webview-sidebar/src'),
      '@extension': path.resolve(__dirname, '../src')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  build: {
    outDir: '../out/webview-sidebar',
    emptyOutDir: true,
    rollupOptions: {
      input: './index.html',
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
        manualChunks: () => 'everything',
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    outputFile: {
      junit: '../out/webview-sidebar/junit.xml'
    },
    coverage: {
      reportsDirectory: '../out/webview-sidebar/coverage'
    }
  }
}) as UserConfig);
