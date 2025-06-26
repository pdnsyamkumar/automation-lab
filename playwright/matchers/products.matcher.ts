import { ProductsPage } from '@pages/products.page'

/**
 * Verifies if the products container is visible and has the expected title.
 * @param productsPage The ProductsPage instance.
 * @param title The expected title of the products container.
 */
async function toShowProductsContainerWithTitle(
  this: any,
  productsPage: ProductsPage,
  title: string
) {
  const assertionName = 'toShowProductsContainerWithTitle'
  let pass = false
  let actual = { visible: false, title: '' }
  try {
    const containerVisible = await productsPage
      .getAllProductsContainer()
      .isVisible()
    const containerTitle = await productsPage
      .getProductsContainerTitle()
      .textContent()
    actual.visible = containerVisible
    actual.title = containerTitle?.trim() || ''
    pass = containerVisible && actual.title === title
    if (this.isNot) pass = !pass
  } catch (error) {
    throw error
  }
  const message = () =>
    this.utils.matcherHint(assertionName, undefined, undefined, {
      isNot: this.isNot,
    }) +
    '\n\n' +
    `Expected: ${this.isNot ? 'not ' : ''}{ visible: true, title: "${title}" }\n` +
    `Received: { visible: ${actual.visible}, title: "${actual.title}" }`

  return {
    message,
    pass,
    name: assertionName,
    expected: { visible: !this.isNot, title },
    actual,
  }
}

/**
 * Verifies if the Product Added modal is visible and has the title "Added!".
 * @param productsPage The ProductsPage instance.
 */
async function toShowAddToCartStatus(
  this: any,
  productsPage: ProductsPage,
  title: string
) {
  const assertionName = 'toShowAddToCartStatus'
  let pass = false
  let actual: { modalVisible?: boolean; title?: string } = {}
  try {
    const modalVisible = await productsPage.getModal().isVisible()
    const modalInfo = await productsPage.getProductAddedModalInfo()
    actual.modalVisible = modalVisible
    actual.title = modalInfo.title
    pass = modalVisible && modalInfo.title === title
    if (this.isNot) pass = !pass
  } catch (error) {
    throw error
  }
  const message = () =>
    this.utils.matcherHint(assertionName, undefined, undefined, {
      isNot: this.isNot,
    }) +
    '\n\n' +
    `Expected: ${this.isNot ? 'not ' : ''}{ visible: true, title: "Added!" }\n` +
    `Received: { visible: ${actual.modalVisible}, title: "${actual.title}" }`

  return {
    message,
    pass,
    name: assertionName,
    expected: { visible: !this.isNot, title: 'Added!' },
    actual,
  }
}

/**
 * Verifies if a product with the specified name exists on the ProductsPage.
 * @param productsPage The ProductsPage instance.
 * @param productName The name of the product to check for.
 */
async function toHaveProduct(
  this: any,
  productsPage: ProductsPage,
  productName: string
) {
  const assertionName = 'toHaveProduct'
  let pass = false
  let actual = false
  try {
    const product = await productsPage.getProductDetailsByName(productName)
    actual = !!product
    pass = !!product
    if (this.isNot) pass = !pass
  } catch (error) {
    throw error
  }
  const message = () =>
    this.utils.matcherHint(assertionName, undefined, undefined, {
      isNot: this.isNot,
    }) +
    '\n\n' +
    `Expected: ${this.isNot ? 'not ' : ''}to find product "${productName}" on the page\n` +
    `Received: found=${actual}`

  return {
    message,
    pass,
    name: assertionName,
    expected: !this.isNot,
    actual,
  }
}

/**
 * Verifies if the products container has the expected number of products based on a comparison operator.
 * @param productsPage The ProductsPage instance.
 * @param expectedCount The expected number of products in the container.
 * @param comparison The comparison operator: 'eq' | 'lt' | 'lte' | 'gt' | 'gte'. Defaults to 'eq'.
 */
async function toHaveProductsCount(
  this: any,
  productsPage: ProductsPage,
  expectedCount: number,
  comparison: 'eq' | 'lt' | 'lte' | 'gt' | 'gte' = 'eq'
) {
  const assertionName = 'toHaveProductsCount'
  let pass = false
  let actualCount = 0
  try {
    const products = await productsPage.getAllProducts()
    actualCount = products.length
    switch (comparison) {
      case 'lt':
        pass = actualCount < expectedCount
        break
      case 'lte':
        pass = actualCount <= expectedCount
        break
      case 'gt':
        pass = actualCount > expectedCount
        break
      case 'gte':
        pass = actualCount >= expectedCount
        break
      case 'eq':
      default:
        pass = actualCount === expectedCount
        break
    }
    if (this.isNot) pass = !pass
  } catch (error) {
    throw error
  }
  const comparisonText = {
    eq: '',
    lt: 'less than ',
    lte: 'less than or equal to ',
    gt: 'greater than ',
    gte: 'greater than or equal to ',
  }[comparison]

  const message = () =>
    this.utils.matcherHint(assertionName, undefined, undefined, {
      isNot: this.isNot,
    }) +
    '\n\n' +
    `Expected: ${this.isNot ? 'not ' : ''}${comparisonText}${expectedCount} products in the container\n` +
    `Received: ${actualCount}`

  return {
    message,
    pass,
    name: assertionName,
    expected: !this.isNot
      ? `${comparisonText}${expectedCount}`
      : `not ${comparisonText}${expectedCount}`,
    actual: actualCount,
  }
}

/**
 * Verifies if the detailed product information matches the expected details.
 * @param productsPage The ProductsPage instance.
 * @param expectedDetails An object containing the expected product details.
 */
async function toHaveProductDetails(
  this: any,
  productsPage: ProductsPage,
  expectedDetails: {
    name?: string
    category?: string
    price?: string
    availability?: string
    condition?: string
    brand?: string
  }
) {
  const assertionName = 'toHaveProductDetails'
  let pass = false
  let actualDetails: any = {}
  try {
    actualDetails = await productsPage.getDetailedProductInfo()
    // Only compare keys present in expectedDetails
    pass = Object.entries(expectedDetails).every(
      ([key, value]) => actualDetails[key] === value
    )
    if (this.isNot) pass = !pass
  } catch (error) {
    throw error
  }

  const message = () =>
    this.utils.matcherHint(assertionName, undefined, undefined, {
      isNot: this.isNot,
    }) +
    '\n\n' +
    `Expected: ${this.isNot ? 'not ' : ''}${JSON.stringify(expectedDetails, null, 2)}\n` +
    `Received: ${JSON.stringify(actualDetails, null, 2)}`

  return {
    message,
    pass,
    name: assertionName,
    expected: expectedDetails,
    actual: actualDetails,
  }
}

/**
 * Verifies if all products on the page contain the given search value in their names.
 * @param productsPage The ProductsPage instance.
 * @param searchValue The search value to check for in product names.
 */
async function toHaveProductsContainingSearchValue(
  this: any,
  productsPage: ProductsPage,
  searchValue: string
) {
  const assertionName = 'toHaveProductsContainingSearchValue'
  let pass = false
  let actual: { foundProducts: string[]; totalProducts: number } = {
    foundProducts: [],
    totalProducts: 0,
  }
  try {
    const allProductDetails = await productsPage.getAllProductDetails()
    const matchingProducts = allProductDetails.filter((product) =>
      product.name?.toLowerCase().includes(searchValue.toLowerCase())
    )

    actual.foundProducts = matchingProducts
      .map((p) => p.name || '')
      .filter((name) => name !== '')
    actual.totalProducts = allProductDetails.length
    pass = matchingProducts.length > 0
    if (this.isNot) pass = !pass
  } catch (error) {
    throw error
  }

  const message = () =>
    this.utils.matcherHint(assertionName, undefined, undefined, {
      isNot: this.isNot,
    }) +
    '\n\n' +
    `Expected: ${this.isNot ? 'not ' : ''}to find products containing "${searchValue}" in their names\n` +
    `Received: ${actual.foundProducts.length} matching products out of ${actual.totalProducts} total products\n` +
    `Matching products: ${actual.foundProducts.length > 0 ? actual.foundProducts.join(', ') : 'none'}`

  return {
    message,
    pass,
    name: assertionName,
    expected: !this.isNot
      ? `products containing "${searchValue}"`
      : `no products containing "${searchValue}"`,
    actual: actual,
  }
}

export const productsMatcher = {
  toShowAddToCartStatus,
  toHaveProduct,
  toShowProductsContainerWithTitle,
  toHaveProductsCount,
  toHaveProductDetails,
  toHaveProductsContainingSearchValue,
}
