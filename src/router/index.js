import Vue from 'vue'
import Router from 'vue-router'
import {formatRoutes} from '@/utils/routerUtil'

Vue.use(Router)
/**
  * Initialize routing instance
  * @param isAsync is asynchronous routing mode
  * @returns {VueRouter}
  */
function initRouter(isAsync) {
  const options = isAsync ? require('./async/config.async').default : require('./routes').default
  formatRoutes(options.routes)
  return new Router(options)
}
export { initRouter}
