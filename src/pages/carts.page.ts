import { BasePage } from './base.page'

// ------CartPage Class ------
export class CartPage extends BasePage {
  // ------ Locators ------
  readonly getCartLink = () => this.page.getByRole('link', { name: 'Cart' })

  // ------ Actions ------
  /**
   * Navigates to the cart page and waits for the page to load
   */
  async navigateToCartPage() {
    await this.getCartLink().click()
    await this.page.waitForLoadState('load')
  }
}
