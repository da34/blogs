<template>
  <p v-if="$fetchState.pending">
    Fetching mountains...
  </p>
  <section v-else class="content-wrap">
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
        <Marked :value="article.content" :is-article="true" />
        <div v-if="article.shareStatement" class="copyright">
          本作品采用
          <a href="https://creativecommons.org/licenses/by/4.0/deed.zh" target="_blank">知识共享署名-相同方式共享 4.0 国际许可协议</a>
          进行许可
        </div>
      </div>
      <div class="show-foot">
        <div v-if="article.tags.length" class="tags">
          <svg-icon icon-class="tag" />
          <span v-for="(tag, i) in article.tags" :key="tag.name"><a-divider v-if="i !== 0" type="vertical" />{{ tag.name }} </span>
        </div>
        <!--        <div v-else />-->
        <p>最后编辑于：{{ article.updatedAt | formatDate('YYYY年MM月DD日') }}</p>
      </div>
      <Comments v-if="article.commentDisabled" :content-id="$route.params.id" />
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Marked from '@/components/Markdown'
import Comments from '@/components/Comments'
export default {
  name: 'Content',
  components: {
    Marked,
    Comments
  },
  layout: 'blog',
  scrollToTop: true,
  transition: 'slide-out',
  data () {
    return {
      article: {}
    }
  },
  async fetch () {
    const { id } = this.$route.params
    const { data } = await this.$axios.get(`contents/${id}`)
    this.article = data.result
    this.setData({ key: 'article', value: this.article })
  },
  head () {
    return {
      title: `${this.article.title}-${this.site.name}`,
      meta: [
        {
          hid: 'content',
          vmid: 'description',
          content: this.article.content?.slice(0, 50)
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'site'
    ])
  },
  methods: {
    ...mapMutations('modules/content', [
      'setData'
    ])
  }
}
</script>

<style scoped lang="stylus">
.content-wrap
  border 1px solid $color-line-1
  shadow-2-down()
  border-radius-5()
  z-index: 1;
  background-color #fff
  position relative
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
    padding 10px
    text-align center
    font-size $font-size-small
    color $color-subsidiary
    border-radius-5()
    a
      font-size $font-size-mini
      color $color-subsidiary
  .show-foot
    padding 30px 5px
    font-size $font-size-small
    color $color-subsidiary
    display flex
    justify-content space-between
    .tags
      display flex
      justify-content center
      align-items center
      svg
        margin-right 5px
        color $color-content
        font-weight 600
        font-size $font-size-medium
>>> .vuepress-markdown-body:not(.custom)
  padding 0
@media (max-width: $mobile)
  .article-content
    padding 0 20px
  .entry-thumbnail
    .article-header
      padding 20px 20px 0
</style>
