import { expect, test } from '@utilities/base-test'

test('API 3: Get All Brands List', async ({ brandsApi }) => {
  const response = await brandsApi.getBrands()
  expect(response.status()).toBe(200)
  const brands = await response.json()
  expect(brands).toHaveProperty('brands')
  expect(brands.brands.length).toBeGreaterThan(0)
})
