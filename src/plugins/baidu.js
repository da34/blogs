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
// (function() {
//   var hm = document.createElement("script");
//   hm.src = "https://hm.baidu.com/hm.js?5b99c5e02b32a75352918797567fe14d";
//   var s = document.getElementsByTagName("script")[0];
//   s.parentNode.insertBefore(hm, s);
// })();
