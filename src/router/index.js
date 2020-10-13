import Vue from 'vue'
import Router from 'vue-router'
import { formatRoutes } from '@/utils/routerUtil'

Vue.use(Router)

// Route configuration without login interception
const loginIgnore = {
  names: ['404', '403'], //Match according to route name
  paths: ['/login'], //Match according to the route fullPath
  /**
   * Determine whether the route is included in the configuration
   * @param route vue-router route object
   * @returns {boolean}
   */
  includes(route) {
    return this.names.includes(route.name) || this.paths.includes(route.path)
  }
}

/**
 * Initialize routing instance
 * @param isAsync is asynchronous routing mode
 * @returns {VueRouter}
 */
function initRouter(isAsync) {
  const options = isAsync ? require('./async/config.async').default : require('./config').default
  formatRoutes(options.routes)
  return new Router(options)
}
export { loginIgnore, initRouter }
