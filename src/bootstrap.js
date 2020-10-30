import {loadRoutes, loadGuards, setAppOptions} from'@/utils/routerUtil'
import guards from'@/router/guards'

/**
  * Booting method
  * The operations that need to be performed when the application starts are placed here
  * @param router application routing instance
  * @param store application vuex.store instance
  * @param i18n application vue-i18n instance
  * @param i18n application message instance
  */
function bootstrap({router, store, i18n, message}) {
   // Set application configuration
   setAppOptions({router, store, i18n})
   // Load route
   loadRoutes()
   // Load routing guard
   loadGuards(guards, {router, store, i18n, message})
}

export default bootstrap
