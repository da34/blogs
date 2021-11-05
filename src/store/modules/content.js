const state = () => ({
  content: '',
  nowToc: [],
  isLoading: true
})

const mutations = {
  setNowToc (state, data) {
    state.nowToc = data
  },
  setContent (state, data) {
    state.content = data
  },
  setIsLoading (state, bool) {
    state.isLoading = bool
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
