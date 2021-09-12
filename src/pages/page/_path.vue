<template>
  <section class="article-content">
    <Marked :value="article.content" />
    <Comments v-if="article.commentDisabled" :content-id="$route.params.path" />
  </section>
</template>

<script>
import Marked from '@/components/Markdown'
import Comments from '@/components/Comments'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'DiyPage', // 滚动到顶端
  components: {
    Marked,
    Comments
  },
  layout: 'blog',
  scrollToTop: true,
  transition: 'slide-in',
  async fetch ({ store, params }) {
    await store.dispatch('modules/content/getDetail', { id: params.path })
  },
  head () {
    return {
      title: `${this.article.title}-${this.site.name}`,
      meta: [
        {
          hid: 'content',
          vmid: 'description',
          content: this.article.content.slice(0, 50)
        }
      ]
    }
  },
  computed: {
    ...mapState('modules/content', [
      'article'
    ]),
    ...mapGetters([
      'site'
    ])
  }
}
</script>

<style scoped lang="stylus">
.article-content
  width 100%
  padding 30px
  border 1px solid $color-line-1
  shadow-2-down()
  border-radius-5()
  background-color #fff
</style>
