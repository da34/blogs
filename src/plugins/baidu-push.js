// export default ({ app: { router } }) => {
//   router.afterEach(() => {
//     try {
//       const bp = document.createElement('script')
//       bp.setAttribute('id', 'baidu-push')
//       const curProtocol = window.location.protocol.split(':')[0]
//       if (curProtocol === 'https') {
//         bp.src = 'https://*****/push.js'
//       } else {
//         bp.src = 'http://*****/push.js'
//       }
//       const scripts = document.getElementsByTagName('script')
//       const links = document.getElementsByTagName('link')
//       const s = links[0]
//       const curr = [...scripts].find(s => s.id === 'baidu-push')
//       if (curr) { s.parentNode.removeChild(curr) }
//       s.parentNode.insertBefore(bp, s)
//     } catch (e) {}
//   })
// }
