<template>
  <section class="content-wrap">
    <div class="entry-thumbnail">
      <div
        v-if="article.firstPicture"
        class="article-bg"
        :style="{ backgroundImage: `url(${article.firstPicture})` }"
      />
      <div class="article-header">
        <h1 class="title">
          {{ article.title }}
        </h1>
        <div class="content-desc">
          {{ article.createdAt | formatDate('YYYY年MM月DD日') }}
          <a-divider type="vertical" />
          阅读：{{ article.views }}
        </div>
      </div>
    </div>
    <div class="article-content">
      <div class="blog-post">
        <Marked v-if="article" :value="article.content" />
        <div v-if="article.shareStatement" class="copyright">
          本作品采用
          <a href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank">知识共享署名-相同方式共享 4.0 国际许可协议</a>
          进行许可
        </div>
      </div>
      <div class="show-foot">
        <div v-if="article.tags.length" class="tags">
          <h2>tags：</h2>
          <span v-for="(tag, i) in article.tags" :key="tag.name"><a-divider v-if="i !== 0" type="vertical" />{{ tag.name }} </span>
        </div>
        <div v-else />
        <p>最后编辑于：{{ article.updatedAt | formatDate('YYYY年MM月DD日') }}</p>
      </div>
      <Comments :content-id="$route.params.id" />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Marked from '@/components/Markdown'
import Comments from '@/components/Comments'
export default {
  name: 'Content',
  components: {
    Marked,
    Comments
  },
  // async asyncData ({
  //   params,
  //   $axios
  // }) {
  //   // 获取评论
  //   const { data } = await $axios.$get(`comments?articleId=${params.id}`)
  //   const { rows, count, repliesCount } = data
  //   return {
  //     rows,
  //     count,
  //     repliesCount
  //   }
  // },
  layout: 'blog',
  scrollToTop: true,
  async fetch ({
    store,
    params
  }) {
    await store.dispatch('modules/content/getDetail', { id: params.id })
  },
  head () {
    return {
      title: `${this.article.title}-玉捷博客`,
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
    ])
  },
  methods: {
    // async handleComment () {
    //   const { data } = await this.$axios.$get(`comments?articleId=${this.$route.params.id}`)
    //   const { count, rows, repliesCount } = data
    //   this.rows = rows
    //   this.count = count
    //   this.repliesCount = repliesCount
    // }
  }
}
</script>

<style scoped lang="stylus">
.content-wrap
  border 1px solid $color-line-1
  shadow-2-down()
  border-radius-5()
.entry-thumbnail
  width: 100%;
  position relative
  display flex
  flex-direction column

  .article-bg
    background-position center
    background-size cover
    height 200px

  .article-header
    position relative
    color #fff
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px 30px;
    .content-desc
      margin-top 5px
      color $color-subsidiary
      font-size $font-size-small
    .title
      font-size: 24px
      color $color-title
      text-omit(1)

.article-content
  width 100%
  color $color-content
  padding 0 30px
  .copyright
    background-color rgba(220, 220, 220, .7)
    margin-top 25px
    padding 15px 30px
    text-align center
    font-size $font-size-medium
    color $color-subsidiary
    border-radius-5()
    a
      font-size $font-size-small
      color $color-subsidiary
  .show-foot
    padding 30px 5px
    font-size $font-size-small
    color $color-subsidiary
    display flex
    justify-content space-between
    .tags
      display flex
      h2
        font-size $font-size-medium
        font-weight 600
</style>
