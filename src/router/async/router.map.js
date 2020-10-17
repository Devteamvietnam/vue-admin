// view component
const view = {
  tabs: () => import("@/layouts/tabs"),
  blank: () => import("@/layouts/BlankView"),
  page: () => import("@/layouts/PageView")
};

// route map
const routerMap = {
  dashboard: {
    name: "Dashboard",
    component: view.blank
  },
  workplace: {
    name: "WorkPlace",
    component: () => import("@/pages/dashboard/workplace")
  },
  analysis: {
    name: "Analysis",
    component: () => import("@/pages/dashboard/analysis")
  },
  exception: {
    name: "Exception",
    icon: "warning",
    component: view.blank
  },
  exp403: {
    authority: "*",
    name: "exp403",
    path: "403",
    component: () => import("@/pages/exception/403")
  },
  exp404: {
    name: "exp404",
    path: "404",
    component: () => import("@/pages/exception/404")
  },
  exp500: {
    name: "exp500",
    path: "500",
    component: () => import("@/pages/exception/500")
  }
};
export default routerMap;
