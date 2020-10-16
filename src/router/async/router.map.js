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
    name: 'Dashboard',
    // redirect: '/login',
    component: view.tabs
  },
  dashboard: {
    name: 'Dashboard',
    component: view.blank
  },
  analysis: {
    name: 'Analysis',
    component: () => import('@/pages/dashboard/analysis')
  },
  demo: {
    name: 'Demo Page',
    icon: 'demo',
    component: view.page
  },
  Home: {
    path: 'home',
    name: 'About',
    component: () => import('@/pages/Home')
  },
  About: {
    path: 'about',
    name: 'About',
    component: () => import('@/pages/About')
  }
}
export default routerMap
