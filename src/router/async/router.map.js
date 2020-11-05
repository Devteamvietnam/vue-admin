// view component
const view = {
  tabs: () => import("@/layouts/tabs"),
  blank: () => import("@/layouts/BlankView"),
  page: () => import("@/layouts/PageView")
};

// route map local
const routerMap = {
  login: {
    authority: '*',
    path: '/login',
    component: () => import('@/pages/admin/login')
  },
  register: {
    authority: '*',
    path: '/register',
    component: () => import('@/pages/admin/register')
  },
  root: {
    path: '/admin',
    name: 'Home',
    redirect: '/login',
    component: view.tabs
  },
  dashboard: {
    name: "Dashboard",
    component: view.blank
  },
  workplace: {
    name: "WorkPlace",
    component: () => import("@/pages/admin/dashboard/workplace")
  },
  analysis: {
    name: "Analysis",
    component: () => import("@/pages/admin/dashboard/analysis")
  },
  exception: {
    name: "Exception",
    icon: "warning",
    component: view.blank
  },
  account: {
    name: "Account",
    icon: "user",
    component: view.page
  },
  basicsettings: {
    name: "BaseSettings",
    component: () => import("@/pages/admin/account/settings")
  },
  accountcenter: {
    name: "AccountCenter",
    component: () => import("@/pages/admin/account/center")
  },
  list: {
    name: "List",
    component: () => import("@/pages/admin/list/table")
  },
  exp403: {
    authority: "*",
    name: "exp403",
    path: "403",
    component: () => import("@/pages/admin/exception/403")
  },
  exp404: {
    name: "exp404",
    path: "404",
    component: () => import("@/pages/admin/exception/404")
  },
  exp500: {
    name: "exp500",
    path: "500",
    component: () => import("@/pages/admin/exception/500")
  }
};
export default routerMap;