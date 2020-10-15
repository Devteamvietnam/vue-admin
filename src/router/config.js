import TabsView from '@/layouts/tabs/TabsView'
// import BlankView from '@/layouts/BlankView'
// import PageView from '@/layouts/PageView'

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
          path: 'Home',
          name: 'Dashboard',
          meta: {
            icon: 'dashboard'
          },
          component: () => import('@/pages/Home')
        },
        {
          path: 'about',
          name: 'About',
          meta: {
            icon: 'about'
          },
          component: () => import('@/pages/About')
        }
      ]
    }
  ]
}

export default options
