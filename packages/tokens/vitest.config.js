import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test environment
    environment: 'node',

    // Global setup/teardown
    globals: true,

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'json'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/**',
        'dist/**',
        'tests/**',
        '**/*.test.js',
        '**/*.spec.js',
        'vitest.config.js'
      ],
      include: [
        'src/**/*.json',
        'build/**/*.js'
      ],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    },

    // Test timeout
    testTimeout: 10000,

    // Include patterns
    include: [
      'tests/**/*.{test,spec}.{js,ts}'
    ],

    // Exclude patterns
    exclude: [
      'node_modules/**',
      'dist/**'
    ],

    // Reporter - 'default' shows summary, 'verbose' shows all tests, 'dot' is minimal
    reporter: process.env.CI ? ['default', 'html'] : ['default'],

    // Output files
    outputFile: {
      html: './test-results/index.html',
      json: './test-results/results.json'
    },

    // Watch mode
    watch: false
  }
});
