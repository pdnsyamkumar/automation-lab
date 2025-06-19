import { APIRequestContext, test as baseTest } from '@playwright/test'
import { AuthApi } from './auth.api'
import { ProductsApi } from './products.api'
import { BrandsApi } from './brands.api'

export const apiFixtures = baseTest.extend<ApiFixtures>({
  apiRequestContext: async ({ playwright }, use) => {
    const apiContext = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL,
    })
    await use(apiContext)
  },

  authApi: async ({ apiRequestContext }, use) => {
    await use(new AuthApi(apiRequestContext))
  },

  productsApi: async ({ apiRequestContext }, use) => {
    await use(new ProductsApi(apiRequestContext))
  },

  brandsApi: async ({ apiRequestContext }, use) => {
    await use(new BrandsApi(apiRequestContext))
  },
})

export interface ApiFixtures extends ApiTypes {
  apiRequestContext: APIRequestContext
}

export interface ApiTypes {
  authApi: AuthApi
  productsApi: ProductsApi
  brandsApi: BrandsApi
}
