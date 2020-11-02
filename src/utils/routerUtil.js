import routerMap from '@/router/async/router.map'
import {mergeI18nFromRoutes} from '@/utils/i18n'
import Router from 'vue-router'
import deepMerge from 'deepmerge'
import basicOptions from '@/router/async/config.async'

// app options
let appOptions = {
  router: undefined,
  i18n: undefined,
  store: undefined
}

/**
 * Set
 * @param options
 */
function setAppOptions(options) {
  const {router, store, i18n} = options
  appOptions.router = router
  appOptions.store = store
  appOptions.i18n = i18n
}

/**
  * Analyze routing according to routing configuration and routing component registration
  * @param routesConfig routing configuration
  * @param routerMap local routing component registration configuration
  */
 function parseRoutes(routesConfig, routerMap) {
  let routes = []
  routesConfig.forEach(item => {
    // Get the router registered in routerMap and initialize routeCfg
    let router = undefined, routeCfg = {}
    if (typeof item ==='string' && routerMap[item]) {
      router = routerMap[item]
      routeCfg = {path: router.path || item, router: item}
    } else if (typeof item ==='object') {
      router = routerMap[item.router]
      routeCfg = item
    }
    // parse route from router and routeCfg
    if (!router) {
      console.warn(`can't find register for router ${routeCfg.router}, please register it in advance.`)
    } else {
      const route = {
        path: routeCfg.path || router.path || routeCfg.router,
        name: routeCfg.name || router.name,
        component: router.component,
        redirect: routeCfg.redirect || router.redirect,
        meta: {
          authority: routeCfg.authority || router.authority ||'*',
          icon: routeCfg.icon || router.icon,
          page: routeCfg.page || router.page
        }
      }
      if (routeCfg.invisible || router.invisible) {
        route.meta.invisible = true
      }
      if (routeCfg.children && routeCfg.children.length> 0) {
        route.children = parseRoutes(routeCfg.children, routerMap)
      }
      routes.push(route)
    }
  })
  return routes
}

/**
 * Load routing
 * @param routesConfig {RouteConfig[]} route configuration
 */
function loadRoutes(routesConfig) {
  if (arguments.length> 0) {
    const arg0 = arguments[0]
    if (arg0.router || arg0.i18n || arg0.store) {
      routesConfig = arguments[1]
      console.error('the usage of signature loadRoutes({router, store, i18n}, routesConfig) is out of date, please use the new signature: loadRoutes(routesConfig).')
    }
  }

  // Application configuration
  const {router, store, i18n} = appOptions

  // If asynchronous routing is enabled, load the asynchronous routing configuration
  const asyncRoutes = store.state.setting.asyncRoutes
  if (asyncRoutes) {
    if (routesConfig && routesConfig.length> 0) {
      const routes = parseRoutes(routesConfig, routerMap)
      const finalRoutes = mergeRoutes(basicOptions.routes, routes)
      formatRoutes(finalRoutes)
      router.options = {...router.options, routes: finalRoutes}
      router.matcher = new Router({...router.options, routes:[]}).matcher
      router.addRoutes(finalRoutes)
    }
  }
  // Extract routing internationalization data
  mergeI18nFromRoutes(i18n, router.options.routes)
  // Initialize Admin background menu data
  const rootRoute = router.options.routes.find(item => item.path ==='/admin')
  const menuRoutes = rootRoute && rootRoute.children
  if (menuRoutes) {
    store.commit('setting/setMenuData', menuRoutes)
  }
}

/**
 * Combine routing
 * @param target {Route[]}
 * @param source {Route[]}
 * @returns {Route[]}
 */
function mergeRoutes(target, source) {
  const routesMap = {}
  target.forEach(item => routesMap[item.path] = item)
  source.forEach(item => routesMap[item.path] = item)
  return Object.values(routesMap)
}

/**
 * Deep merge routing
 * @param target {Route[]}
 * @param source {Route[]}
 * @returns {Route[]}
 */
function deepMergeRoutes(target, source) {
  // Map routing array
  const mapRoutes = routes => {
    const routesMap = {}
    routes.forEach(item => {
      routesMap[item.path] = {
        ...item,
        children: item.children? mapRoutes(item.children): undefined
      }
    })
    return routesMap
  }
  const tarMap = mapRoutes(target)
  const srcMap = mapRoutes(source)

  // merge routing
  const merge = deepMerge(tarMap, srcMap)

  // Convert to routes array
  const parseRoutesMap = routesMap => {
    return Object.values(routesMap).map(item => {
      if (item.children) {
        item.children = parseRoutesMap(item.children)
      } else {
        delete item.children
      }
      return item
    })
  }
  return parseRoutesMap(merge)
}

/**
 * Format routing
 * @param routes routing configuration
 */
function formatRoutes(routes) {
  routes.forEach(route => {
    const {path} = route
    if (!path.startsWith('/') && path !=='*') {
      route.path ='/' + path
    }
  })
  formatAuthority(routes)
}

/**
 * Format routing permissions configuration
 * @param routes routing
 * @param pAuthorities parent routing authority configuration collection
 */
function formatAuthority(routes, pAuthorities = []) {
  routes.forEach(route => {
    const meta = route.meta
    const defaultAuthority = pAuthorities[pAuthorities.length-1] || {permission:'*'}
    if (meta) {
      let authority = {}
      if (!meta.authority) {
        authority = defaultAuthority
      }else if (typeof meta.authority ==='string') {
        authority.permission = meta.authority
      } else if (typeof meta.authority ==='object') {
        authority = meta.authority
        const {role} = authority
        if (typeof role ==='string') {
          authority.role = [role]
        }
        if (!authority.permission && !authority.role) {
          authority = defaultAuthority
        }
      }
      meta.authority = authority
    } else {
      const authority = defaultAuthority
      route.meta = {authority}
    }
    route.meta.pAuthorities = pAuthorities
    if (route.children) {
      formatAuthority(route.children, [...pAuthorities, route.meta.authority])
    }
  })
}

/**
 * Resolve i18n key from routing path
 * @param path
 * @returns {*}
 */
function getI18nKey(path) {
  const keys = path.split('/').filter(item => !item.startsWith(':') && item !='')
  keys.push('name')
  return keys.join('.')
}

/**
 * Load navigation guard
 * @param guards
 * @param options
 */
function loadGuards(guards, options) {
  const {beforeEach, afterEach} = guards
  const {router} = options
  beforeEach.forEach(guard => {
    if (guard && typeof guard ==='function') {
      router.beforeEach((to, from, next) => guard(to, from, next, options))
    }
  })
  afterEach.forEach(guard => {
    if (guard && typeof guard ==='function') {
      router.afterEach((to, from) => guard(to, from, options))
    }
  })
}

export {parseRoutes, loadRoutes, formatAuthority, getI18nKey, loadGuards, deepMergeRoutes, formatRoutes, setAppOptions}
