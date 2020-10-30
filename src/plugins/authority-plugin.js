
/**
 * Determine whether the method has been injected authorization authentication
 * @param method
 * @returns {boolean}
 */
const hasInjected = (method) => method.toString().indexOf('//--auth-inject') !== -1

/**
 * Operation authority verification
 * @param authConfig
 * @param permission
 * @param role
 * @param permissions
 * @param roles
 * @returns {boolean}
 */

const checkInject = function (el, binding,vnode) {
  const type = binding.arg
  const check = binding.value
  const instance = vnode.context
  const $auth = instance.$auth
  if (!$auth || !$auth(check, type)) {
    addDisabled(el)
  } else {
    removeDisabled(el)
  }
}

const addDisabled = function (el) {
  if (el.tagName ==='BUTTON') {
    el.disabled = true
  } else {
    el.classList.add('disabled')
  }
  el.setAttribute('title','No such permission')
}

const removeDisabled = function (el) {
  el.disabled = false
  el.classList.remove('disabled')
  el.removeAttribute('title')
}

const AuthorityPlugin = {
  install(Vue) {
    Vue.directive('auth', {
      bind(el, binding,vnode) {
        setTimeout(() => checkInject(el, binding, vnode), 10)
      },
      componentUpdated(el, binding,vnode) {
        setTimeout(() => checkInject(el, binding, vnode), 10)
      },
      unbind(el) {
        removeDisabled(el)
      }
    })
    Vue.mixin({
      beforeCreate() {
        if (this.$options.authorize) {
          const authorize = this.$options.authorize
          Object.keys(authorize).forEach(key => {
            if (this.$options.methods[key]) {
              const method = this.$options.methods[key]
              if (!hasInjected(method)) {
                let authConfig = authorize[key]
                authConfig = (typeof authConfig ==='string')? {check: authConfig}: authConfig
                const {check, type, onFailure} = authConfig
                this.$options.methods[key] = function () {
                  //--auth-inject
                  if (this.$auth(check, type)) {
                    return method.apply(this, arguments)
                  } else {
                    if (onFailure && typeof onFailure ==='function') {
                      this[`$${check}Failure`] = onFailure
                      return this[`$${check}Failure`](check)
                    } else {
                      this.$message.error(`Sorry, you do not have operation authority: ${check}`)
                    }
                    return 0
                  }
                }
              }
            }
          })
        }
      }
    })
  }
}

export default AuthorityPlugin