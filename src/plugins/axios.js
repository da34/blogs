import { Message } from 'view-design'
import { getToken, getDiy } from '@/utils/auth'
// const debug = process.env.NODE_ENV !== 'production'

function csrfSafeMethod (method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/i.test(method))
}

export default function ({
  $axios,
  redirect
}) {
  // 基本配置
  $axios.defaults.timeout = 10000
  $axios.onRequest(config => {
    const csrfToken = getDiy('csrfToken')
    // console.log('测试111')
    if (process.client && !csrfSafeMethod(config.method)) {
      const token = getToken()
      config.headers.Authorization = `Bearer ${token}`
      // 带上csrfToken
      config.headers['x-csrf-token'] = csrfToken
    }
    // console.log(11, config)
  })

  // 错误的回调
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      Message.error(error.message)
      redirect('/400')
    }
  })
}
