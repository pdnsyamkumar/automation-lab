import { faker } from '@faker-js/faker'
import { BaseTestData } from '@testData/base.testdata'

export interface ContactUsData {
  name: string
  email: string
  subject: string
  message: string
}

const defaultContactUsData: ContactUsData = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  subject: faker.lorem.words(3),
  message: faker.lorem.sentences(2),
}

export class ContactUsTestData extends BaseTestData {
  /**
   * Get contact us test data with optional overrides
   * @param overrides - Partial data to override default values
   * @returns ContactUsData with overridden values
   */
  getContactUsData(overrides?: Partial<ContactUsData>): ContactUsData {
    return this.getData(defaultContactUsData, overrides)
  }

  /**
   * Get contact us test data excluding specified fields
   * @param excludes - Array of fields to exclude from the data
   * @returns Partial<ContactUsData> with specified fields excluded
   */
  getContactUsDataWithExcludes(
    excludes: (keyof ContactUsData)[]
  ): Partial<ContactUsData> {
    return this.getDataWithExcludes(defaultContactUsData, excludes)
  }

  /**
   * Get contact us test data with specific overrides and exclusions
   * @param overrides - Partial data to override default values
   * @param excludes - Array of fields to exclude from the data
   * @returns Partial<ContactUsData> with overridden values and specified fields excluded
   */
  getContactUsDataWithOverridesAndExcludes(
    overrides: Partial<ContactUsData>,
    excludes: (keyof ContactUsData)[]
  ): Partial<ContactUsData> {
    return this.getDataWithOverridesAndExcludes(
      defaultContactUsData,
      overrides,
      excludes
    )
  }
}
