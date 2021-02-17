<template>
  <div>
    <div class="article-wrapper">
      <article v-for="(item, i) in list" :key="item.id" class="article-con">
        <Blur :bg-img="item.imageUrl" />
        <div :class="['article-pic', i % 2 && 'right']">
          <div v-lazy:background-image="item.imageUrl" class="item-pic" />
        </div>
        <div class="article-content">
          <div class="info">
            <span><svg-icon iconClass="time" style="color: #6CA4E6; font-size: 18px" /> {{item.createdAt | splitDate}}</span>
            <span style="margin-left: auto;"><svg-icon iconClass="hot" style="color: #ED5564; font-size: 18px" />{{item.views}}</span>
            <span v-if="item.tags.length"><svg-icon iconClass="tag" style="color: #1E9969; font-size: 18px" />
              <template v-if="item.tags.length > 1">
                <span v-for="(tag, i) in item.tags" :key="tag.id">{{ i > 0 ? '，' : '' }}{{ tag.name }}</span>
              </template>
              <template v-else>
                <span v-for="tag in item.tags" :key="tag.id">{{ tag.name }}</span>
              </template>
            </span>
          </div>
          <nuxt-link class="title" :to="`/article/${item.id}`" tag="h2">
            {{ item.title }}
          </nuxt-link>
          <span class="desc">
            {{item.contentShort}}
          </span>
        </div>
      </article>
      <Pagination :total="total" @currentChange="currentChange" />
    </div>
  </div>
</template>

<script>
// import { getArticleList } from '@/api/article'
// import { errno } from '@/config'
import Pagination from '@/components/Pagination'
import { formDate } from '@/utils'

export default {
  name: 'Index',
  layout: 'blog',
  components: { Pagination },
  data () {
    return {
    }
  },
  // filters: {
  //   commentsLen (comment) {
  //     const count = comment.length
  //     console.log(comment)
  //     // comment.forEach(item => {
  //     //   if (item.children.length) {
  //     //     count += item.children.length
  //     //   }
  //     // })
  //     return count
  //   }
  // },
  head () {
    return {
      title: '首页-玉捷博客',
      meta: [
        { hid: 'home', name: 'description', content: '玉捷-个人博客' }
      ]
    }
  },
  computed: {
    list () {
      return this.$store.state.article.list
    },
    total () {
      return this.$store.state.article.total
    }
  },
  methods: {
    currentChange (page) {
      // this.$store.commit('article/setQuery', { page: index })
      this.$store.dispatch('article/getList', { page })
    },
    formatToDate (v) {
      return formDate(v)
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
@import "~assets/css/base"
.article-wrapper
  font-size $font-size-small
  color $font-color
  .article-con
    position relative
    background-color $background-color
    overflow hidden
    box-sizing border-box
    display flex
    margin-bottom 15px
    height 200px
    transition all .3s
    border-radius 4px
    &:hover
      transform translateY(-5px)
    .article-pic
      width 40%
      z-index: 1;
      order 0
      clip-path: polygon(0 0, 100% 0%, 94% 100%, 0% 100%);
      &.right
        clip-path: polygon(6% 0, 100% 0%, 100% 100%, 0% 100%);
        order 2
      .item-pic
        height 100%
        width 100%
        background-size cover
        background-position center
    .article-content
      flex 1
      order 1
      z-index 1
      display flex
      //align-items center
      flex-direction column
      justify-content: center;
      padding 0 15px
      line-height 1.5
      color #fff
      .title
        font-size 22px
        color #fff
        letter-spacing 1px
        font-weight 700
        text-omit(1)
        margin-top 3px
        margin-bottom 5px
        cursor pointer
      .desc
        font-size 16px
        text-omit(2)
      .info
        display flex
        > span
          margin-left 10px
</style>
