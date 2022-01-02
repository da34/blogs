<template>
  <div class="bg-white">
    <Markdown :value="article.content" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    this.article = data.result
  },
  head () {
    return {
      title: `关于-${this.site.name}`,
      meta: [
        {
          hid: 'home',
          name: 'description',
          content: this.site.name
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'site'
    ])
  }
}
</script>

<style scoped>

</style>
