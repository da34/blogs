import UAParser from 'ua-parser-js'

/**
 *   函数节流
 *   @param {function}  callback
 *   @param {Number}  delay
 * */
export function throttle (callback, delay = 1000) {
  let timeout
  return function () {
    const args = arguments
    if (!timeout) {
      timeout = setTimeout(_ => {
        timeout = null
        callback.apply(this, args)
      }, delay)
    }
  }
}

/**
 *   提取标题
 *   @param {String}  content
 *
 * */

export function getToc (content) {
  let list = []
  let result = ''
  const levelStack = []
  const reg = /<h[1-3].*>.*?<\/h[1-3]>/gi
  // 把所有标题找到
  list = content.match(reg)
  // console.log(1111, list)
  const addStartUL = () => {
    result += '<ul class="catalog-list">'
  }
  const addEndUL = () => {
    result += '</ul>\n'
  }
  const addLI = (itemId, itemText) => {
    result += `<li class="item" ><a href="#${itemId}">${itemText}</a></li>`
  }
  list && list.forEach((item, index) => {
    let itemId = item.match(/id=[^.<>]+/g) // 匹配h标签的ID
    if (itemId !== null) {
      itemId = itemId.length && itemId[0].replace(/id="+/g, '')
      const itemText = item.replace(/<[^>]+>/g, '') // 匹配h标签的文字
      const itemLabel = item.match(/h[1-3]/)[0] // 匹配h[1-3]标签
      let levelIndex = levelStack.indexOf(itemLabel) // 判断数组里有无h标签
      // 新增ul li
      if (levelIndex === -1) {
        levelStack.unshift(itemLabel)
        addStartUL()
        addLI(itemId, itemText)
      } else if (levelIndex === 0) { // 对应的标签。添加li
        addLI(itemId, itemText)
      } else {
        // eslint-disable-next-line no-const-assign
        while (levelIndex--) {
          levelStack.shift()
          addEndUL()
        }
        addLI(itemId, itemText)
      }
    }
  })
  return result
}

/**
 *   位数补齐
 *   @param {String}  str    (要补的字符串)
 *   @param {Number}  location (0 前面, 1后面)
 *   @param {Number}  count    (小于多少位开始)
 *   @param {String}  patch    (补什么)
 * */
export function padLocation (str, location = 0, count = 2, patch = '0') {
  const arr = ['padStart', 'padEnd']
  if (typeof str === 'object') {
    return
  }
  if (typeof str === 'string') {
    return str[arr[location]](count, patch)
  } else if (typeof str === 'number') {
    return str.toString()[arr[location]](count, patch)
  }
}

const dateToMs = date => {
  return new Date(date).getTime()
}

/**
 *   时间转换 -- **前
 *   @param {Date}  date
 *
 *  1 分钟之前，返回“刚刚”
 * 1 分钟到 1 小时之间，返回“xx 分钟前”
 * 1 小时到 1 天之间，返回“xx 小时前”
 * 1 天到 1 个月（假设固定为 31 天）之间，返回“xx 天前”
 * 大于 1 个月，返回“xx 月前”
 * 大于 1 年，返回“xx 年前”
 * */

export const convertDate = date => {
  // const ONE_SECOND = 1000   // 秒
  const ONE_MINUTE = 60000 // 分
  const ONE_HOUR = 3600000 // 时
  const ONE_DAY = 86400000 // 天
  const ONE_MONTH = 2629746000 // 月
  const ONE_YEAR = 31556952000 // 年
  // const ONE_SECOND_STR = '秒前'
  const ONE_MINUTE_STR = '分钟前'
  const ONE_HOUR_STR = '小时前'
  const ONE_DAY_STR = '天前'
  const ONE_MONTH_STR = '月前'
  const ONE_YEAR_STR = '年前'
  const time = Date.now() - dateToMs(date)
  if (time < ONE_MINUTE) {
    return '刚刚'
  } else if (time < ONE_HOUR) { // 分钟
    return ~~(time / ONE_MINUTE) + ONE_MINUTE_STR
  } else if (time < ONE_DAY) { // 小时
    return ~~(time / ONE_HOUR) + ONE_HOUR_STR
  } else if (time < ONE_MONTH) { // 天
    return ~~(time / ONE_DAY) + ONE_DAY_STR
  } else if (time < ONE_YEAR) { // 月
    return ~~(time / ONE_MONTH) + ONE_MONTH_STR
  } else { // 年
    return ~~(time / ONE_YEAR) + ONE_YEAR_STR
  }
}

// export const parseAgent = (ua, isAgent) => {
//   const AGENT_REG = {
//     ie: /msie (\d+\.\d+)/i,
//     chrome: /chrome[^\s]+/i,
//     firefox: /firefox\/(\d+\.\d+)/i,
//     safari: /safari[^"]+/i,
//     QQBrowser: /QQBrowser[^)]+/i,
//     UBrowser: /UBrowser[^\s]+/i
//   }
//   const SYSTEM_REG = {
//     android: /msie (\d+\.\d+)/i,
//     chrome: /chrome[^\s]+/i,
//     firefox: /firefox\/(\d+\.\d+)/i,
//     safari: /safari[^"]+/i,
//     QQBrowser: /QQBrowser[^)]+/i,
//     UBrowser: /UBrowser[^\s]+/i
//   }
//   let result
//   // IE
//   return result.length ? result[0] : ''
// }

export const getLocalStore = key => {
  let data = localStorage.getItem(key)
  if (data) {
    data = JSON.parse(data)
  }
  return data
}

export const setLocalStore = (key, data) => {
  if (data) {
    data = JSON.stringify(data)
  }
  localStorage.setItem(key, data)
}

export const parseBrowser = ua => {
  const parser = new UAParser(ua)
  const result = parser.getBrowser()
  if (result.name) {
    return result.name + ' ' + result.version
  }
  return ''
}
export const parseOS = ua => {
  const parser = new UAParser(ua)
  const result = parser.getOS()
  if (result.name) {
    return result.name + ' ' + result.version
  }
  return ''
}
