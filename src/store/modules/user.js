import { setToken, getToken, removeToken } from '@/utils/auth'
// const { prodURL } = require('@/config')
const state = () => ({
  token: getToken() || '',
  name: '',
  avatar: '',
  id: ''
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
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}
const actions = {
  login ({
    commit,
    dispatch
  }, query) {
    return new Promise((resolve, reject) => {
      const { url } = query
      // 弹出 500 * 500 的窗口
      window.open(url, '登录', 'height=500, width=800, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no')
      // 监听页面返回的数据
      window.addEventListener('message', e => {
        const { data } = e
        // console.log(data)
        if (data) {
          // 处理登录逻辑
          commit('SET_TOKEN', data)
          setToken(data)
          dispatch('getInfo')
          resolve()
        }
      })
    })
  },
  getInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get('userInfo').then(response => {
        /* eslint-disable */
        const {
          username,
          avatar,
          id
        } = response.data.data
        // console.log(response.data.data)
        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
        commit('SET_ID', id)
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
