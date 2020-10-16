import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// Routing configuration
const options = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: TabsView,
      // redirect: '/login',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: {
            icon: 'dashboard'
          },
          component: BlankView,
          children: [
            {
              path: 'analysis',
              name: 'Analysis',
              meta: {
                page: {
                  closable: false
                }
              },
              component: () => import('@/pages/dashboard/analysis')
            }
          ]
        },
        {
          path: 'demo',
          name: 'Demo Page',
          meta: {
            icon: 'demo'
          },
          component: PageView,
          children: [
            {
              path: 'home',
              name: 'Home',
              component: () => import('@/pages/Home')
            },
            {
              path: 'about',
              name: 'Step Page',
              component: () => import('@/pages/About')
            }
          ]
        }
      ]
    }
  ]
}

export default options
