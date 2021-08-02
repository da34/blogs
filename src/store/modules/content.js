const state = () => ({
  page: 1,
  list: [],
  total: 0,
  article: {},
  randomList: [],
  archive: {}
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
  setArchive (state, data) {
    console.log(11111111, data)
    state.archive = data
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
  },
  // 获取随机文章
  async getRandomList ({ commit }) {
    const data = await this.$axios.$get('content/random?limit=5')
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
  },
  // 获取文章归档
  async getArchiveList ({ commit }) {
    const { data } = await this.$axios.get('content/archive')
    const { count, items } = data
    commit('setArchive', {
      items,
      count
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
