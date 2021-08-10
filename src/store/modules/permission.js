import { asyncRouterMap, constantRoutes } from '@/router/routes'

// 找出角色对应的路由
function hasPermission (roles, route) {
  if (route.meta && route.meta.role) {
    return route.meta.role.some(r => r === roles)
  } else {
    return true
  }
}

const state = () => ({
  addRoutes: [],
  routes: []
})

const mutations = {
  SET_ADD_ROUTES (state, routes) {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  async generateRoutes ({ commit }, roles) {
    await new Promise(resolve => {
      // 获取当前角色权限
      if (roles === 'normal') return
      const accessRouters = asyncRouterMap.filter(v => {
        if (hasPermission(roles, v)) {
          // 表示有子路由
          if (v.children && v.children.length > 0) {
            v.children = v.children.filter(child => {
              if (hasPermission(roles, child)) return child
              return false
            })
          }
          return v
        }
        return v
      })
      commit('SET_ADD_ROUTES', accessRouters)
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  actions
}
