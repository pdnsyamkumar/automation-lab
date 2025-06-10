import { BasePage } from '@pages/base.page'

export class HomePage extends BasePage {
  readonly getNavHomeLink = () =>
    this.page.locator(`.navbar-nav li a[href="/"]`)

  async navigateToHomePage() {
    await this.page.goto(`/`)
    await this.page.waitForLoadState('load')
  }
}
