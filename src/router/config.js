import TabsView from "@/layouts/tabs/TabsView";
import BlankView from "@/layouts/BlankView";
// import PageView from "@/layouts/PageView";

// Config route
const options = {
  mode: 'history',
  routes: [
    {
      path: "*",
      name: "404",
      component: () => import("@/pages/exception/404")
    },
    {
      path: "/403",
      name: "403",
      component: () => import("@/pages/exception/403")
    },
    {
      path: "/",
      name: "Login",
      component: TabsView,
      // redirect: '/login',
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          meta: {
            icon: "dashboard"
          },
          component: BlankView,
          children: [
            {
              path: "workplace",
              name: "WorkPlace",
              meta: {
                page: {
                  closable: false
                }
              },
              component: () => import("@/pages/dashboard/workplace")
            },
            {
              path: "analysis",
              name: "Analysis",
              component: () => import("@/pages/dashboard/analysis")
            }
          ]
        },
        {
          path: "exception",
          name: "Exception",
          meta: {
            icon: "warning"
          },
          component: BlankView,
          children: [
            {
              path: "404",
              name: "Exp404",
              component: () => import("@/pages/exception/404")
            },
            {
              path: "403",
              name: "Exp403",
              component: () => import("@/pages/exception/403")
            },
            {
              path: "500",
              name: "Exp500",
              component: () => import("@/pages/exception/500")
            }
          ]
        }
      ]
    }
  ]
};

export default options;
