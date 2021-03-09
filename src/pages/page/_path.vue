<template>
  <section>
    <div class="article-content">
      <Marked
        v-if="data"
        :value="data.content"
        :style="{
          padding: '3px 0 !important'
        }"
      />
      <Comments :comments="rows" :count="count" :replies-count="repliesCount" :article-id="articleId" @submitComplete="handleComment" />
    </div>
  </section>
</template>

<script>
import Marked from '@/components/Markdown'
import Comments from '@/components/Comments'
// import Blur from '@/components/Blur'
export default {
  name: 'Article', // 滚动到顶端
  components: {
    // Blur,
    Marked,
    Comments
  },
  layout: 'blog',
  scrollToTop: true,
  async asyncData ({
    query,
    $axios
  }) {
    // 获取评论
    const { data } = await $axios.$get(`comments?articleId=${query.q}`)
    const { count, rows, repliesCount } = data
    return {
      rows,
      count,
      repliesCount,
      articleId: query.q
    }
  },
  data () {
    return {}
  },
  async fetch ({
    store,
    query
  }) {
    await store.dispatch('article/getDetail', { id: query.q, type: 1 })
  },
  head () {
    return {
      title: `${this.data.title}-玉捷博客`,
      meta: [
        {
          hid: 'article',
          name: 'description',
          content: '玉捷-个人博客'
        },
        {
          hid: 'classify',
          vmid: 'keywords',
          content: this.category
        },
        {
          hid: 'content',
          vmid: 'description',
          content: this.data.content.slice(0, 50)
        }
      ]
    }
  },
  computed: {
    data () {
      // console.log(this.$store.getters.article)
      return this.$store.getters.article
    },
    category () {
      return this.data.category ? this.data.category.name : '玉捷-YuJie'
    }
  },
  methods: {
    async handleComment () {
      const { data } = await this.$axios.$get(`comments?articleId=${this.$route.query.q}`)
      const { count, rows, repliesCount } = data
      this.rows = rows
      this.count = count
      this.repliesCount = repliesCount
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
@import "~assets/css/base"

.article-content
  width 100%
  box-sizing border-box
  padding 0 15px
  background $background-color

  .show-foot
    padding 30px 5px
    font-size $font-size-small
    color $font-color-minor
    display: flex;
    justify-content: space-between;

@media (max-width: 768px)
  //.article-wrapper
  //  padding 5px 0
  .blog-post
    padding 10px 0 !important

  .show-foot
    padding 30px 5px !important

    .update
      display none

  .copyright
    padding 15px 0 !important
</style>
