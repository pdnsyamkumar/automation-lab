import { SignUpTestData } from '@testData/signup.testdata'
import { test, expect } from '@utilities/base-test'
import { LabelMessages } from '@utilities/enums'

test.describe('Registration', () => {
  const signUpData = new SignUpTestData()
  const signUpDataForUI = signUpData.getSignUpDataForUI()

  test.beforeEach('Navigate to Automation Exercise', async ({ homePage }) => {
    await test.step(`1: Launch browser`, async () => {})

    await test.step(`2: Navigate to url 'https://automationexercise.com'`, async () => {
      await homePage.navigateToHomePage()
      await expect(homePage.getNavHomeLink()).toBeVisible()
    })
  })

  test(
    'Case 1: Register User',
    { tag: [`@Registration`] },
    async ({ homePage, page, signUpPage, topNavigationPage }) => {
      await test.step(`1: Launch browser`, async () => {})

      await test.step(`2: Navigate to url 'https://automationexercise.com'`, async () => {
        await homePage.navigateToHomePage()
      })

      await test.step(`3: Verify that home page is visible successfully`, async () => {
        await expect(homePage.getNavHomeLink()).toBeVisible()
        const url = page.url()
        expect(url).toContain('automationexercise.com')
      })

      await test.step(`4: Click on Signup/Login button`, async () => {
        await signUpPage.getSignUp_LoginLink().click()
      })

      await test.step(`5: Verify that 'New User Signup!' is visible`, async () => {
        await expect(signUpPage.getNewUserSignUpLabel()).toBeVisible()
        await expect(signUpPage.getNewUserSignUpLabel()).toHaveText(
          'New User Signup!'
        )
      })

      await test.step(`6: Enter name and email address`, async () => {
        await signUpPage.fillNameAndEmailAddress({
          name: signUpDataForUI.name,
          email: signUpDataForUI.email,
        })
      })

      await test.step(`7: Click 'Signup' button`, async () => {
        await signUpPage.getSignUpButton().click()
      })

      await test.step(`8: Verify that 'ENTER ACCOUNT INFORMATION' is visible`, async () => {
        await expect(signUpPage.getEnterAccountInfoLabel()).toBeVisible()
      })

      await test.step(`9. Fill details: Title, Name, Email, Password, Date of birth
Step 10. Select checkbox 'Sign up for our newsletter!'
Step 11. Select checkbox 'Receive special offers from our partners!'`, async () => {
        await signUpPage.fillAccountInformation(signUpDataForUI)
      })

      await test.step(`12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number`, async () => {
        await signUpPage.fillAddressInformation(signUpDataForUI)
      })

      await test.step(`13: Click 'Create Account' button`, async () => {
        await signUpPage.getCreateAccountButton().click()
      })

      await test.step(`14: Verify that 'ACCOUNT CREATED!' is visible`, async () => {
        await expect(signUpPage.getAccountCreatedLabel()).toBeVisible()
        await expect(signUpPage.getAccountCreatedLabel()).toHaveText(
          LabelMessages.ACCOUNT_CREATED
        )
      })

      await test.step(`15: Click 'Continue' button`, async () => {
        await signUpPage.getContinueButton().click()
      })

      await test.step(`16: Verify that 'Logged in as username' is visible`, async () => {
        await expect(topNavigationPage).toHaveNavOption(
          `Logged in as ${signUpDataForUI.name}`
        )
      })

      await test.step(`17. Click 'Delete Account' button`, async () => {
        await topNavigationPage.getNavOptionByLabel(`Delete Account`).click()
      })

      await test.step(`18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button`, async () => {
        await expect(signUpPage.getAccountDeletedLabel()).toBeVisible()
        await expect(signUpPage.getAccountDeletedLabel()).toHaveText(
          LabelMessages.ACCOUNT_DELETED
        )
        await signUpPage.getContinueButton().click()
      })
    }
  )

  test('Case 3: Login User with incorrect email and password', async ({
    signUpPage,
    loginPage,
  }) => {
    await test.step(`4: Click on Signup/Login button
Step 5: Verify 'Login to your account' is visible`, async () => {
      await signUpPage.getSignUp_LoginLink().click()
      await expect(loginPage.getLoginLabel()).toBeVisible()
    })

    await test.step(`6: Enter incorrect email address and password`, async () => {
      await loginPage.fillLoginForm({
        email: 'incorrect@gmail.com',
        password: 'incorrectPassword@123',
      })
    })

    await test.step(`7: Click 'login' button`, async () => {
      await loginPage.clickOnLoginButton()
    })

    await test.step(`8: Verify error 'Your email or password is incorrect!' is visible`, async () => {
      await expect(loginPage.getErrorMessage()).toBeVisible()
      await expect(loginPage.getErrorMessage()).toHaveText(
        'Your email or password is incorrect!'
      )
    })
  })
})
