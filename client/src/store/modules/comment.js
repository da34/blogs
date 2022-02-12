import { setLocalStore, getLocalStore } from '@/utils'

const STORE_KEY = 'y_Cache_Meta'
const state = () => ({
  userInfo: {}
})

const mutations = {
  setUserInfo (state, data) {
    state.userInfo = data
  }
}

const actions = {
  // 初始化用户信息
  initUser ({ commit }) {
    if (process.client) {
      const data = getLocalStore(STORE_KEY) || {}
      commit('setUserInfo', data)
    }
  },
  actionUser ({ commit }, { name, email }) {
    // 存储用户信息到localStore
    const userInfo = {
      name,
      email
    }
    setLocalStore(STORE_KEY, userInfo)
    commit('setUserInfo', userInfo)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
