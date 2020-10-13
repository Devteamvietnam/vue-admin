// Route component registration
const routerMap = {
  home: {
    name: 'Home',
    component: () => import('@/pages/Home')
  },
  about: {
    name: 'About',
    component: () => import('@/pages/About')
  }
}
export default routerMap
