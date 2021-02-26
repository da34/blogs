const state = () => ({
  page: 1,
  archivePage: 1,
  list: [],
  total: 0,
  hotList: [],
  randomList: [],
  article: {},
  topArticle: []
})

const mutations = {
  setQuery (state, query) {
    for (const key in query) {
      state.query[key] = query[key]
    }
  },
  setData (state, payload) {
    state[payload.key] = payload.value
  },
  setArticles (state, { data, count }) {
    state.list = data
    state.total = count
  }
}

const actions = {
  // 获取文章列表
  async getList ({ commit, state }, query) {
    // console.log(query)
    /* eslint-disable */
    const { page, categoryId = 0 } = query
    // console.log(page)
    // console.log('获取分类')
    let params = `page=${page}&limit=7&status=0`
    if (categoryId) {
      params += `&categoryId=${categoryId}`
    }
    const { data } = await this.$axios.$get(`articles?${params}`)
    // console.log(data)
    commit('setArticles', { data: data.list.rows, count: data.list.count })
    commit('setData', { key: 'topArticle', value: data.topList })
    commit('setData', { key: 'page', value: page })
  },
  // 获取热门文章
  async getHotList ({ commit }) {
    const { data } = await this.$axios.$get(`article/hot?limit=5&status=0`)
    commit('setData', { key: 'hotList' , value: data.rows })
  },
  // 获取随机文章
  async getRandomList ({ commit }) {
    const { data } = await this.$axios.$get(`article/random?limit=5&status=0`)
    // console.log(data)
    commit('setData', { key: 'randomList' , value: data })
  },
  // 获取文章详情
  async getDetail ({ commit }, { id, type = 0 }) {
    const { data } = await this.$axios.$get(`articles/${id}?type=${type}`)
    // console.log(data)
    commit('setData', { key: 'article' , value: data })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
