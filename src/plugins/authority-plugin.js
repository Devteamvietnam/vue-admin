/**
 * Obtain the permissions required for routing
 * @param permissions
 * @param route
 * @returns {Permission}
 */
const getRoutePermission = (permissions, route) => permissions.find(item => item.id === route.meta.authority.permission)
/**
 * Get the role required for routing
 * @param roles
 * @param route
 * @returns {Array[Role]}
 */
const getRouteRole = (roles, route) => {
  const requiredRoles = route.meta.authority.role
  return requiredRoles? roles.filter(item => requiredRoles.findIndex(required => required === item.id) !== -1): []
}
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
const auth = function(authConfig, permission, role, permissions, roles) {
  const {check, type} = authConfig
  if (check && typeof check ==='function') {
    return check.apply(this, [permission, role, permissions, roles])
  }
  if (type ==='permission') {
    return checkFromPermission(check, permission)
  } else if (type ==='role') {
    return checkFromRoles(check, role)
  } else {
    return checkFromPermission(check, permission) || checkFromRoles(check, role)
  }
}

/**
 * Check whether the authority has operation authority
 * @param check The operation authority to be checked
 * @param permission
 * @returns {boolean}
 */
const checkFromPermission = function(check, permission) {
  return permission && permission.operation && permission.operation.indexOf(check) !== -1
}

/**
 * Check whether roles have operation permissions
 * @param check The operation authority to be checked
 * @param roles role array
 * @returns {boolean}
 */
const checkFromRoles = function(check, roles) {
  if (!roles) {
    return false
  }
  for (let role of roles) {
    const {operation} = role
    if (operation && operation.indexOf(check) !== -1) {
      return true
    }
  }
  return false
}

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
      },
      methods: {
        /**
         * Operation authority verification
         * @param check The name of the operation to be verified
         * @param type The verification type, which is verified by permission or by role.
         * If it is not set, it will be automatically recognized, if it matches the current route permission, then type = permission, otherwise type = role
         * @returns {boolean} Is the verification passed
         */
        $auth(check, type) {
          const permissions = this.$store.getters['account/permissions']
          const roles = this.$store.getters['account/roles']
          const permission = getRoutePermission(permissions, this.$route)
          const role = getRouteRole(roles, this.$route)
          return auth.apply(this, [{check, type}, permission, role, permissions, roles])
        }
      }
    })
  }
}

export default AuthorityPlugin