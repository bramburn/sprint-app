import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        setupFiles: ['./src/setupTests.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov'],
            reportsDirectory: './coverage',
            all: true,
            include: ['src/**/*.ts'],
            exclude: [
                '**/index.ts',
                '**/*.d.ts',
                '**/*.test.ts',
                '**/*.spec.ts',
                '**/setupTests.ts'
            ],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
}); 