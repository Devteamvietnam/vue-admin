import TabsView from "@/layouts/tabs/TabsView";
import BlankView from "@/layouts/BlankView";
import PageView from "@/layouts/PageView";

// Config route
const options = {
  mode: 'history',
  routes: [
    // Client
    {
      path: '/',
      name: 'Home page',
      component: () => import('@/pages/client/Home.vue')
    },
    {
      path: '/login',
      name: 'Login page',
      component: () => import('@/pages/admin/login')
    },
    {
      path: '/register',
      name: 'Register page',
      component: () => import('@/pages/admin/register')
    },
    {
      path: '/forgot',
      name: 'Forgot page',
      component: () => import('@/pages/admin/forgot')
    },
    {
      path: "*",
      name: "404",
      component: () => import("@/pages/admin/exception/404")
    },
    {
      path: "/403",
      name: "403",
      component: () => import("@/pages/admin/exception/403")
    },
    // Admin
    {
      path: "/admin",
      name: "Admin Home",
      component: TabsView,
      children: [{
          path: "dashboard",
          name: "Dashboard",
          meta: {
            icon: "dashboard"
          },
          component: BlankView,
          children: [{
              path: "workplace",
              name: "WorkPlace",
              meta: {
                page: {
                  closable: true
                }
              },
              component: () => import("@/pages/admin/dashboard/workplace")
            },
            {
              path: "analysis",
              name: "Analysis",
              meta: {
                page: {
                  closable: true
                }
              },
              component: () => import("@/pages/admin/dashboard/analysis")
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
          children: [{
              path: "accountcenter",
              name: "AccountCenter",
              component: () => import("@/pages/admin/account/center")
            }
          ]
        },
        {
          path: "list",
          name: "List",
          meta: {
            icon: "table",
            closable: true
          },
          component: PageView,
          children: [{
              path: "table",
              name: "Table",
              component: () => import("@/pages/admin/list/table")
            }
          ]
        }
      ]
    },
    {
      path: '*', redirect: '/404', hidden: true
    }
  ]
};

export default options;