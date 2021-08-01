const state = () => ({
  verse: '温柔的晚风 ，傍晚的晚霞 ，解暑的西瓜 冒泡的可乐 ，人间的美好多着呢 !不要为眼前的黑暗所迷惑，你要相信自己配得上世间一切的美好。',
  articleCollect: {}
})

const mutations = {
  setVerse (state, verse) {
    state.verse = verse
  },
  setArticleCollect (state, data) {
    state.articleCollect = data
  }
}

const actions = {
  async getVerse ({ commit }) {
    const { data } = await this.$axios.get('outside/verse')
    // console.log(11111111, data)
    commit('setVerse', data.hitokoto)
  },
  async getCollect ({ commit }) {
    const { data } = await this.$axios.$get('content/info-count')
    commit('setArticleCollect', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
