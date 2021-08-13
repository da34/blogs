import {asyncRouterMap, constantRouters} from '@/router/routes'
import {defineStore} from 'pinia'
import { toRaw } from 'vue'

// 找出角色对应的路由
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return route.meta.role.some(r => r === roles)
  } else {
    return true
  }
}

function filter(tree, func) {
  function listFilter(list) {
    return list
      .map((node) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children]);
        return func(node) || (node[children] && node[children].length);
      });
  }

  return listFilter(tree);
}



export const useAsyncRouteStore = defineStore('async-route', {
  // a function that returns a fresh state
  state: () => ({
    menus: [],
    routers: constantRouters,
    addRouters: [],
    keepAliveComponents: [],
  }),
  getters: {
    getMenus() {
      return this.menus;
    },
  },
  actions: {
    getRouters() {
      return toRaw(this.addRouters);
    },
    // 设置动态路由
    setRouters(routers) {
      this.addRouters = routers;
      this.routers = constantRouters.concat(routers);
    },
    setMenus(menus) {
      // 设置动态路由
      this.menus = menus;
    },
    setKeepAliveComponents(compNames) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames;
    },
    async generateRoutes(data) {
      let accessedRouters;
      const routeFilter = (route) => {
        const { meta } = route;
        const { permissions } = meta || {};
        if (!permissions) return true;
        return permissions.includes(data.permissions);
      };

      try {
        //过滤账户是否拥有某一个权限，并将菜单从加载列表移除
        accessedRouters = filter([ ...asyncRouterMap, ...constantRouters ], routeFilter);
      } catch (error) {
        console.log(error);
      }

      accessedRouters = accessedRouters.filter(routeFilter);
      this.setRouters(accessedRouters);
      this.setMenus(accessedRouters);
      return toRaw(accessedRouters);
    },
  },
})
