<template>
  <div class="bg-white rounded p-5 md:p-0">
    <Markdown :value="article.content" />
  </div>
</template>

<script>
export default {
  layout: 'blog',
  transition: 'slide-in',
  data () {
    return {
      article: {}
    }
  },
  async fetch () {
    const { page } = this.$route.params
    const { data } = await this.$axios.get(`contents/page/${page}`)
    this.article = data.data
  },
  head () {
    return {
      title: '关于-玉捷 Code',
      meta: [
        {
          hid: 'home',
          name: 'description',
          content: '玉捷 Code'
        }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
@media (max-width: 419px) {
  .bg-white {
    >>> .vuepress-markdown-body:not(.custom) {
      padding: 0;
    }
  }
}
</style>
