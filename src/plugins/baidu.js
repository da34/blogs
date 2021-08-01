export default ({ app: { router }, store }) => {
  /* 每次路由变更时进行pv统计 */
  router.afterEach((to, from) => {
    try {
      /* 告诉增加一个PV */
      window._hmt = window._hmt || []
      window._hmt.push(['_trackPageview', to.fullPath])
    } catch (e) {}
  })
}
