<template>
  <div class="bg-white rounded p-5 md:p-0">
    <LazyMarkdown :value="pageInfo.content" />
    <LazyComments v-if="pageInfo.isCommentOpen" class="md:px-10  pt-5" :post-id="$route.params.page" />
  </div>
</template>

<script>
export default {
  layout: 'blog',
  transition: 'slide-in',
  data () {
    return {
      pageInfo: {}
    }
  },
  async fetch () {
    const { page } = this.$route.params
    const { data } = await this.$axios.get(`page/${page}`)
    this.pageInfo = data.data
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
  },
  mounted () {
    const { page } = this.$route.params
    this.$axios.post(`page/${page}/views`)
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
