import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  server: {
    host: '127.0.0.1',
    strictPort: false,
    hmr: {
      protocol: 'ws',
      host: '127.0.0.1'
    }
  },
  resolve: {
    alias: {
      '@sando/tokens/css': resolve(__dirname, '../tokens/dist/sando-tokens/css'),
      '@sando/tokens/ingredients': resolve(__dirname, '../tokens/dist/sando-tokens/ts/ingredients'),
      '@sando/tokens/flavors': resolve(__dirname, '../tokens/dist/sando-tokens/ts/flavors'),
      '@sando/tokens/recipes': resolve(__dirname, '../tokens/dist/sando-tokens/ts/recipes'),
      '@sando/tokens': resolve(__dirname, '../tokens/dist/sando-tokens')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/*.a11y.test.ts',
        '**/*.stories.ts',
        '**/*.types.ts'
      ],
      include: ['src/**/*.ts'],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    },
    testTimeout: 10000,
    include: ['src/**/*.test.ts', 'src/**/*.a11y.test.ts'],
    exclude: ['node_modules/**', 'dist/**', '**/*.spec.ts'],

    // Reporter: 'default' muestra resumen limpio, 'verbose' muestra cada test
    reporter: process.env.VITEST_REPORTER || 'default',

    outputFile: {
      html: './test-results/index.html'
    }
  }
});
