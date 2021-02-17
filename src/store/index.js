import article from './modules/article'
import tag from './modules/tag'
import comment from './modules/comment'
import user from './modules/user'
import category from './modules/category'
import getters from './getters'

const store = {
  modules: {
    article,
    tag,
    comment,
    user,
    category
  },
  getters,
  actions: {
    async nuxtServerInit ({ dispatch }, { req }) {
      await dispatch('article/getList', { page: 1 })
      // await dispatch('article/getHotList')
      await dispatch('article/getRandomList')
      // await dispatch('tag/getList')
      // await dispatch('category/getList')
      await dispatch('comment/getCommentList')
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
