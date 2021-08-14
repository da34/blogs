import { useUserStoreOut } from "@/stores/modules/user";
import { useAsyncRouteStoreOut } from '@/stores/modules/asyncRoute'
import { storage } from "@/utils/Storage";
import { ACCESS_TOKEN } from "../stores/mutation-types";

const LOGIN_PAGE_NAME = 'Login'
const whitePathList = [LOGIN_PAGE_NAME]  // 路由白名单

const userStore = useUserStoreOut()
const asyncRouteStore = useAsyncRouteStoreOut()

const createRouterGuards = router => {
  router.beforeEach(async (to, from) => {
    // 白名单直接通过
    if (whitePathList.includes(to.name)) {
      return true
    }

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

    const userInfo = await userStore.GetInfo()
    const routes = await asyncRouteStore.generateRoutes(userInfo)

    // 动态添加可访问路由表
    routes.forEach((item) => {
      router.addRoute(item);
    });
  });

  router.afterEach((to) => {
    // 设置title
    document.title = (to?.meta?.title) || document.title;
    console.log(to)
    // 在这里设置需要缓存的组件名称
    const keepAliveComponents = asyncRouteStore.keepAliveComponents;
    const currentComName = to.matched.find((item) => item.name === to.name)?.name;
    if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
      // 需要缓存的组件
      keepAliveComponents.push(currentComName);
    } else if (!to.meta?.keepAlive || to.name === 'Redirect') {
      // 不需要缓存的组件
      const index = asyncRouteStore.keepAliveComponents.findIndex((name) => name === currentComName);
      if (index !== -1) {
        keepAliveComponents.splice(index, 1);
      }
    }
    asyncRouteStore.setKeepAliveComponents(keepAliveComponents);
  });

  router.onError((error) => {
    console.log(error, '路由错误');
  });
}


export default createRouterGuards
