const state = () => ({
  verse: '温柔的晚风 ，傍晚的晚霞 ，解暑的西瓜 冒泡的可乐 ，人间的美好多着呢 !不要为眼前的黑暗所迷惑，你要相信自己配得上世间一切的美好。',
  from: '',
  articleCollect: {},
  menus: [],
  configs: []
})

const mutations = {
  setVerse (state, verse) {
    state.verse = verse
  },
  setFrom (state, from) {
    state.from = from
  },
  setArticleCollect (state, data) {
    state.articleCollect = data
  },
  setMenus (state, data) {
    state.menus = data
  },
  setConfigs (state, data) {
    state.configs = data
  }
}

const actions = {
  async getVerse ({ commit }) {
    const { data } = await this.$axios.get('outside/verse')
    commit('setVerse', data.result.hitokoto)
    commit('setFrom', data.result.from)
  },
  async getCollect ({ commit }) {
    const { data } = await this.$axios.get('site/info')
    commit('setArticleCollect', data.result)
  },
  async getMenus ({ commit }) {
    const { data } = await this.$axios.get('menu')
    commit('setMenus', data.result)
  },
  async getConfigs ({ commit }) {
    const keys = ['site']
    const { data } = await this.$axios.get('site/configs?keys=' + keys)
    console.log(data.result, 'data.configs')
    commit('setConfigs', data.result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
