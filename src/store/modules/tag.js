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
    const { data } = await this.$axios.get('tags')
    commit('setTagList', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
