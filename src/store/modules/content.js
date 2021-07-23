const state = () => ({
  page: 1,
  list: [],
  total: 0,
  article: {},

  archivePage: 1,
  randomList: [],
  tocArticle: '' // 需要生成目录的文章
})

const mutations = {
  setQuery (state, query) {
    for (const key in query) {
      state.query[key] = query[key]
    }
  },
  setData (state, payload) {
    state[payload.key] = payload.value
    console.log(2222, state)
  },
  setTocArticle (state, data) {
    state.tocArticle = data
  },
  setArticles (state, {
    data,
    count
  }) {
    state.list = data
    state.total = count
  }
}

const actions = {
  // 获取文章列表
  async getList ({ commit, state }) {
    const page = state.page
    const params = `page=${page}&limit=7`
    const { rows, count } = await this.$axios.$get(`contents?${params}`)
    commit('setArticles', {
      data: rows,
      count
    })
    // commit('setData', {
    //   key: 'page',
    //   value: page
    // })
  },
  // 获取随机文章
  async getRandomList ({ commit }) {
    const { data } = await this.$axios.$get('content/random?limit=5&status=0')
    // console.log(data)
    commit('setData', {
      key: 'randomList',
      value: data
    })
  },
  // 获取文章详情
  async getDetail ({ commit }, {
    id
  }) {
    const data = await this.$axios.$get(`contents/${id}`)
    // console.log(1111, data)
    commit('setData', {
      key: 'article',
      value: data
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
