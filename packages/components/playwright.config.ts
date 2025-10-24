import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for E2E and visual regression testing
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Test directory - now looking for .spec.ts files in component folders
  testDir: './src/components',
  testMatch: '**/*.spec.ts',

  // Maximum time one test can run
  timeout: 30000,

  // Maximum time for expect() assertions
  expect: {
    timeout: 5000
  },

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'test-results/e2e-report' }],
    ['list'],
    process.env.CI ? ['github'] : ['list']
  ],

  // Shared settings for all projects
  use: {
    // Base URL points to Storybook for component testing
    baseURL: 'http://localhost:6006',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure'
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    // Mobile viewports
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    }
  ],

  // E2E tests run against Storybook stories for visual/interaction testing
  webServer: {
    command: 'pnpm --filter @sando/docs dev',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  },

  // Output folder for test results
  outputDir: 'test-results/e2e-artifacts'
});
