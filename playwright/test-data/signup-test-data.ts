import { faker } from '@faker-js/faker'
import { BaseTestData } from "@testData/base-test-data"
import { NamePrefix, Country } from '@utilities/enums'

export interface DOB {
    day: string,
    month: string,
    year: string
}

export interface AccountInformation {   
    namePrefix: NamePrefix,
    name: string,
    email: string,
    password: string,
    dateOfBirth: DOB,
    signUpForOurNewsLetter: boolean,
    receiveSpecialOffersFromOurPartners: boolean
}

export interface AddressInformation {
    firstName: string,
    lastName: string,
    company: string,
    address: string,
    address2: string,
    country: string,
    state: string,
    city: string,
    zipCode: string,
    mobileNumber: string
}

export interface SignUpData extends AccountInformation, AddressInformation{}

// Create First and Last Name using Faker
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();

// Create Default Sign Up Data using Faker
const defaultSignUpData: SignUpData = {
    namePrefix: faker.helpers.arrayElement([NamePrefix.MR_, NamePrefix.MRS_]),
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }),
    password: `TestLab@123`,
    dateOfBirth: {
        day: faker.number.int({ min: 1, max: 28 }).toString(),
        month: faker.date.month(),
        year: faker.date.past({ years: 60 }).getFullYear().toString()
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
    mobileNumber: faker.phone.number()
}

export class SignUpTestData extends BaseTestData {
    /**
     * Get sign up test data with optional overrides
     * @param overrides - Partial data to override default values
     * @returns SignUpData with overridden values
     */
    getSignUpData(overrides?: Partial<SignUpData>): SignUpData {
        return this.getData(defaultSignUpData, overrides)
    }

    /**
     * Get sign up test data excluding specified fields
     * @param excludes - Array of fields to exclude from the data
     * @returns SignUpData with specified fields excluded
     */
    getSignUpDataWithExcludes(excludes: (keyof SignUpData)[]): Partial<SignUpData> {
        return this.getDataWithExcludes(defaultSignUpData, excludes)
    }

    /**
     * Get sign up test data with specific overrides and exclusions
     * @param overrides - Partial data to override default values
     * @param excludes - Array of fields to exclude from the data
     * @returns SignUpData with overridden values and specified fields excluded
     */
    getSignUpDataWithOverridesAndExcludes(
        overrides: Partial<SignUpData>,
        excludes: (keyof SignUpData)[]
    ): Partial<SignUpData> {
        return this.getDataWithOverridesAndExcludes(defaultSignUpData, overrides, excludes)
    }
}