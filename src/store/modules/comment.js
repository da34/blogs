import { setLocalStore, getLocalStore } from '@/utils'

const STORE_KEY = 'y_Cache_Meta'
const state = () => ({
  commentList: [],
  newList: [],
  total: 0,
  count: 0,
  page: 1,
  limit: 10,
  userInfo: {}
})

const mutations = {
  setCommentList (state, data) {
    state.commentList = data
  },
  pushCommentList (state, data) {
    state.commentList.push(...data)
  },
  setNewList (state, data) {
    state.newList = data
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
  setPage (state, p) {
    state.page++
  }
}

const actions = {
  // 初始化用户信息
  initUser ({ commit }) {
    if (process.client) {
      const data = getLocalStore(STORE_KEY)
      commit('setUserInfo', data)
    }
  },
  // 获取表情
  // async getEmoji ({ commit }) {
  //   const { expression } = await this.$axios.get('comment/Emoji')
  //   commit('setList', expression)
  // },
  // 获取最新评论
  async getNewCommentList ({ commit }, { limit = 4 }) {
    const { data } = await this.$axios.get(`comments/new?limit=${limit}`)
    commit('setNewList', data)
  },
  // 发表评论
  async postComment ({ commit }, comment) {
    const { nickName, email } = comment
    const data = await this.$axios.post('comments', comment)
    // 存储用户信息到localStore
    const userInfo = {
      nickName,
      email
    }
    setLocalStore(STORE_KEY, userInfo)
    commit('setUserInfo', userInfo)
    return data
  },
  // 获取评论列表
  async getCommentList ({ commit, state }, { contentId }) {
    const { page, limit } = state
    const { data } = await this.$axios.get(`comments?page=${page}&limit=${limit}&contentId=${contentId}`)
    commit('setCommentList', data.comments.rows)
    commit('setCount', data.comments.count)
    commit('setTotal', data.total)
  },
  // 获取更多评论列表
  async getMoreCommentList ({ commit, state }, { contentId }) {
    commit('setPage')
    const { page, limit } = state
    const { data } = await this.$axios.get(`comments?page=${page}&limit=${limit}&contentId=${contentId}`)
    commit('pushCommentList', data.comments.rows)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
