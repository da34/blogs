// 引用svg图标
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/icons/svg', true, /\.svg$/)
// console.log(req, 'req')
requireAll(req)
