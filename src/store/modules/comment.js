import { setLocalStore, getLocalStore } from '@/utils'

const STORE_KEY = 'y_Cache_Meta'
const state = () => ({
  commentList: [],
  newList: [],
  count: 0,
  page: 1,
  limit: 10,
  userInfo: {}
})

const mutations = {
  setCommentList (state, data) {
    state.commentList = data
  },
  setNewList (state, data) {
    state.newList = data
  },
  setCount (state, data) {
    state.count = data
  },
  setUserInfo (state, data) {
    state.userInfo = data
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
  async getEmoji ({ commit }) {
    const { expression } = await this.$axios.get('comment/Emoji')
    commit('setList', expression)
  },
  // 获取最新评论
  // async getCommentList ({ commit }, { limit = 4 }) {
  //   const { data } = await this.$axios.get(`comments/new?limit=${limit}`)
  //   // console.log(data)
  //   commit('setNewList', data)
  // },
  // 发表评论
  async postComment ({ commit }, comment) {
    const { nickName, email } = comment
    const { code, message } = await this.$axios.post('comments', comment)
    console.log(code, message)
    // if (code === 0) {
    //   this.$message.success('评论成功')
    // } else {
    //   this.$message.error(message)
    // }
    // 存储用户信息到localStore
    const userInfo = {
      nickName,
      email
    }
    setLocalStore(STORE_KEY, userInfo)
    commit('setUserInfo', userInfo)
  },
  // 获取评论列表
  async getCommentList ({ commit, state }, { contentId }) {
    const { page, limit } = state
    const { data } = await this.$axios.get(`comments?page=${page}&limit=${limit}&contentId=${contentId}`)
    commit('setCommentList', data.rows)
    commit('setCount', data.count)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
