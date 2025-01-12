import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
      '@shared/react': path.resolve(__dirname, '../shared/react'),
      '@shared/dist': path.resolve(__dirname, '../shared/dist'),
      '@webview': path.resolve(__dirname, '../webview-settings/src'),
      '@sidebar': path.resolve(__dirname, '../webview-sidebar/src'),
      '@extension': path.resolve(__dirname, '../src')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  build: {
    outDir: '../out/webview-settings',
    emptyOutDir: true,
    rollupOptions: {
      input: './index.html',
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
        manualChunks: undefined
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
    setupFiles: './src/setupTests.ts'
  }
});
