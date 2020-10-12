import VueI18nPlugin from './i18n-extend'

const Plugins = {
  install: function(Vue) {
    Vue.use(VueI18nPlugin)
  }
}
export default Plugins
