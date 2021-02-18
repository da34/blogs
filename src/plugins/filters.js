import Vue from 'vue'
import { convertDate } from '@/utils/index'

// const splitDate = date => {
//   return date.split(' ')[0]
// }
[convertDate].forEach(fn => {
  Vue.filter(fn.name + 'Filter', fn)
})
