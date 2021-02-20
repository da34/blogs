const state = () => ({
  expression: {},
  newList: [],
  count: 0
})

const mutations = {
  setList (state, data) {
    state.expression = data
  },
  setNewList (state, data) {
    state.newList = data
  },
  setCount (state, data) {
    state.count = data
  }
}

const actions = {
  // 获取表情
  async getEmoji ({ commit }) {
    const { expression } = await this.$axios.$get('comment/Emoji')
    commit('setList', expression)
  },
  // 获取最新评论
  async getCommentList ({ commit }, { limit = 4 }) {
    const { data } = await this.$axios.$get(`comments/new?limit=${limit}`)
    // console.log(data)
    commit('setNewList', data)
  },
  // 获取评论总数
  async getCommentCount ({ commit }) {
    const { data } = await this.$axios.$get('comments/count')
    // console.log(data)
    commit('setCount', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
