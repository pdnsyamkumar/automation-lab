import { SignUpTestData } from '@testData/signup-test-data'
import { test, expect } from '@utilities/base-test'
import { getCsrfTokenFromAuth } from '@utilities/helpers'

test.describe('User Account API Tests', () => {
  test('API 11: POST To Create/Register User Account', async ({ authApi }) => {
    const signUpTestData = new SignUpTestData()
    const signUpTestDataForAPI = signUpTestData.getSignUpDataForAPI()
    const csrfToken = getCsrfTokenFromAuth()
    const response = await authApi.createAccount({
      csrftoken: csrfToken,
      formData: signUpTestDataForAPI,
    })
    expect(response.status()).toBe(201)
  })
})
