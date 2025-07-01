import { faker } from '@faker-js/faker'
import { BaseTestData } from '@testData/base.testdata'
import { NamePrefix, Country } from '@utilities/enums'

export interface DOB {
  day: string
  month: string
  year: string
}

export interface AccountInformation {
  namePrefix: NamePrefix
  name: string
  email: string
  password: string
  dateOfBirth: DOB
  signUpForOurNewsLetter: boolean
  receiveSpecialOffersFromOurPartners: boolean
}

export interface AddressInformation {
  firstName: string
  lastName: string
  company: string
  address: string
  address2: string
  country: string
  state: string
  city: string
  zipCode: string
  mobileNumber: string
}

export interface SignUpDataForUI
  extends AccountInformation,
    AddressInformation {}

export interface SignUpDataForAPI {
  [key: string]: string | NamePrefix
  title: string
  name: string
  email_address: string
  password: string
  days: string
  months: string
  years: string
  newsletter: string
  optin: string
  first_name: string
  last_name: string
  company: string
  address1: string
  address2: string
  country: string
  state: string
  city: string
  zipcode: string
  mobile_number: string
  form_type: string
}

// Create First and Last Name using Faker
const firstName = faker.person.firstName()
const lastName = faker.person.lastName()

// Create Default Sign Up Data using Faker
const defaultSignUpDataForUI: SignUpDataForUI = {
  namePrefix: NamePrefix.MRS_,
  firstName,
  lastName,
  name: `${firstName} ${lastName}`,
  email: faker.internet.email({ firstName, lastName }),
  password: `TestLab@123`,
  dateOfBirth: {
    day: faker.number.int({ min: 1, max: 28 }).toString(),
    month: faker.date.month(),
    year: faker.date.past({ years: 60 }).getFullYear().toString(),
  },
  signUpForOurNewsLetter: false,
  receiveSpecialOffersFromOurPartners: false,
  company: faker.company.name(),
  address: faker.location.streetAddress(),
  address2: faker.location.secondaryAddress(),
  country: Country.INDIA,
  state: faker.location.state(),
  city: faker.location.city(),
  zipCode: faker.location.zipCode(),
  mobileNumber: faker.phone.number(),
}

// Create Default Sign Up Data for API using Faker
export const defaultSignUpTestDataForAPI: SignUpDataForAPI = {
  title: NamePrefix.MR_,
  name: `${firstName} ${lastName}`,
  email_address: faker.internet.email({ firstName, lastName }),
  password: 'TestLab@123',
  days: faker.number.int({ min: 1, max: 28 }).toString(),
  months: faker.date.month(),
  years: faker.date.past({ years: 60 }).getFullYear().toString(),
  newsletter: '1',
  optin: '1',
  first_name: firstName,
  last_name: lastName,
  company: faker.company.name(),
  address1: faker.location.streetAddress(),
  address2: faker.location.secondaryAddress(),
  country: Country.INDIA,
  state: faker.location.state(),
  city: faker.location.city(),
  zipcode: faker.location.zipCode(),
  mobile_number: faker.phone.number().toString(),
  form_type: 'create_account',
}

export class SignUpTestData extends BaseTestData {
  /**
   * Get sign up test data for UI with optional overrides
   * @param overrides - Partial data to override default values
   * @returns SignUpDataForUI with overridden values
   */
  getSignUpDataForUI(overrides?: Partial<SignUpDataForUI>): SignUpDataForUI {
    return this.getData(defaultSignUpDataForUI, overrides)
  }

  /**
   * Get sign up test data for API with optional overrides
   * @param overrides - Partial data to override default values
   * @returns SignUpDataForAPI with overridden values
   */
  getSignUpDataForAPI(overrides?: Partial<SignUpDataForAPI>): SignUpDataForAPI {
    return this.getData(defaultSignUpTestDataForAPI, overrides)
  }

  /**
   * Get sign up test data for UI excluding specified fields
   * @param excludes - Array of fields to exclude from the data
   * @returns Partial SignUpDataForUI with specified fields excluded
   */
  getSignUpDataForUIWithExcludes(
    excludes: (keyof SignUpDataForUI)[]
  ): Partial<SignUpDataForUI> {
    return this.getDataWithExcludes(defaultSignUpDataForUI, excludes)
  }

  /**
   * Get sign up test data for API excluding specified fields
   * @param excludes - Array of fields to exclude from the data
   * @returns Partial SignUpDataForAPI with specified fields excluded
   */
  getSignUpDataForAPIWithExcludes(
    excludes: (keyof SignUpDataForAPI)[]
  ): Partial<SignUpDataForAPI> {
    return this.getDataWithExcludes(defaultSignUpTestDataForAPI, excludes)
  }

  /**
   * Get sign up test data for UI with specific overrides and exclusions
   * @param overrides - Partial data to override default values
   * @param excludes - Array of fields to exclude from the data
   * @returns Partial SignUpDataForUI with overridden values and specified fields excluded
   */
  getSignUpDataForUIWithOverridesAndExcludes(
    overrides: Partial<SignUpDataForUI>,
    excludes: (keyof SignUpDataForUI)[]
  ): Partial<SignUpDataForUI> {
    return this.getDataWithOverridesAndExcludes(
      defaultSignUpDataForUI,
      overrides,
      excludes
    )
  }

  /**
   * Get sign up test data for API with specific overrides and exclusions
   * @param overrides - Partial data to override default values
   * @param excludes - Array of fields to exclude from the data
   * @returns Partial SignUpDataForAPI with overridden values and specified fields excluded
   */
  getSignUpDataForAPIWithOverridesAndExcludes(
    overrides: Partial<SignUpDataForAPI>,
    excludes: (keyof SignUpDataForAPI)[]
  ): Partial<SignUpDataForAPI> {
    return this.getDataWithOverridesAndExcludes(
      defaultSignUpTestDataForAPI,
      overrides,
      excludes
    )
  }
}
