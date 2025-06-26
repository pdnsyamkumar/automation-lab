import { BasePage } from '@pages/base.page'

// ------LoginPage Class ------
export class LoginPage extends BasePage {
  // ------ Locators ------
  readonly getLoginLabel = () =>
    this.page.getByRole('heading', { name: 'Login to your account' })
  readonly getEmailAddressInput = () => this.page.getByTestId('login-email')
  readonly getPasswordInput = () => this.page.getByTestId('login-password')
  readonly getLoginButton = () => this.page.getByTestId('login-button')

  // ------ Actions ------
  /**
   * Fills the login form with the provided email and password
   * @param param0 Object containing email and password
   */
  async fillLoginForm({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    await this.getEmailAddressInput().fill(email)
    await this.getPasswordInput().fill(password)
  }
}
