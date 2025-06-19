import { BaseApi } from './base.api'

export class BrandsApi extends BaseApi {
  async getBrands() {
    const url = 'https://automationexercise.com/api/brandsList'
    return this.get(url)
  }
}
