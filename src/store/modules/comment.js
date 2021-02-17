const state = () => ({
  expression: {},
  newList: []
})

const mutations = {
  setList (state, data) {
    state.expression = data
  },
  setNewList (state, data) {
    state.newList = data
  }
}

const actions = {
  // 获取表情
  async getEmoji ({ commit }) {
    const { expression } = await this.$axios.$get('comment/Emoji')
    commit('setList', expression)
  },
  // 获取最新评论
  async getCommentList ({ commit }) {
    const { data } = await this.$axios.$get('comments/new')
    // console.log(data)
    commit('setNewList', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
