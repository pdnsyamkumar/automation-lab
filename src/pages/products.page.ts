import { BasePage } from '@pages/base.page'

// ------ProductsPage Class ------
export class ProductsPage extends BasePage {
  // ------ Common Selectors ------
  private readonly featuresItemsSelector = `//div[@class="features_items"]`
  private readonly productInfoSelector = `.productinfo`
  private readonly chooseDivSelector = `//div[@class="choose"]`
  private readonly productInformationSelector = `.product-information`
  private readonly modalContentSelector = `//div[@class="modal-content"]`

  // ------ Navigation & Product List ------
  readonly getProductsLink = () =>
    this.page.getByRole('link', { name: 'Products' })
  readonly getAllProductsContainer = () =>
    this.page.locator(this.featuresItemsSelector)
  readonly getProductsContainerTitle = () =>
    this.page.locator(`//h2[contains(@class, 'title')]`)
  readonly getAllProducts = () =>
    this.getAllProductsContainer().locator(`div.col-sm-4`).all()

  // ------ Search ------
  readonly getSearchProductInput = () =>
    this.page.locator(`input#search_product`)
  readonly getSearchButton = () => this.page.locator(`button#submit_search`)

  // ------ Review Form ------
  readonly getWriteReviewLabel = () =>
    this.page.getByRole('link', { name: 'Write Your Review' })
  readonly getNameInput = () => this.page.locator(`input#name`)
  readonly getEmailInput = () => this.page.locator(`input#email`)
  readonly getReviewInput = () => this.page.locator(`#review`)
  readonly getSubmitReviewButton = () =>
    this.page.locator(`button#button-review`)

  // ------ Modal ------
  readonly getModal = () => this.page.locator(this.modalContentSelector)
  readonly getModalTitle = () => this.getModal().locator(`h4.modal-title`)
  readonly getModalBody = () => this.getModal().locator(`.modal-body`)
  readonly getModalFooter = () => this.getModal().locator(`.modal-footer`)

  // =========================== Actions =========================== //

  /**
   * Navigates to the Products page and waits for the page to load.
   */
  async navigateToProductsPage() {
    await this.getProductsLink().click()
    await this.page.waitForLoadState('load')
  }

  /**
   * Searches for a product by name using the search input and button.
   * @param productName - The name of the product to search for.
   */
  async searchProductByName(productName: string) {
    await this.getSearchProductInput().fill(productName)
    await this.getSearchButton().click()
    await this.page.waitForLoadState('load')
  }

  /**
   * Adds a product to the cart by its name.
   * @param productName - The name of the product to add to the cart.
   */
  async addProductToCartByName(productName: string) {
    const product = await this.getProductDetailsByName(productName)
    await product?.addToCartButton?.click()
    await this.page.waitForLoadState('load')
  }

  /**
   * Clicks the 'View Product' button for a product by its name and waits for the page to load.
   * @param productName - The name of the product whose 'View Product' button should be clicked.
   */
  async clickViewProductByName(productName: string) {
    const product = await this.getProductDetailsByName(productName)
    await product?.viewProductButton?.click()
    await this.page.waitForLoadState('load')
  }

  /**
   * Clicks the 'View Product' button for a product by its index in the product list and waits for the page to load.
   * @param index - The 1-based index of the product whose 'View Product' button should be clicked.
   */
  async clickViewProductByIndex(index: number) {
    const products = await this.getAllProductDetails()
    await products[index - 1]?.viewProductButton?.click()
    await this.page.waitForLoadState('load')
  }

  /**
   * Gets information from the modal that appears after adding a product to the cart.
   * @returns An object containing the modal title, message, and action buttons.
   */
  async getProductAddedModalInfo() {
    const [title, message] = await Promise.all([
      this.getModalTitle().textContent(),
      this.getModalBody().locator(`//p[1]`).textContent(),
    ])
    const viewCart = this.getModalBody().locator(`//p/a`)
    const continueShopping = this.getModalFooter().locator('button')
    return {
      title: title?.trim(),
      message: message?.trim(),
      viewCart,
      continueShopping,
    }
  }

  /**
   * Gets detailed information about a product from the product details page.
   * @returns An object containing product details such as name, category, price, availability, condition, and brand.
   */
  async getDetailedProductInfo() {
    const container = this.page.locator(this.productInformationSelector)
    const name = await container.locator(`h2`).textContent()
    const category = await container
      .locator(`//p[contains(text(),'Category:')]`)
      .textContent()
    const price = await container
      .locator(`//span[starts-with(text(), 'Rs.')]`)
      .textContent()
    const availability = await container
      .locator(`//p[contains(.,'Availability:')]`)
      .textContent()
    const condition = await container
      .locator(`//p[contains(.,'Condition:')]`)
      .textContent()
    const brand = await container
      .locator(`//p[contains(.,'Brand:')]`)
      .textContent()
    return {
      name,
      category: category?.replace('Category: ', '').trim(),
      price,
      availability: availability?.replace('Availability: ', '').trim(),
      condition: condition?.replace('Condition: ', '').trim(),
      brand: brand?.replace('Brand: ', '').trim(),
    }
  }

  /**
   * Fills out and submits the review form for a product.
   * @param params - An object containing name, email, and review text.
   */
  async addReviewAndSubmit({
    name,
    email,
    review,
  }: {
    name: string
    email: string
    review: string
  }) {
    await this.getNameInput().fill(name)
    await this.getEmailInput().fill(email)
    await this.getReviewInput().fill(review)
    await this.getSubmitReviewButton().click()
  }

  /**
   * Gets the details of a single product by its name.
   * @param productName - The name of the product to find.
   * @returns The product details object or null if not found.
   */
  async getProductDetailsByName(productName: string) {
    const allDetails = await this.getAllProductDetails()
    return (
      allDetails.find(
        (p) => p.name?.toLowerCase() === productName.toLowerCase()
      ) || null
    )
  }

  /**
   * Gets the details of all products on the page.
   * @returns An array of product details objects.
   */
  async getAllProductDetails() {
    const products = await this.getAllProducts()
    return Promise.all(
      products.map(async (product) => {
        const productInfo = product.locator(this.productInfoSelector)
        const [name, price, imageUrl] = await Promise.all([
          productInfo.locator(`p`).textContent(),
          productInfo.locator(`h2`).textContent(),
          productInfo.locator(`img`).getAttribute('src'),
        ])
        const addToCartButton = productInfo.locator(`a`)
        const viewProductButton = product.locator(this.chooseDivSelector)
        return {
          product,
          name: name?.trim(),
          price: price?.trim(),
          imageUrl,
          addToCartButton,
          viewProductButton,
        }
      })
    )
  }
}
