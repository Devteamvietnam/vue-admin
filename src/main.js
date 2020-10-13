import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './css/index.less'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import 'animate.css/source/animate.css'
import Plugins from '@/plugins'
import { initI18n } from '@/utils/i18n'

const i18n = initI18n('VI', 'US')

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(Viser)
Vue.use(Plugins)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
