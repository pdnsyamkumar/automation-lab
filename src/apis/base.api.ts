import { APIRequestContext, APIResponse } from '@playwright/test'
import { Serializable } from 'node:child_process'
import { ReadStream } from 'node:fs'

export class BaseApi {
  constructor(readonly apiRequestContext: APIRequestContext) {
    this.apiRequestContext = apiRequestContext
  }

  /**
   * Sends a GET request to the specified URL with optional parameters.
   *
   * @param {string} url - The URL to send the request to.
   * @param {APIRequestOptions} [options] - Optional request options.
   * @returns {Promise<APIResponse>} The API response.
   */
  async get(
    url: string,
    options?: APIRequestOptions,
    apiName?: string
  ): Promise<APIResponse> {
    return this.handleRequest(
      url,
      options,
      () => this.apiRequestContext.get(url, options),
      apiName
    )
  }

  /**
   * Sends a POST request to the specified URL with optional parameters.
   *
   * @param {string} url - The URL to send the request to.
   * @param {APIRequestOptions} [options] - Optional request options.
   * @returns {Promise<APIResponse>} The API response.
   */
  async post(
    url: string,
    options?: APIRequestOptions,
    apiName?: string
  ): Promise<APIResponse> {
    return this.handleRequest(
      url,
      options,
      () => this.apiRequestContext.post(url, options),
      apiName
    )
  }

  /**
   * Sends a PUT request to the specified URL with optional parameters.
   *
   * @param {string} url - The URL to send the request to.
   * @param {APIRequestOptions} [options] - Optional request options.
   * @returns {Promise<APIResponse>} The API response.
   */
  async put(
    url: string,
    options?: APIRequestOptions,
    apiName?: string
  ): Promise<APIResponse> {
    return this.handleRequest(
      url,
      options,
      () => this.apiRequestContext.put(url, options),
      apiName
    )
  }

  /**
   * Sends a DELETE request to the specified URL with optional parameters.
   *
   * @param {string} url - The URL to send the request to.
   * @param {APIRequestOptions} [options] - Optional request options.
   * @returns {Promise<APIResponse>} The API response.
   */
  async delete(
    url: string,
    options?: APIRequestOptions,
    apiName?: string
  ): Promise<APIResponse> {
    return this.handleRequest(
      url,
      options,
      () => this.apiRequestContext.delete(url, options),
      apiName
    )
  }

  /**
   * Sends a DELETE request to the specified URL with optional parameters.
   *
   * @param {string} url - The URL to send the request to.
   * @param {APIRequestOptions} [options] - Optional request options.
   * @returns {Promise<APIResponse>} The API response.
   */
  async deleteWithoutValidation(
    url: string,
    options?: APIRequestOptions
  ): Promise<APIResponse> {
    try {
      const response = await this.apiRequestContext.delete(url, options)
      return response
    } catch (error) {
      console.error('Request failed:', error)
      throw error
    }
  }

  /**
   * Sends a PATCH request to the specified URL with optional parameters.
   *
   * @param {string} url - The URL to send the request to.
   * @param {APIRequestOptions} [options] - Optional request options.
   * @returns {Promise<APIResponse>} The API response.
   */
  async patch(
    url: string,
    options?: APIRequestOptions,
    apiName?: string
  ): Promise<APIResponse> {
    return this.handleRequest(
      url,
      options,
      () => this.apiRequestContext.patch(url, options),
      apiName
    )
  }

  /**
   * Sends a HEAD request to the specified URL with optional parameters.
   *
   * @param {string} url - The URL to send the request to.
   * @param {APIRequestOptions} [options] - Optional request options.
   * @returns {Promise<APIResponse>} The API response.
   */
  async head(
    url: string,
    options?: APIRequestOptions,
    apiName?: string
  ): Promise<APIResponse> {
    return this.handleRequest(
      url,
      options,
      () => this.apiRequestContext.head(url, options),
      apiName
    )
  }

  /**
   * Handles the request, validates the response, and throws an error if the request fails.
   *
   * @param {() => Promise<APIResponse>} requestMethod - The request method to execute.
   * @returns {Promise<APIResponse>} The API response.
   * @throws {Error} If the request fails.
   */
  private async handleRequest(
    url: string,
    options: APIRequestOptions | undefined,
    requestMethod: () => Promise<APIResponse>,
    apiName?: string
  ): Promise<APIResponse> {
    try {
      const response = await requestMethod()
      await this.validateResponse(response, url, options, apiName)
      return response
    } catch (error) {
      console.error('Request failed:', error)
      throw error
    }
  }

  /**
   * Validates the API response and throws an error if the response is not successful.
   *
   * @param {APIResponse} response - The API response to validate.
   * @throws {Error} If the response is not successful.
   */
  private async validateResponse(
    response: APIResponse,
    url: string,
    options: APIRequestOptions | undefined,
    apiName?: string
  ): Promise<void> {
    if (!response.ok()) {
      const status = response.status()
      const statusText = response.statusText()
      const body = await response.text()

      console.error(`Request failed with status ${status} ${statusText}`)
      console.error('Response body:', body)
      console.error('Request URL:', url)
      console.error('Request Headers:', options?.headers || 'No headers')
      console.error('Request Body:', JSON.stringify(options?.data) || 'No body')
      console.error('Request Body:', options?.params || 'No params')

      throw new Error(
        `While calling "${apiName}" API, Request failed with status ${status} ${statusText} ${body}`
      )
    }
  }
}

export interface GraphQLRequestOptions {
  /**
   * The GraphQL query or mutation string. This is the actual GraphQL operation to be executed,
   * containing the operation type (query/mutation), selection sets, and field specifications.
   */
  query: string

  /**
   * The name of the GraphQL operation being executed. This is useful for debugging and logging
   * purposes, as well as when multiple operations are present in a single query document.
   */
  operationName?: string

  /**
   * Variables to be used in the GraphQL operation. These are passed as arguments to the
   * query or mutation and must match the variable definitions in the query string.
   */
  variables?: Record<string, unknown>
}

export interface APIRequestOptions {
  /**
   * Allows to set post data of the request. If the data parameter is an object, it will be serialized to JSON string
   * and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type`
   * header will be set to `application/octet-stream` if not explicitly set.
   */
  data?: string | Buffer | Serializable | GraphQLRequestOptions

  /**
   * Whether to throw on response codes other than 2xx and 3xx. By default, the response object is returned for all status
   * codes.
   */
  failOnStatusCode?: boolean

  /**
   * Provides an object that will be serialized as an HTML form using `application/x-www-form-urlencoded` encoding and sent
   * as this request body. If this parameter is specified, the `content-type` header will be set to
   * `application/x-www-form-urlencoded` unless explicitly provided.
   */
  form?: Record<string, string | number | boolean>

  /**
   * Allows setting HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by
   * it.
   */
  headers?: Record<string, string>

  /**
   * Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
   */
  ignoreHTTPSErrors?: boolean

  /**
   * Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is
   * exceeded. Defaults to `20`. Pass `0` to not follow redirects.
   */
  maxRedirects?: number

  /**
   * Maximum number of times network errors should be retried. Currently only `ECONNRESET` errors are retried. Does not
   * retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
   */
  maxRetries?: number

  /**
   * Provides an object that will be serialized as an HTML form using `multipart/form-data` encoding and sent as this
   * request body. If this parameter is specified, the `content-type` header will be set to `multipart/form-data` unless
   * explicitly provided.
   */
  multipart?:
    | FormData
    | Record<
        string,
        | string
        | number
        | boolean
        | ReadStream
        | {
            name: string
            mimeType: string
            buffer: Buffer
          }
      >

  /**
   * Query parameters to be sent with the URL.
   */
  params?: Record<string, string | number | boolean>

  /**
   * Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
   */
  timeout?: number
}
