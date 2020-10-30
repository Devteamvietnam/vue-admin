/**
 * Determine whether there is routing permission
 * @param authority routing authority configuration
 * @returns {boolean|*}
 */
// show drawer
function hasPermission(authority) {
  let required ='*'
  if (typeof authority ==='string') {
    required = authority
  } else if (typeof authority ==='object') {
    required = authority.permission
  }
  return required ==='*' || (authority && authority.findIndex(item => item === required || item.id === required) !== -1)
}

/**
 * Determine whether there is a role required for routing
 * @param authority routing authority configuration
 * @param roles user role collection
 */
function hasRole(authority, roles) {
  let required = undefined
  if (typeof authority ==='object') {
    required = authority.role
  }
  return authority ==='*' || hasAnyRole(required, roles)
}

/**
 * Determine whether there is any role needed
 * @param required {String | Array[String]} The required role, which can be a single role or an array of roles
 * Roles owned by @param roles
 * @returns {boolean}
 */
function hasAnyRole(required, roles) {
  if (!required) {
    return false
  } else if(Array.isArray(required)) {
    return roles.findIndex(role => {
      return required.findIndex(item => item === role || item === role.id) !== -1
    }) !== -1
  } else {
    return roles.findIndex(role => role === required || role.id === required) !== -1
  }
}

/**
 * Routing permission verification
 * @param route route
 * @param roles user role collection
 * @returns {boolean}
 */
function hasAuthority(route, roles) {
  const authorities = [...route.meta.pAuthorities, route.meta.authority]
  for (let authority of authorities) {
    if (!hasPermission(authority) && !hasRole(authority, roles)) {
      return false
    }
  }
  return true
}

/**
 * Filter menu data according to permission configuration
 * @param menuData
 * @param permissions
 * @param roles
 */
function filterMenu(menuData, roles) {
  menuData.forEach(menu => {
    if (menu.meta && menu.meta.invisible === undefined) {
      if (!hasAuthority(menu, roles)) {
        menu.meta.invisible = true
      }
      if (menu.children && menu.children.length> 0) {
        filterMenu(menu.children, roles)
      }
    }
  })
}

export {filterMenu, hasAuthority}