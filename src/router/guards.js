import { hasAuthority } from '@/utils/authority-utils'
// import { loginIgnore } from '@/router/index'
// import { checkAuthorization } from '@/utils/request'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

/**
 * The progress bar starts
 * @param to
 * @param form
 * @param next
 */
const progressStart = (to, from, next) => {
  // start progress bar
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
  next()
}

// /**
//  * Login guard
//  * @param to
//  * @param form
//  * @param next
//  * @param options
//  */
// const loginGuard = (to, from, next, options) => {
//   const { message } = options
//   if (!loginIgnore.includes(to) && !checkAuthorization()) {
//     message.warning('Login has expired, please log in again')
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// }

/**
 * Permission guard
 * @param to
 * @param form
 * @param next
 * @param options
 */
const authorityGuard = (to, from, next, options) => {
  const { store, message } = options
  const permissions = store.getters['account/permissions']
  const roles = store.getters['account/roles']
  if (!hasAuthority(to, permissions, roles)) {
    message.warning(
      `Sorry, you do not have permission to access the page: ${to.fullPath}, please contact the administrator`
    )
    next({ path: '/403' })
    // NProgress.done()
  } else {
    next()
  }
}

/**
 * Under-level menu redirection in hybrid navigation mode
 * @param to
 * @param from
 * @param next
 * @param options
 * @returns {*}
 */
const redirectGuard = (to, from, next, options) => {
  const { store } = options
  if (store.state.setting.layout === 'mix') {
    const firstMenu = store.getters['setting/firstMenu']
    if (firstMenu.find(item => item.fullPath === to.fullPath)) {
      store.commit('setting/setActivatedFirst', to.fullPath)
      const subMenu = store.getters['setting/subMenu']
      if (subMenu.length > 0) {
        return next({ path: subMenu[0].fullPath })
      }
    }
  }
  next()
}

/**
 * End of progress bar
 * @param to
 * @param form
 * @param options
 */
const progressDone = () => {
  // finish progress bar
  NProgress.done()
}

export default {
  beforeEach: [progressStart, authorityGuard, redirectGuard],
  afterEach: [progressDone]
}
