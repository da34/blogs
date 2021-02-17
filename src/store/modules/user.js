import { setToken, getToken, removeToken } from '@/utils/auth'
const { prodURL } = require('@/config')
const state = () => ({
  token: getToken(),
  name: '',
  avatar: '',
  id: '',
  auth: ''
})

const mutations = {
  SET_NAME: (state, str) => {
    state.name = str
  },
  SET_AVATAR: (state, str) => {
    state.avatar = str
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_AUTH: (state, auth) => {
    state.auth = auth
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}
const actions = {
  loginGithub ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      // 获得窗口的垂直位置
      const iTop = (document.body.clientHeight - 30 - 500) / 2
      // 获得窗口的水平位置
      const iLeft = (document.body.clientWidth - 10 - 800) / 2
      const debug = process.env.NODE_ENV === 'production'
      // 弹出 500 * 500 的窗口
      const url = debug ? prodURL + 'auth/github' : 'http://127.0.0.1:7001/auth/github'
      window.open(url, '登录到Github',
        `height=500, width=800, top=${iTop}, left=${iLeft}, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no`)
      // 监听页面返回的数据
      window.addEventListener('message', e => {
        try {
          if (typeof e.data === 'string') {
            const { token } = JSON.parse(e.data)
            if (token) {
              // 处理登录逻辑
              setTimeout(() => {
                commit('SET_TOKEN', token)
                setToken(token)
                dispatch('getInfo')
                resolve()
              }, 200)
            }
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  },
  getInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get('userInfo').then(response => {
        /* eslint-disable */
        const { username, avatar, id, auth } = response.data.data
        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
        commit('SET_ID', id)
        commit('SET_AUTH', auth)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      // 置空用户相关的信息
      commit('SET_TOKEN', '')
      commit('SET_NAME', '')
      commit('SET_AVATAR', '')
      commit('SET_AUTH', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
