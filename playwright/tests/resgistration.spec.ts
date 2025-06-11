import { SignUpTestData } from '@testData/signup-test-data'
import { test, expect } from '@utilities/base-test'
import { LabelMessages } from '@utilities/enums'

test.describe('Registration', async () => {
  const signUpData = new SignUpTestData()
  const defaultSignUpData = signUpData.getSignUpData()

  test('Test Case 1: Register User', async ({
    homePage,
    page,
    signUpPage,
    topNavigationPage,
  }) => {
    await test.step(`Step 1: Launch browser`, async () => {})

    await test.step(`Step 2: Navigate to url 'https://automationexercise.com'`, async () => {
      await homePage.navigateToHomePage()
    })

    await test.step(`Step 3: Verify that home page is visible successfully`, async () => {
      await expect(homePage.getNavHomeLink()).toBeVisible()
      const url = await page.url()
      await expect(url).toContain('automationexercise.com')
    })

    await test.step(`Step 4: Click on Signup/Login button`, async () => {
      await signUpPage.getSignUp_LoginLink().click()
    })

    await test.step(`Step 5: Verify that 'New User Signup!' is visible`, async () => {
      await expect(signUpPage.getNewUserSignUpLabel()).toBeVisible()
      await expect(signUpPage.getNewUserSignUpLabel()).toHaveText(
        'New User Signup!'
      )
    })

    await test.step(`Step 6: Enter name and email address`, async () => {
      await signUpPage.fillNameAndEmailAddress(
        defaultSignUpData.name,
        defaultSignUpData.email
      )
    })

    await test.step(`Step 7: Click 'Signup' button`, async () => {
      await signUpPage.getSignUpButton().click()
    })

    await test.step(`Step 8: Verify that 'ENTER ACCOUNT INFORMATION' is visible`, async () => {
      await expect(signUpPage.getEnterAccountInfoLabel()).toBeVisible()
    })

    await test.step(`
            Step 9. Fill details: Title, Name, Email, Password, Date of birth
            Step 10. Select checkbox 'Sign up for our newsletter!'
            Step 11. Select checkbox 'Receive special offers from our partners!'`, async () => {
      await signUpPage.enterAccountInformation(defaultSignUpData)
    })

    await test.step(`Step 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number`, async () => {
      await signUpPage.fillAddressInformation(defaultSignUpData)
    })

    await test.step(`Step 13: Click 'Create Account' button`, async () => {
      await signUpPage.getCreateAccountButton().click()
    })

    await test.step(`Step 14: Verify that 'ACCOUNT CREATED!' is visible`, async () => {
      await expect(signUpPage.getAccountCreatedLabel()).toBeVisible()
      await expect(signUpPage.getAccountCreatedLabel()).toHaveText(
        LabelMessages.ACCOUNT_CREATED
      )
    })

    await test.step(`Step 15: Click 'Continue' button`, async () => {
      await signUpPage.getContinueButton().click()
    })

    await test.step(`Step 16: Verify that 'Logged in as username' is visible`, async () => {
      await expect(topNavigationPage).toHaveNavOption(
        `Logged in as ${defaultSignUpData.name}`
      )
    })

    await test.step(`Step 17. Click 'Delete Account' button`, async () => {
      await topNavigationPage.getNavOptionByLabel(`Delete Account`).click()
    })

    await test.step(`Step 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button`, async () => {
      await expect(signUpPage.getAccountDeletedLabel()).toBeVisible()
      await expect(signUpPage.getAccountDeletedLabel()).toHaveText(
        LabelMessages.ACCOUNT_DELETED
      )
      await signUpPage.getContinueButton().click()
    })
  })
})
