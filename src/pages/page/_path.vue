<template>
  <section>
    <div class="article-content">
      <div class="blog-post">
        <article>
          <div class="post-content">
            <Marked v-if="data" :value="data.content" />
          </div>
        </article>
      </div>
      <Comments :comments="comments" :count="count" :article-id="articleId" @submitComplete="handleComment" />
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
    const result = await $axios.$get(`comments?articleId=${query.q}`)
    const comments = result.data.list
    const { count } = result.data
    return {
      comments,
      count,
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
    await store.dispatch('article/getDetail', { id: query.q, status: 3 })
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
      const { data } = await this.$axios.$get(`comments?articleId=${this.$route.query.id}`)
      const comments = data.list
      const { count } = data
      this.comments = comments
      this.count = count
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
@import "~assets/css/base"

.entry-thumbnail
  width: 100%;
  height: 300px
  position relative

  .article-bg
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-position center
    background-size cover
    filter brightness(.85)

  .article-header
    position relative
    color #fff
    z-index 200
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: flex-end;
    .article-info
      display flex
      justify-content flex-end
      padding 10px
      text-shadow: 0 0 5px rgb(35 35 35 / 50%), 0 0 5px rgb(35 35 35 / 50%);
      background: linear-gradient(0deg, transparent, rgba(0, 0, 0, .6));
      div
        margin-right 10px
        svg
          margin-right 7px
          font-size 20px
    .title
      width: 100%;
      text-shadow: 0 0 5px rgb(35 35 35 / 50%), 0 0 5px rgb(35 35 35 / 50%);
      font-size: 32px;
      background: linear-gradient(180deg, transparent, rgba(0, 0, 0, .6));
      padding: 25px 30px;
      p:first-child
        text-omit(3)

.article-content
  width 100%
  padding 0 20px
  box-sizing border-box
  background $background-color

  .blog-post
    font-size: 16px;

    .copyright
      background-color rgba(220, 220, 220, .7)
      margin 25px 0 0
      padding 15px 30px
      text-align center
      font-size $font-size-medium
      color $font-color-minor

      a
        font-size $font-size-small
        color $font-color-minor
        transition color .3s

        &:hover
          color $active-color

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
