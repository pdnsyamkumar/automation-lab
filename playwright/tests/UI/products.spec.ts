import { expect, test } from '@utilities/base-test'

test.describe('Products Page Tests', () => {
  test.beforeEach('Navigate to Automation Exercise', async ({ homePage }) => {
    await test.step(`Step 1: Launch browser`, async () => {})

    await test.step(`Step 2: Navigate to url 'https://automationexercise.com'`, async () => {
      await homePage.navigateToHomePage()
      await expect(homePage.getNavHomeLink()).toBeVisible()
    })
  })

  test(`Test Case 8: Verify All Products and product detail page`, async ({
    homePage,
    productsPage,
    page,
  }) => {
    await test.step(`Step 3:  Verify that home page is visible successfully`, async () => {
      await expect(homePage.getNavHomeLink()).toBeVisible()
    })

    await test.step(`
        Step 4: Click on 'Products' button
        Step 5: Verify user is navigated to ALL PRODUCTS page successfully
        Step 6: The products list is visible`, async () => {
      await productsPage.navigateToProductsPage()
      await expect(productsPage).toShowProductsContainerWithTitle(
        'All Products'
      )
    })

    await test.step(`Step 6: The products list is visible`, async () => {
      await expect(productsPage).toHaveProductsCount(0, 'gt')
    })

    await test.step(`Step 7: Click on 'View Product' of first product`, async () => {
      await productsPage.clickViewProductByIndex(1)
    })

    await test.step(`Step 8: User is landed to product detail page
         Step 9: Verify that detail detail is visible: product name, category, price, availability, condition, brand`, async () => {
      expect(page.url()).toContain('/product_details/')
      await expect(productsPage).toHaveProductDetails({
        name: 'Blue Top',
        category: 'Women > Tops',
        price: 'Rs. 500',
        availability: 'In Stock',
        condition: 'New',
        brand: 'Polo',
      })
    })
  })

  test(`Test Case 9: Search Product`, async ({
    homePage,
    productsPage,
  }) => {
    await test.step(`Step 3:  Verify that home page is visible successfully`, async () => {
      await expect(homePage.getNavHomeLink()).toBeVisible()
    })

    await test.step(`
        Step 4: Click on 'Products' button
        Step 5: Verify user is navigated to ALL PRODUCTS page successfully`, async () => {
      await productsPage.navigateToProductsPage()
      await expect(productsPage).toShowProductsContainerWithTitle(
        'All Products'
      )
    })

    await test.step(`
      Step 6: Enter product name in search input and click search button
      Step 7: Verify 'SEARCHED PRODUCTS' is visible`, async () => {
      await productsPage.searchProductByName('Top')
      await expect(productsPage).toShowProductsContainerWithTitle(
        'Searched Products'
      )
    })

    await test.step(`Step 9: Verify all the products related to search are visible`, async ({}) => {
      await expect(productsPage).toHaveProductsContainingSearchValue('Top')
    })
  })

  test('Test Case 21: Add review on product', async ({
    productsPage,
    page,
  }) => {
    await test.step(`Step 3: Click on 'Products' button`, async () => {
      await productsPage.navigateToProductsPage()
    })

    await test.step(`Step 4: Verify user is navigated to ALL PRODUCTS page successfully`, async () => {
      await expect(productsPage.getProductsContainerTitle()).toBeVisible()
      await expect(productsPage.getProductsContainerTitle()).toHaveText(
        'All Products'
      )
    })

    await test.step(`Step 5: Click on 'View Product' button`, async () => {
      const product = 'Blue Top'
      await productsPage.searchProductByName(product)
      await productsPage.clickViewProductByName(product)
    })

    await test.step(`Step 6: Verify 'Write Your Review' is visible`, async () => {
      await expect(productsPage.getWriteReviewLabel()).toBeVisible()
    })

    await test.step(`
      Step 7: Enter name, email and review
      Step 8: Click 'Submit' button`, async () => {
      await productsPage.addReviewAndSubmit({
        name: 'Test User',
        email: 'testuser@example.com',
        review: 'This is a test review',
      })
    })

    await test.step(`Step 9: Verify success message 'Thank you for your review.'`, async () => {
      await expect(page.getByText('Thank you for your review.')).toBeVisible()
    })
  })
})