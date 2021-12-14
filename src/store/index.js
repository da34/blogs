
import comment from './modules/comment'
import user from './modules/user'
import front from './modules/front'
import getters from './getters'

const store = {
  modules: {
    comment,
    user,
    front
  },
  getters,
  actions: {
    async nuxtServerInit ({ dispatch }, { req }) {
      await dispatch('modules/front/getMenus')
      await dispatch('modules/front/getConfigs')
    }
  }
}

export default store
