import { getToken, getDiy } from '@/utils/auth'
// const debug = process.env.NODE_ENV !== 'production'

function csrfSafeMethod (method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS)$/i.test(method))
}

export default function ({
  $axios,
  redirect
}) {
  // 基本配置
  $axios.defaults.timeout = 10000
  $axios.defaults.withCredentials = true
  // $axios.onRequest(config => {
  //   const csrfToken = getDiy('CSRF-TOKEN')
  //   // console.log('测试111')
  //   if (process.client && !csrfSafeMethod(config.method)) {
  //     // const token = getToken()
  //     // config.headers.Authorization = `Bearer ${token}`
  //     // 带上csrfToken
  //     // config.headers['csrf-token'] = csrfToken
  //   }
  // })

  // 错误的回调
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // message.error(error.message)
      redirect('/400')
    }
  })
}
