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
