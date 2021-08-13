const LOGIN_PAGE_NAME = 'Login'
const whitePathList = [LOGIN_PAGE_NAME]  // 路由白名单

const createRouterGuards = router => {
  router.beforeEach(async (to, from) => {
    // const hasToken = getToken() || true
    // 白名单直接通过
    if (whitePathList.includes(to.name)) {
      // console.log(to)
      return true
    }

    const hasToken = false

    // 没有token 重定向登录页面
    if (!hasToken) {
      return {
        name: LOGIN_PAGE_NAME,
        query: {
          redirectTo: to.fullPath,
        },
      }
    }
  });

  router.onError((error) => {
    console.log(error, '路由错误');
  });
}


export default createRouterGuards
