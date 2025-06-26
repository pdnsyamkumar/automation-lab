import { BaseApi } from '@apis/base.api'

export class AuthApi extends BaseApi {
  async createAccount({
    csrftoken,
    formData,
  }: {
    csrftoken: string
    formData: Record<string, string>
  }) {
    const sessionid = ''
    const url = 'https://automationexercise.com/api/createAccount'
    const cookies = `csrftoken=${csrftoken}`
    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      cookie: cookies,
    }

    // Use your base class's request method (adjust as needed)
    return this.post(url, {
      headers,
      form: formData,
    })
  }
}
