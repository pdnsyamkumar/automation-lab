import { expect, test } from '@utilities/base-test'

test('API 1: Get All Products List', async ({ productsApi }) => {
  const response = await productsApi.getProducts()
  expect(response.status()).toBe(200)
  console.log(response)
  const products = await response.json()
  console.log(products)
  expect(products).toHaveProperty('products')
  expect(products.products.length).toBeGreaterThan(0)
})

test('API 2: Get Single Product Details', async ({ productsApi }) => {
  const response = await productsApi.searchProducts('Men')
  expect(response.status()).toBe(200)
  const product = await response.json()
  console.log(product)
  expect(product).toHaveProperty('product')
  expect(product.product.id).toBe(1)
})
