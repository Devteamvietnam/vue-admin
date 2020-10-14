// Routing configuration
const options = {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/Home')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/pages//About')
    }
  ]
}

export default options
