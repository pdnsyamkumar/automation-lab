import { test as baseTest } from '@playwright/test'
import { ContactUsTestData } from './contact-us.testdata'

export const testDataFixtures = baseTest.extend<TestDataTypes>({
  contactUsTestData: async ({}, use) => {
    await use(new ContactUsTestData())
  },
})

export interface TestDataTypes {
  contactUsTestData: ContactUsTestData
}
