import { test, expect } from '@utilities/base-test'

test.describe('Contact Us Page', () => {
  test(
    'Case 6: Contact Us Form',
    { tag: [`@ContactUs`] },
    async ({ contactUsPage, contactUsTestData, homePage }) => {
      await test.step(`1: Launch browser`, async () => {})

      await test.step(`2: Navigate to url 'https://automationexercise.com'
      Step 3: Verify that home page is visible successfully`, async () => {
        await homePage.navigateToHomePage()
        await expect(homePage.getNavHomeLink()).toBeVisible()
      })

      await test.step(`4: Click on 'Contact Us' button
Step 5: Verify 'GET IN TOUCH' is visible`, async () => {
        await contactUsPage.navigateToContactUsPage()
        await expect(contactUsPage.getGetInTouchTitle()).toBeVisible()
      })

      await test.step(`6: Enter name, email, subject and message`, async () => {
        await contactUsPage.fillContactForm(
          contactUsTestData.getContactUsData()
        )
      })

      await test.step(`7: Upload file`, async () => {
        await contactUsPage.uploadFile('test-files', 'sample.pdf')
      })

      await test.step(`8: Click 'Submit' button
Step 9: Click OK button
Step 10: Verify success message 'Success! Your details have been submitted successfully.' is visible`, async () => {
        await contactUsPage.submitContactUsForm()
        await expect(contactUsPage.getSuccessMessage()).toBeVisible()
        await expect(contactUsPage.getSuccessMessage()).toHaveText(
          'Success! Your details have been submitted successfully.'
        )
      })

      await test.step(`11: Click 'Home' button and verify that landed to home page successfully`, async () => {
        await contactUsPage.getHomeButton().click()
        await expect(homePage.getNavHomeLink()).toBeVisible()
      })
    }
  )
})
