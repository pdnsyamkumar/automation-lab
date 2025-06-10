import { NamePrefix } from '@utilities/enums'
import {
  AccountInformation,
  AddressInformation,
  DOB,
} from '@testData/signup-test-data'
import { BasePage } from '@pages/base.page'

export class SignUpPage extends BasePage {
  readonly getSignUp_LoginLink = () => this.page.locator(`a[href="/login"]`)
  readonly getNewUserSignUpLabel = () => this.page.getByText(`New User Signup!`)
  readonly getEnterAccountInfoLabel = () =>
    this.page.getByText(`Enter Account Information`)
  readonly getAccountCreatedLabel = () =>
    this.page.getByTestId(`account-created`)
  readonly getAccountDeletedLabel = () =>
    this.page.getByTestId(`account-deleted`)
  readonly getSignUpNameInput = () => this.page.getByTestId(`signup-name`)
  readonly getSignUpEmailAddressInput = () =>
    this.page.getByTestId(`signup-email`)
  readonly getSignUpButton = () =>
    this.page.getByRole(`button`, { name: `Signup` })
  readonly getNamePrefixRadioButton = (title: NamePrefix) =>
    this.page.getByLabel(title)
  readonly getNameInput = () => this.page.getByTestId(`name`)
  readonly getEmailInput = () => this.page.getByTestId(`email`)
  readonly getPasswordInput = () => this.page.getByTestId(`password`)
  readonly getNewsLetterCheckbox = () =>
    this.page.getByLabel(`Sign up for our newsletter!`)
  readonly getSpecialOffersCheckbox = () =>
    this.page.getByLabel(`Receive special offers from our partners!`)
  readonly getFirstNameInput = () => this.page.getByTestId(`first_name`)
  readonly getLastNameInput = () => this.page.getByTestId(`last_name`)
  readonly getCompanyInput = () => this.page.getByTestId(`company`)
  readonly getAddressInput = () => this.page.getByTestId(`address`)
  readonly getAddress2Input = () => this.page.getByTestId(`address2`)
  readonly getStateInput = () => this.page.getByTestId(`state`)
  readonly getCityInput = () => this.page.getByTestId(`city`)
  readonly getZIPCodeInput = () => this.page.getByTestId(`zipcode`)
  readonly getMobileNumberInput = () => this.page.getByTestId(`mobile_number`)
  readonly getCreateAccountButton = () =>
    this.page.getByRole(`button`, { name: `Create Account` })
  readonly getContinueButton = () => this.page.getByTestId(`continue-button`)

  /** Fills the name and email address fields on the signup form */
  async fillNameAndEmailAddress(name: string, email: string) {
    await this.getSignUpNameInput().fill(name)
    await this.getSignUpEmailAddressInput().fill(email)
  }

  /** Selects the date of birth from dropdown menus */
  async selectDOB(dateOfBirth: DOB) {
    await this.page.selectOption(`#days`, dateOfBirth.day)
    await this.page.selectOption(`#months`, dateOfBirth.month)
    await this.page.selectOption(`#years`, dateOfBirth.year)
  }

  /** Selects a country from the country dropdown */
  async selectCountry(country: string) {
    await this.page.selectOption(`[data-qa="country"]`, country)
  }

  /** Fills in all account information fields including name prefix, password, DOB, and newsletter preferences */
  async enterAccountInformation(accountInfo: AccountInformation) {
    await this.getNamePrefixRadioButton(accountInfo.namePrefix).check()
    await this.getPasswordInput().fill(accountInfo.password)
    await this.selectDOB(accountInfo.dateOfBirth)
    if (accountInfo.signUpForOurNewsLetter) this.getNewsLetterCheckbox().check()
    if (accountInfo.receiveSpecialOffersFromOurPartners)
      this.getSpecialOffersCheckbox().check()
  }

  /** Fills in all address information fields including name, company, address, and contact details */
  async fillAddressInformation(addressInfo: AddressInformation) {
    await this.getFirstNameInput().fill(addressInfo.firstName)
    await this.getLastNameInput().fill(addressInfo.lastName)
    await this.getCompanyInput().fill(addressInfo.company)
    await this.getAddressInput().fill(addressInfo.address)
    await this.getAddress2Input().fill(addressInfo.address2)
    await this.selectCountry(addressInfo.country)
    await this.getStateInput().fill(addressInfo.state)
    await this.getCityInput().fill(addressInfo.city)
    await this.getZIPCodeInput().fill(addressInfo.zipCode)
    await this.getMobileNumberInput().fill(addressInfo.mobileNumber)
  }
}
