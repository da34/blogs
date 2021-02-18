<template>
  <div v-if="data" class="article-wrapper">
    <div class="blog-post">
      <article>
<!--        <div v-if="data.imageUrl" class="entry-thumbnail">-->
<!--          <img :src="data.imageUrl" class="img">-->
<!--        </div>-->
        <div class="post-content">
          <Marked v-if="data" :value="data.content" />
        </div>
      </article>
      <div class="copyright">
        本作品采用
        <a href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank">知识共享署名-相同方式共享 4.0 国际许可协议</a>
        进行许可
      </div>
    </div>
    <div class="show-foot">
      <div v-if="data.tags && data.tags.length" class="tags">
<!--        <svg-icon name="tag" />-->
        <span v-for="tag in data.tags" :key="tag.name" class="tag">{{ tag.name }}</span>
      </div>
      <div v-if="data.updateAt !== 'Invalid date'" class="update">
<!--        <svg-icon name="date" />-->
        <span class="notebook">最后修改: {{ data.updateAt }}</span>
      </div>
    </div>
    <Comments :comments="comments" :count="count" :articleId="$route.params.id" @submitComplete="handleComment" />
  </div>
</template>

<script>
import Marked from '@/components/Markdown'
import Comments from '@/components/Comments'

export default {
  name: 'Article', // 滚动到顶端
  components: { Marked, Comments },
  layout: 'blog',
  scrollToTop: true,
  head () {
    return {
      title: `${this.data.title}-玉捷博客`,
      meta: [
        { hid: 'article', name: 'description', content: '玉捷-个人博客' },
        { hid: 'classify', vmid: 'keywords', content: this.category },
        { hid: 'content', vmid: 'description', content: this.data.content.slice(0, 50) }
      ]
    }
  },
  data () {
    return {
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
  async asyncData ({ params, $axios }) {
    // 获取评论
    const result = await $axios.$get(`comments?articleId=${params.id}`)
    const comments = result.data.list
    const { count } = result.data
    return {
      comments,
      count
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('article/getDetail', params.id)
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
.article-wrapper
  width 100%
  padding 0 20px
  box-sizing border-box
  background $background-color
  .blog-post
    //padding 10px 30px
    font-size: 16px;
    .entry-thumbnail
      margin-bottom 20px
      .img
        width 100%
        background url("https://img.cdn.lsyblog.com/avatar-bg.jpg") no-repeat 50% 50%
        border-radius 3px
    .copyright
      background-color rgba(220,220,220,.7)
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
    padding 30px
    font-size $font-size-small
    color $font-color-minor
    .update
      float right
      .icon-svg
        padding-right 3px
    .tags
      font-size $font-size-medium
      float left
      .icon-svg
        margin-right 10px
      .tag
        padding 3px 7px
        font-size 12px
        margin-right 5px
        background-color #aaa
        color $background-color
@media (max-width: 768px)
  //.article-wrapper
  //  padding 5px 0
  .blog-post
    padding 10px 0!important
  .show-foot
    padding 30px 5px!important
    .update
      display none
  .copyright
    padding 15px 0!important
</style>
