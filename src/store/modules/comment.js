import { setLocalStore, getLocalStore } from '@/utils'

const STORE_KEY = 'y_Cache_Meta'
const state = () => ({
  userInfo: {}
})

const mutations = {
  setCommentList (state, data) {
    state.commentList = data
  },
  pushCommentList (state, data) {
    state.commentList.push(...data)
  },
  setCount (state, data) {
    state.count = data
  },
  setTotal (state, data) {
    state.total = data
  },
  setUserInfo (state, data) {
    state.userInfo = data
  },
  setPage (state) {
    state.page++
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
  actionUser ({ commit }, { nickName, email }) {
    // 存储用户信息到localStore
    const userInfo = {
      nickName,
      email
    }
    setLocalStore(STORE_KEY, userInfo)
    commit('setUserInfo', userInfo)
  },
  // 获取表情
  // async getEmoji ({ commit }) {
  //   const { expression } = await this.$axios.get('comment/Emoji')
  //   commit('setList', expression)
  // },
  // 发表评论
  // async postComment ({ commit }, comment) {
  //   const { nickName, email } = comment
  //   const data = await this.$axios.post('comments', comment)
  //   // 存储用户信息到localStore
  //   const userInfo = {
  //     nickName,
  //     email
  //   }
  //   setLocalStore(STORE_KEY, userInfo)
  //   commit('setUserInfo', userInfo)
  //   return data
  // },
  // 获取评论列表
  // async getCommentList ({ commit, state }, { contentId }) {
  //   const { page, limit } = state
  //   const { data } = await this.$axios.get(`comments?page=${page}&limit=${limit}&contentId=${contentId}`)
  //
  //   commit('setCommentList', data.result.comments.rows)
  //   commit('setCount', data.result.comments.count)
  //   commit('setTotal', data.result.total)
  // },
  // 获取更多评论列表
  async getMoreCommentList ({ commit, state }, { contentId }) {
    commit('setPage')
    const { page, limit } = state
    const { data } = await this.$axios.get(`comments?page=${page}&limit=${limit}&contentId=${contentId}`)
    commit('pushCommentList', data.result.comments.rows)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
