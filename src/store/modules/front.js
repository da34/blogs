const state = () => ({
  articleCollect: {},
  configs: [],
  renderCompToc: ''
})

const mutations = {
  setArticleCollect (state, data) {
    state.articleCollect = data
  },
  setConfigs (state, data) {
    state.configs = data
  },
  setRenderCompToc (state, data) {
    state.renderCompToc = data
  }
}

const actions = {
  async getCollect ({ commit }) {
    const { data } = await this.$axios.get('site/info')
    commit('setArticleCollect', data.result)
  },
  async getConfigs ({ commit }) {
    const keys = ['site']
    const { data } = await this.$axios.get('site/configs?keys=' + keys)
    // console.log(data.result, 'data.configs')
    commit('setConfigs', data.result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
