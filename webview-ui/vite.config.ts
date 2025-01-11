import { defineConfig, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';

interface ExtendedUserConfig extends UserConfigExport {
  test?: {
    globals?: boolean;
    environment?: string;
    setupFiles?: string[];
    coverage?: {
      provider?: string;
      reporter?: string[];
      reportsDirectory?: string;
      all?: boolean;
      include?: string[];
      exclude?: string[];
    };
  };
}

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/tests/**/*'
      ],
    },
  } as ExtendedUserConfig['test'],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
} as ExtendedUserConfig);
