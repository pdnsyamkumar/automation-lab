import { BasePage } from '@pages/base.page'

export class LoginPage extends BasePage {
  readonly getLoginLabel = () =>
    this.page.getByRole('heading', { name: 'Login to your account' })
  readonly getEmailAddressInput = () => this.page.getByTestId('login-email')
  readonly getPasswordInput = () => this.page.getByTestId('login-password')
  readonly getLoginButton = () => this.page.getByTestId('login-button')

  async fillLoginForm(email: string, password: string) {
    await this.getEmailAddressInput().fill(email)
    await this.getPasswordInput().fill(password)
  }
}
