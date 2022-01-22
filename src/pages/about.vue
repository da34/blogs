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
    const { data } = await this.$axios.get('contents/about')
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

<style scoped>

</style>
