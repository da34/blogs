const state = () => ({
  menu: [],
  articleCollect: {}
})

const mutations = {
  setMenu (state, data) {
    state.menu = data
  },
  setArticleCollect (state, data) {
    state.articleCollect = data
  }
}

const actions = {
  async getMenu ({ commit }) {
    const { data } = await this.$axios.$get('menu')
    // console.log(data)
    commit('setMenu', data)
  },
  async getCollect ({ commit }) {
    const { data } = await this.$axios.$get('article/info-count')
    commit('setArticleCollect', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
