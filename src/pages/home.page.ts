import { BasePage } from '@pages/base.page'

// ------HomePage Class ------
export class HomePage extends BasePage {
  // ------ Locators ------
  readonly getNavHomeLink = () =>
    this.page.locator('.navbar-nav li a[href="/"]')

  // ------ Actions ------
  /**
   * Navigates to the home page and waits for the page to load
   */
  async navigateToHomePage() {
    await this.page.goto(
      process.env.BASE_URL || 'https://automationexercise.com'
    )
    await this.page.waitForLoadState('load')
  }
}
