import { BaseApi } from './base.api'

export class ProductsApi extends BaseApi {
  async getProducts() {
    const url = 'https://automationexercise.com/api/productsList'
    return this.get(url)
  }

  async searchProducts(query: string) {
    const url = `https://automationexercise.com/api/searchProduct?search_product=${query}`
    return this.post(url)
  }
}
