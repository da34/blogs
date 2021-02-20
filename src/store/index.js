import article from './modules/article'
import tag from './modules/tag'
import comment from './modules/comment'
import user from './modules/user'
import front from './modules/front'
import getters from './getters'

const store = {
  modules: {
    article,
    tag,
    comment,
    user,
    front
  },
  getters,
  actions: {
    async nuxtServerInit ({ dispatch }, { req }) {
      await dispatch('article/getList', { page: 1 })
      await dispatch('front/getMenu')
      if (req.headers.cookie && req.headers.cookie.includes('Yujie-Token')) {
        await dispatch('user/getInfo')
      }
    },
    getToken () {
      return new Promise((resolve, reject) => {
        this.$axios.get('/qiniu/token').then(res => {
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default store
