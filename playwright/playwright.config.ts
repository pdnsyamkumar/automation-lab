import { defineConfig, devices } from '@playwright/test'
const baseURL = process.env.BASE_URL
  ? process.env.BASE_URL
  : 'https://automationexercise.com'
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'always' }]],
  use: {
    trace: 'on-first-retry',
    testIdAttribute: 'data-qa',
    baseURL,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
})
