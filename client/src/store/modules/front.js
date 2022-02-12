const state = () => ({
  renderCompToc: ''
})

const mutations = {
  setRenderCompToc (state, data) {
    state.renderCompToc = data
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
