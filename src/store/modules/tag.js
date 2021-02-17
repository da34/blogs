const state = () => ({
  list: []
})

const mutations = {
  setTagList (state, data) {
    state.list = data
  }
}

const actions = {
  async getList ({ commit }) {
    const { data } = await this.$axios.$get(`tagCount`)
    commit('setTagList', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
