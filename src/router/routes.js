import TabsView from "@/layouts/tabs/TabsView";
import BlankView from "@/layouts/BlankView";
import PageView from "@/layouts/PageView";

// Config route
const options = {
  mode: 'history',
  routes: [
    {
      path:'/login',
      name:'Login page',
      component: () => import('@/pages/login')
    },
    {
      path:'/register',
      name:'Register page',
      component: () => import('@/pages/register')
    },
    {
      path:'/forgot',
      name:'Forgot page',
      component: () => import('@/pages/forgot')
    },
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
                  closable: true
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
        },
        {
          path: "account",
          name: "Account",
          meta: {
            icon: "user",
            closable: true
          },
          component: PageView,
          children: [
            {
              path: "basicsettings",
              name: "BaseSettings",
              component: () => import("@/pages/account")
            }
          ]
        },
      ]
    }
  ]
};

export default options;
