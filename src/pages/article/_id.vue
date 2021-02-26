<template>
  <section>
    <div class="entry-thumbnail">
      <div
        class="article-bg"
        :style="{ backgroundImage: `url(${data.imageUrl || 'https://w.wallhaven.cc/full/k7/wallhaven-k77l97.jpg'})` }"
      />
      <div class="article-header">
        <h1 class="title">
          <p>{{ data.title }}</p>
          <div style="font-size: 15px;font-weight: normal;color: rgba(255,255,255,.9);margin-top: 5px;">
            {{ data.createdAt | formatDate('YYYY年MM月DD日') }}
            <Divider type="vertical"/>
            阅读：{{ data.views }}
          </div>
        </h1>
      </div>
    </div>
    <div class="article-content">
      <div class="blog-post">
        <article>
          <div class="post-content">
            <Marked v-if="data" :value="data.content"/>
          </div>
        </article>
        <div class="copyright">
          本作品采用
          <a href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank">知识共享署名-相同方式共享 4.0 国际许可协议</a>
          进行许可
        </div>
      </div>
      <div class="show-foot">
        <div class="tags">
          <Tag v-for="tag in data.tags" :key="tag.name" size="medium">
            {{ tag.name }}
          </Tag>
        </div>
        <p>最后编辑于：{{ data.updatedAt | formatDate('YYYY年MM月DD日') }}</p>
      </div>
      <Comments :comments="comments" :count="count" :article-id="$route.params.id" @submitComplete="handleComment"/>
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
    params,
    $axios
  }) {
    // 获取评论
    const result = await $axios.$get(`comments?articleId=${params.id}`)
    const comments = result.data.list
    const { count } = result.data
    return {
      comments,
      count
    }
  },
  data () {
    return {}
  },
  async fetch ({
    store,
    params
  }) {
    await store.dispatch('article/getDetail', { id: params.id })
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
      const { data } = await this.$axios.$get(`comments?articleId=${this.$route.params.id}`)
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
