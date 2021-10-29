import Vue from 'vue'
import SvgIcon from '@/components/base/SvgIcon'// svg component

// register globally
Vue.component('SvgIcon', SvgIcon)

// 引用svg图标
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/icons/svg', true, /\.svg$/)
// console.log(req, 'req')
requireAll(req)
