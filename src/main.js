import Vue from 'vue'
import App from './App.vue'
import { initRouter } from './router'
import './registerServiceWorker'
import './css/index.less'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import store from './store'
import 'animate.css/source/animate.css'
import Plugins from '@/plugins'
import { initI18n } from '@/utils/i18n'
import bootstrap from './boostrap'

const router = initRouter(store.state.setting.asyncRoutes)
const i18n = initI18n('US', 'VI')

Vue.use(Antd)
Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Plugins)

bootstrap({ router, store, i18n, message: Vue.prototype.$message })

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
