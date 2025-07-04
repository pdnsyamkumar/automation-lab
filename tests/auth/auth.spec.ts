import { test, expect } from '@utilities/base-test'

test.describe('Auth Setup', () => {
  test('Auth Setup', async ({ page, homePage }) => {
    await test.step(`Launch browser & Navigate to url 'https://automationexercise.com'`, async () => {
      await homePage.navigateToHomePage()
    })

    await test.step(`Verify that home page is visible successfully`, async () => {
      await expect(homePage.getNavHomeLink()).toBeVisible()
    })

    await page
      .context()
      .storageState({ path: 'playwright/auth/guest-user.json' })
  })
})
