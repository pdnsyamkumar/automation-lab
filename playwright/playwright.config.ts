import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })
const baseURL = process.env.BASE_URL
  ? process.env.BASE_URL
  : 'https://automationexercise.com'

const commonOptions = [
  '--start-maximized',
  '--disable-web-security',
  '--allow-insecure-localhost',
  '--no-sandbox',
  '--ignore-certificate-errors',
]
// Launch Options for Playwright
const launchOptions = {
  args: commonOptions,
}

// Helper function to get browser device settings
const getBrowserDevice = () => {
  const browserType = process.env.BROWSER?.toLowerCase() || 'chromium'

  switch (browserType) {
    case 'edge':
      return {
        ...devices['Desktop Edge'],
        launchOptions: { ...launchOptions, channel: 'msedge' },
      }
    case 'chrome':
      return {
        ...devices['Desktop Chrome'],
        launchOptions: { ...launchOptions, channel: 'chrome' },
      }
    case 'safari':
    case 'webkit':
      return {
        ...devices['Desktop Safari'],
        launchOptions: { ...launchOptions },
      }
    case 'firefox':
      return {
        ...devices['Desktop Firefox'],
        launchOptions: { ...launchOptions },
      }
    case 'chromium':
    default:
      return {
        ...devices['Desktop Chrome'],
        launchOptions: { ...launchOptions },
      }
  }
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'always' }]],
  use: {
    trace: 'on',
    video: 'on',
    screenshot: 'on',
    testIdAttribute: 'data-qa',
    baseURL,
    viewport: { width: 1920, height: 1280 },
  },
  projects: [
    {
      name: 'auth',
      testMatch: '**/playwright/auth/**/*.spec.ts',
      testDir: '/playwright/auth',
      use: {
        ...getBrowserDevice(),
      },
    },
    {
      name: 'tests',
      testMatch: '**/playwright/tests/**/*.spec.ts',
      use: {
        ...getBrowserDevice(),
      },
    },
  ],
})
