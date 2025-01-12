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
    outDir: '../out/shared', // Output directory
    emptyOutDir: true,       // Clear the output directory before building

    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // Entry point
      name: 'SharedLibrary',                         // Global variable for UMD builds
      fileName: () => `index.js`                     // Fixed file name for all formats
    },

    rollupOptions: {
      output: {
        entryFileNames: `index.js`,     // Use a single file name for the entry point
        chunkFileNames: `index.js`,     // Use a single file name for chunks
        assetFileNames: `[name].[ext]`  // Keep asset names clean (e.g., styles.css)
      }
    }
  }
}));
