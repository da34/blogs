<template>
  <div class="bg-white">
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
    const { data } = await this.$axios.get('contents/detail/about')
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
  >>>.vuepress-markdown-body:not(.custom) {
    padding: 0;
    padding-top 1rem
  }
}
}
</style>
