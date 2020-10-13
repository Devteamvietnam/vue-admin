// View component
const view = {
  tabs: () => import('@/layouts/tabs'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
}

// Route component registration
const routerMap = {
  login: {
    authority: '*',
    path: '/login',
    component: () => import('@/pages/login')
  },
  root: {
    path: '/',
    name: 'Home',
    redirect: '/login',
    component: view.tabs
  },
  dashboard: {
    name: 'Dashboard',
    component: view.blank
  },
  workplace: {
    name: 'Workbench',
    component: () => import('@/pages/dashboard/workplace')
  },
  analysis: {
    name: 'Analysis page',
    component: () => import('@/pages/dashboard/analysis')
  },
  form: {
    name: 'Form page',
    icon: 'form',
    component: view.page
  },
  basicForm: {
    path: 'basic',
    name: 'Basic form',
    component: () => import('@/pages/form/basic')
  },
  stepForm: {
    path: 'step',
    name: 'Step-by-step form',
    component: () => import('@/pages/form/step')
  },
  advanceForm: {
    path: 'advance',
    name: 'Advanced Form',
    component: () => import('@/pages/form/advance')
  },
  list: {
    name: 'List page',
    icon: 'table',
    component: view.page
  },
  queryList: {
    path: 'query',
    name: 'Inquiry Form',
    component: () => import('@/pages/list/QueryList')
  },
  primaryList: {
    path: 'primary',
    name: 'Standard List',
    component: () => import('@/pages/list/StandardList')
  },
  cardList: {
    path: 'card',
    name: 'Card List',
    component: () => import('@/pages/list/CardList')
  },
  searchList: {
    path: 'search',
    name: 'Search list',
    component: () => import('@/pages/list/search/SearchLayout')
  },
  article: {
    name: 'Article',
    component: () => import('@/pages/list/search/ArticleList')
  },
  application: {
    name: 'Application',
    component: () => import('@/pages/list/search/ApplicationList')
  },
  project: {
    name: 'Project',
    component: () => import('@/pages/list/search/ProjectList')
  },
  details: {
    name: 'Detail page',
    icon: 'profile',
    component: view.blank
  },
  basicDetails: {
    path: 'basic',
    name: 'Basic Details Page',
    component: () => import('@/pages/detail/BasicDetail')
  },
  advanceDetails: {
    path: 'advance',
    name: 'Advanced Details Page',
    component: () => import('@/pages/detail/AdvancedDetail')
  },
  result: {
    name: 'Result page',
    icon: 'check-circle-o',
    component: view.page
  },
  success: {
    name: 'Success',
    component: () => import('@/pages/result/Success')
  },
  error: {
    name: 'Failed',
    component: () => import('@/pages/result/Error')
  },
  exception: {
    name: 'Exception page',
    icon: 'warning',
    component: view.blank
  },
  exp403: {
    authority: '*',
    name: 'exp403',
    path: '403',
    component: () => import('@/pages/exception/403')
  },
  exp404: {
    name: 'exp404',
    path: '404',
    component: () => import('@/pages/exception/404')
  },
  exp500: {
    name: 'exp500',
    path: '500',
    component: () => import('@/pages/exception/500')
  },
  components: {
    name: 'Widget',
    icon: 'appstore-o',
    component: view.page
  },
  taskCard: {
    name: 'Task Card',
    component: () => import('@/pages/components/TaskCard')
  },
  palette: {
    name: 'Color checkbox',
    component: () => import('@/pages/components/Palette')
  }
}
export default routerMap
