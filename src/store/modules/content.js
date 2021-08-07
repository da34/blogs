const state = () => ({
  list: [],
  total: 0,
  article: {},
  randomList: [],
  archive: {}
})

const mutations = {
  setData (state, payload) {
    state[payload.key] = payload.value
  },
  setArchive (state, data) {
    state.archive = data
  },
  setArticles (state, { data, count }) {
    state.list = data
    state.total = count
  }
}

const actions = {
  // 获取文章列表
  async getList ({ commit }, { page = 1 }) {
    const params = `page=${page}&limit=7`
    const { rows, count } = await this.$axios.$get(`contents?${params}`)
    commit('setArticles', {
      data: rows,
      count
    })
  },
  // // 获取文章列表
  // async getMoreList ({ commit, state }, { p }) {
  //   commit('setPage', p)
  //   const page = state.page
  //
  //   const params = `page=${page}&limit=2`
  //   const { rows, count } = await this.$axios.get(`contents?${params}`)
  //   commit('setArticles', {
  //     data: rows,
  //     count
  //   })
  // },
  // 获取随机文章
  async getRandomList ({ commit }) {
    const data = await this.$axios.$get('content/random?limit=5')
    commit('setData', {
      key: 'randomList',
      value: data
    })
  },
  // 获取文章详情
  async getDetail ({ commit }, { id }) {
    const data = await this.$axios.$get(`contents/${id}`)
    // console.log(1111, data)
    commit('setData', {
      key: 'article',
      value: data
    })
  },
  // 获取文章归档
  async getArchiveList ({ commit }, { name }) {
    let query = ''
    if (name) {
      query = '?name=' + encodeURI(name)
    }
    const { data } = await this.$axios.get('content/archive' + query)
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
