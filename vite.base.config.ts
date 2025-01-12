import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        entryFileNames: `[name].[hash].js`,
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `[name].[hash].[ext]`
      }
    }
  },
  resolve: {
    alias: {
      '@sprint-app/shared': path.resolve(__dirname, './shared/src'),
      '@sprint-app/webview-settings': path.resolve(__dirname, './webview-settings/src'),
      '@sprint-app/webview-sidebar': path.resolve(__dirname, './webview-sidebar/src')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './shared/src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
});
