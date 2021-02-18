const state = () => ({
  list: [],
  count: 0
})

const mutations = {
  setTagList (state, data) {
    state.list = data
  },
  setCount (state, data) {
    state.count = data
  }
}

const actions = {
  async getList ({ commit }) {
    const { data } = await this.$axios.$get('tagCount')
    commit('setTagList', data)
  },
  async getCount ({ commit }) {
    const { data } = await this.$axios.$get('tags/count')
    commit('setCount', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
