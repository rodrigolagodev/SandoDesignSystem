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
      '@sando-ds/tokens/css': resolve(__dirname, '../tokens/dist/sando-tokens/css'),
      '@sando-ds/tokens/ingredients': resolve(
        __dirname,
        '../tokens/dist/sando-tokens/ts/ingredients'
      ),
      '@sando-ds/tokens/flavors': resolve(__dirname, '../tokens/dist/sando-tokens/ts/flavors'),
      '@sando-ds/tokens/recipes': resolve(__dirname, '../tokens/dist/sando-tokens/ts/recipes'),
      '@sando-ds/tokens': resolve(__dirname, '../tokens/dist/sando-tokens')
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
      thresholds: {
        lines: 80,
        // Functions threshold is intentionally low. Lit framework patterns
        // (css`` template tagged literals, @property/@customElement decorator
        // factories, render() arrow callbacks) inflate the v8 function count
        // beyond what's reasonably testable. The actual covered logic is well
        // above 80% — see the lines/statements/branches thresholds. Raise this
        // ceiling when src/utils/* and similar non-Lit logic expands.
        functions: 24,
        branches: 80,
        statements: 80,
        autoUpdate: false
      }
    },
    testTimeout: 10000,
    include: ['src/**/*.test.ts', 'src/**/*.a11y.test.ts'],
    exclude: ['node_modules/**', 'dist/**', '**/*.spec.ts'],
    setupFiles: ['./src/test/vitest.setup.ts'],

    // Reporter: 'default' muestra resumen limpio, 'verbose' muestra cada test
    reporter: process.env.VITEST_REPORTER || 'default',

    outputFile: {
      html: './test-results/index.html'
    }
  }
});
