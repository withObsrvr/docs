import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Obsrvr Documentation site testing
 *
 * Environment variables:
 * - DOCS_URL: Base URL for the docs site (default: http://localhost:3000)
 */

const baseURL = process.env.DOCS_URL ?? 'http://localhost:3000';

export default defineConfig({
  testDir: './tests',

  // Test timeout
  timeout: 30_000,

  // Retry failed tests
  retries: process.env.CI ? 2 : 0,

  // Reporter configuration
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
  ],

  // Output directory for test artifacts
  outputDir: 'test-results',

  // Shared test configuration
  use: {
    baseURL,

    // Run tests headless
    headless: true,

    // Capture video on failure
    video: {
      mode: 'retain-on-failure',
      size: { width: 1280, height: 720 },
    },

    // Capture screenshots on failure
    screenshot: 'only-on-failure',

    // Capture trace for debugging
    trace: 'retain-on-failure',

    // Viewport size
    viewport: { width: 1280, height: 720 },
  },

  // Configure test projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Web server configuration for local testing
  webServer: {
    command: 'yarn serve',
    port: 3000,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});
