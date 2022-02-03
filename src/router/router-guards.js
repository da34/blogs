import {useUserStoreOut} from '@/stores/modules/user';
import {useAsyncRouteStoreOut} from '@/stores/modules/asyncRoute'
import {storage} from '@/utils/Storage';
import {ACCESS_TOKEN} from '../stores/mutation-types';

const LOGIN_PAGE_NAME = 'login'
const whitePathList = [LOGIN_PAGE_NAME]  // 路由白名单

const userStore = useUserStoreOut()
const asyncRouteStore = useAsyncRouteStoreOut()

// console.log('window.$loadingBar', window.$loadingBar)
const createRouterGuards = router => {
  router.beforeEach(async (to, from) => {
    const loading = window.$loading || null
    loading && loading.start()
    // 白名单直接通过
    if (whitePathList.includes(to.name)) {
      return true
    }
    // console.log(2111111111111)
    const token = storage.get(ACCESS_TOKEN);
    // 没有token 重定向登录页面
    if (!token) {
      return {
        name: LOGIN_PAGE_NAME,
        query: {
          redirectTo: to.fullPath,
        },
      }
    }

    // 如果动态添加过路由，正常通过
    if (asyncRouteStore.dynamicAddedFlag) {
      return
    }

    const userInfo = await userStore.GetInfo()
    const routes = await asyncRouteStore.generateRoutes(userInfo)

    // 动态添加可访问路由表
    routes.forEach((item) => {
      router.addRoute(item);
    });

    const redirectPath = (from.query.redirect || to.path);
    const redirect = decodeURIComponent(redirectPath);
    const nextData = to.path === redirect ? {...to, replace: true} : {path: redirect};
    asyncRouteStore.setDynamicAddedFlag(true);
    return nextData
  });

  router.afterEach((to) => {
    // 设置title
    document.title = (to?.meta?.title) || document.title;

    // 在这里设置需要缓存的组件名称
    const keepAliveComponents = asyncRouteStore.keepAliveComponents;
    const currentComName = to.matched.find((item) => item.name === to.name)?.name;
    if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
      // 需要缓存的组件
      keepAliveComponents.push(currentComName);
    } else if (!to.meta?.keepAlive || to.name === 'RedirectCon') {
      const toComName = to.params.toComName
      // 不需要缓存的组件 or 重定向的需要刷新
      const index = asyncRouteStore.keepAliveComponents.findIndex((name) => name === currentComName);
      const toIndex = asyncRouteStore.keepAliveComponents.findIndex((name) => name === toComName);
      if (index !== -1) {
        keepAliveComponents.splice(index, 1);
      }
      if (toIndex !== -1) {
        keepAliveComponents.splice(toIndex, 1);
      }
    }
    // console.log(keepAliveComponents, currentComName)
    asyncRouteStore.setKeepAliveComponents(keepAliveComponents);
    const loading = window.$loading || null
    loading && loading.finish()
  });

  router.onError((error) => {
    console.log(error, '路由错误');
    const loading = window.$loading || null
    loading && loading.error()
  });
}


export default createRouterGuards
