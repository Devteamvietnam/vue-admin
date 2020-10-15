//View component
const view = {
  tabs: () => import('@/layouts/tabs'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
}

// Route component registration
const routerMap = {
  // login: {
  //   authority: '*',
  //   path: '/login',
  //   component: () => import('@/pages/login')
  // },
  root: {
    path: '/',
    name: 'Home',
    // redirect: '/login',
    component: view.tabs
  },
  home: {
    name: 'Dashboard',
    component: () => import('@/pages/Home')
  },
  about: {
    name: 'About',
    component: () => import('@/pages/About')
  }
}
export default routerMap
