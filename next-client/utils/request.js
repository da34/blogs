export default async function request(url, options = {}) {
  const baseApi = process.env.API_PREFIX || 'http://127.0.0.1:7001/api'
  // 判断是否传入url
  url = url || options.url
  const pointUrl = baseApi + url
  // console.log(baseApi)
  const res = await fetch(pointUrl, options)
  return res.json()
}