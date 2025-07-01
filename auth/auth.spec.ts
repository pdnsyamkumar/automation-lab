import { test, expect } from '@utilities/base-test'

test.describe('Auth Setup', () => {
  test('Auth Setup', async ({ page, homePage }) => {
    // await test.step(`Step 1: Launch browser`, async () => {})

    await test.step(`2: Navigate to url 'https://automationexercise.com'`, async () => {
      await homePage.navigateToHomePage()
    })

    await test.step(`3: Verify that home page is visible successfully`, async () => {
      await expect(homePage.getNavHomeLink()).toBeVisible()
    })

    await page
      .context()
      .storageState({ path: 'playwright/auth/guest-user.json' })
  })
})
