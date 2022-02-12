import comment from './modules/comment'
import front from './modules/front'
import getters from './getters'

const store = {
  modules: {
    comment,
    front
  },
  getters,
  actions: {
    async nuxtServerInit ({ dispatch }, { req }) {
      // await dispatch('modules/front/getConfigs')
    }
  }
}

export default store
