const state = () => ({
  isLoading: true
})

const mutations = {
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
