import { test as setup, expect } from '@utilities/base-test'

setup('Auth Setup for Guest User', async ({ page, homePage }) => {
  // Navigate to the home page
  await homePage.navigateToHomePage()

  // Check if the home page is visible
  await expect(homePage.getNavHomeLink()).toBeVisible()

  // Storage state for guest user
  await page.context().storageState({ path: 'playwright/auth/guest-user.json' })
})
