import Cookie from 'js-cookie'
// 401 intercept
const resp401 = {
  /**
   * What to do before responding to data
   * @param response response object
   * @param options application configuration includes: {router, i18n, store, message}
   * @returns {*}
   */
  onFulfilled(response, options) {
    const { message } = options
    if (response.status === 401) {
      message.error('No permission for this interface')
    }
    return response
  },
  /**
   * Execute when response is wrong
   * @param error error object
   * @param options application configuration includes: {router, i18n, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const { message } = options
    message.error(error.message)
    return Promise.reject(error)
  }
}

const resp403 = {
  onFulfilled(response, options) {
    const { message } = options
    if (response.status === 403) {
      message.error(`Request rejected`)
    }
    return response
  }
}

const reqCommon = {
  /**
   * What to do before sending the request
   * @param config axios config
   * @param options application configuration includes: {router, i18n, store, message}
   * @returns {*}
   */
  onFulfilled(config, options) {
    const { message } = options
    const { url, xsrfCookieName } = config
    if (url.indexOf('login') === -1 && xsrfCookieName && !Cookie.get(xsrfCookieName)) {
      message.warning('Authentication token has expired, please log in again')
    }
    return config
  },
  /**
   * What to do when the request is wrong
   * @param error error object
   * @param options application configuration includes: {router, i18n, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const { message } = options
    message.error(error.message)
    return Promise.reject(error)
  }
}

export default {
  request: [reqCommon], // request interception
  response: [resp401, resp403] // response interception
}
