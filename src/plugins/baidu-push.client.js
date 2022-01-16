export default ({ app }) => {
  const _hmt = _hmt || []
  const hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?ff9817d3b7be6870545de152aa89f89d'
  const s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
  app.router.afterEach((to, from) => {
    _hmt.push(['_trackPageview', to.path])
  })
}
