import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
// import { convertDate } from '@/utils/index'

dayjs
  .extend(relativeTime)
  .locale('zh-cn')

const formatDate = (date, str) => {
  return dayjs(date).format(str)
}

const convertDate = date => {
  return dayjs(date).fromNow()
}

[convertDate, formatDate].forEach(fn => {
  Vue.filter(fn.name, fn)
})
