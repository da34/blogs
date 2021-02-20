const state = () => ({
  menu: []
})

const mutations = {
  setMenu (state, data) {
    state.menu = data
  }
}

const actions = {
  async getMenu ({ commit }) {
    const { data } = await this.$axios.$get('menu')
    // console.log(data)
    commit('setMenu', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
