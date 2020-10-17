/**
  * The resolve configuration of webpack-theme-color-replacer plugin
  * Configure resolve rules for specific css selectors.
  *
  * key is the value of css selector or a valid regular expression string
  * When the key sets the css selector value, it will match the corresponding css
  * When the key is set to a regular expression, it will match all css that satisfy this regular expression
  *
  * value can be set to boolean value false or an object
  * When value is false, this css will be ignored, that is, this css will not be included in webpack-theme-color-replacer management
  * When value is an object, the resolve function of the object will be called, and the cssText (original css text) and cssObj (css object) parameters will be passed in; the resolve function should return
  * Return a processed, legal css string (including selector)
  * Note: value cannot be set to true
  */
const cssResolve = {
  '.ant-checkbox-checked .ant-checkbox-inner::after': {
    resolve(cssText, cssObj) {
      cssObj.rules.push('border-top:0', 'border-left:0')
      return cssObj.toText()
    }
  },
  '.ant-checkbox-checked .ant-checkbox-inner:after': {
    resolve(cssText, cssObj) {
      cssObj.rules.push('border-top:0', 'border-left:0')
      return cssObj.toText()
    }
  },
  '.ant-menu-dark .ant-menu-inline.ant-menu-sub': {
    resolve(cssText, cssObj) {
      cssObj.rules = cssObj.rules.filter(rule => rule.indexOf('box-shadow') == -1)
      return cssObj.toText()
    }
  },
  '.ant-menu-horizontal>.ant-menu-item:hover,.ant-menu-horizontal>.ant-menu-submenu:hover,.ant-menu-horizontal>.ant-menu-item-active,.ant-menu-horizontal>.ant-menu-submenu-active,.ant-menu-horizontal>.ant-menu-item-open,.ant-menu-horizontal>.ant-menu-submenu-open,.ant-menu-horizontal>.ant-menu-item-selected,.ant-menu-horizontal>.ant-menu-submenu-selected': {
    resolve(cssText, cssObj) {
      cssObj.selector = cssObj.selector.replace(/.ant-menu-horizontal/g, '.ant-menu-horizontal:not(.ant-menu-dark)')
      return cssObj.toText()
    }
  },
  '.ant-menu-horizontal>.ant-menu-item-active,.ant-menu-horizontal>.ant-menu-item-open,.ant-menu-horizontal>.ant-menu-item-selected,.ant-menu-horizontal>.ant-menu-item:hover,.ant-menu-horizontal>.ant-menu-submenu-active,.ant-menu-horizontal>.ant-menu-submenu-open,.ant-menu-horizontal>.ant-menu-submenu-selected,.ant-menu-horizontal>.ant-menu-submenu:hover': {
    resolve(cssText, cssObj) {
      cssObj.selector = cssObj.selector.replace(/.ant-menu-horizontal/g, '.ant-menu-horizontal:not(.ant-menu-dark)')
      return cssObj.toText()
    }
  },
  '.ant-layout-sider': {
    resolve(cssText, cssObj) {
      cssObj.selector = '.ant-layout-sider-dark'
      return cssObj.toText()
    }
  },
  '/keyframes/': false
}

module.exports = cssResolve
