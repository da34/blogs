const state = () => ({
  article: {},
  nowToc: []
})

const mutations = {
  setNowToc (state, data) {
    state.nowToc = data
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
