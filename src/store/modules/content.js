const state = () => ({
  content: '',
  nowToc: []
})

const mutations = {
  setNowToc (state, data) {
    state.nowToc = data
  },
  setContent (state, data) {
    state.content = data
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
