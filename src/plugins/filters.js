import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
// import { convertDate } from '@/utils/index'
import { parseOS, parseBrowser } from '../utils'

dayjs
  .extend(relativeTime)
  .locale('zh-cn')

const formatDate = (date, str) => {
  return dayjs(date).format(str)
}

const convertDate = date => {
  return dayjs(date).fromNow()
}

// const parseBrowser = ua => {
//   const parser = new UAParser(ua)
//   const result = parser.getBrowser()
//   if (result.name) {
//     return result.name + ' ' + result.version
//   }
//   return ''
// }
// const parseOS = ua => {
//   const parser = new UAParser(ua)
//   const result = parser.getOS()
//   if (result.name) {
//     return result.name + ' ' + result.version
//   }
//   return ''
// }

// [convertDate, formatDate, parseBrowser, parseOS].forEach(fn => {
//   Vue.filter(fn.name, fn)
// })
Vue.filter('formatDate', formatDate)
Vue.filter('convertDate', convertDate)
Vue.filter('parseBrowser', parseBrowser)
Vue.filter('parseOS', parseOS)
