import { BasePage } from '@pages/base.page'

export class TopNavigationPage extends BasePage {
  readonly getNavBar = () => this.page.locator(`.navbar-nav`)
  readonly getNavOptionByLabel = (label: string) =>
    this.getNavBar().locator(`li a`, { hasText: label })

  /**
   * Gets the text content of all navigation links in the navbar
   * @returns Promise<string[]> Array of trimmed text content from all nav links
   */
  async getAllNavOptionsInnerText() {
    const navBar = this.getNavBar()
    const links = await navBar.locator(`li a`).all()
    return Promise.all(
      links.map(async (link) => {
        const text = await link.textContent()
        return text?.trim() ?? ''
      })
    )
  }
}
