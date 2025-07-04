import { test as baseTest } from '@playwright/test'
import { ContactUsTestData } from '@testData/contact-us.testdata'
import { SignUpTestData } from '@testData/signup.testdata'

export const testDataFixtures = baseTest.extend<TestDataTypes>({
  signupTestData: async ({}, use) => {
    await use(new SignUpTestData())
  },

  contactUsTestData: async ({}, use) => {
    await use(new ContactUsTestData())
  },
})

export interface TestDataTypes {
  signupTestData: SignUpTestData
  contactUsTestData: ContactUsTestData
}
