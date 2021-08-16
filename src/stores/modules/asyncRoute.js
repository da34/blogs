import {asyncRoutes, constantRouters} from '@/router/routes'
import {defineStore} from 'pinia'
import {store} from '@/stores'

function filter(tree, func) {

  function listFilter(list) {
    return list
      .map((node) => ({...node}))
      .filter((node) => {
        node['children'] = node['children'] && listFilter(node['children']);
        return func(node) || (node['children'] && node['children'].length);
        // return func(node);
      });
  }

  return listFilter(tree);
}


export const useAsyncRouteStore = defineStore('async-route', {
  // a function that returns a fresh state
  state: () => ({
    menus: [],
    addRouters: [],
    keepAliveComponents: [],
    dynamicAddedFlag: false
  }),
  getters: {
    getMenus: (state) => {
      return filter(state.menus, (menu) => {
        return !menu.hidden
      });
    },
  },
  actions: {
    // 设置动态路由
    setRouters(routers) {
      this.addRouters = routers;
    },
    setDynamicAddedFlag(bool) {
      this.dynamicAddedFlag = bool;
    },
    setMenus(menus) {
      // 设置动态路由
      this.menus = constantRouters.concat(menus);
    },
    setKeepAliveComponents(compNames) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames;
    },
    async generateRoutes(data) {
      let accessedRouters;
      const routeFilter = route => {
        const {meta} = route;
        const {permissions} = meta || {};
        if (!permissions) return true;
        return permissions.includes(data.permissions);
      };

      try {
        //过滤账户是否拥有某一个权限，并将菜单从加载列表移除
        accessedRouters = filter(asyncRoutes, routeFilter)
      } catch (error) {
        console.log(error);
      }

      accessedRouters = accessedRouters.filter(routeFilter);
      this.setRouters(accessedRouters);
      this.setMenus(accessedRouters);
      return accessedRouters
    },
  },
})

// Need to be used outside the setup
export function useAsyncRouteStoreOut() {
  return useAsyncRouteStore(store);
}
