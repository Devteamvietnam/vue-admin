import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });

/**
 * Start of progress bar
 * @param to
 * @param form
 * @param next
 */
const progressStart = (to, from, next) => {
  // start progress bar
  if (!NProgress.isStarted()) {
    NProgress.start();
  }
  next();
};

  // redirect /login mode

/**
 * Login guard
 * @param to
 * @param form
 * @param next
 * @param options
 */
const loginGuard = (to, from, next) => {
  const user = localStorage.getItem('user')
  if (user === null) {
    if (to.path.search(/admin/) !== -1) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
};

/**
 * The next level menu redirection in the hybrid navigation mode
 * @param to
 * @param from
 * @param next
 * @param options
 * @returns {*}
 */
const redirectGuard = (to, from, next, options) => {
  const { store } = options;
  if (store.state.setting.layout === "mix") {
    const firstMenu = store.getters["setting/firstMenu"];
    if (firstMenu.find(item => item.fullPath === to.fullPath)) {
      store.commit("setting/setActivatedFirst", to.fullPath);
      const subMenu = store.getters["setting/subMenu"];
      if (subMenu.length > 0) {
        return next({ path: subMenu[0].fullPath });
      }
    }
  }
  next();
};

/**
 * End of progress bar
 * @param to
 * @param form
 * @param options
 */
const progressDone = () => {
  // finish progress bar
  NProgress.done();
};

export default {
  beforeEach: [progressStart, redirectGuard,loginGuard],
  afterEach: [progressDone]
};
