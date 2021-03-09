<template>
  <div class="article-wrapper">
    <article v-for="item in list" :key="item.id">
      <div v-if="item.imageUrl" v-lazy:background-image="item.imageUrl" class="item-pic"/>
      <div class="article-content">
        <NuxtLink class="title" :to="`/article/${item.id}`" tag="h2">
          {{ item.title }}
        </NuxtLink>
        <span class="desc">
          {{ item.contentShort }}
        </span>
        <ul class="info">
          <li>
            <SvgIcon icon-class="time"/>
            <span>{{ item.createdAt | convertDate }}</span>
          </li>
          <li>
            <SvgIcon icon-class="comment"/>
            <span>{{ item.comments.length + item.replies.length }}</span>
          </li>
          <li v-if="item.tags.length">
            <SvgIcon icon-class="tag"/>
            <template v-if="item.tags.length > 1">
              <span v-for="(tag, i) in item.tags" :key="tag.id">{{ i > 0 ? '，' : '' }}{{ tag.name }}</span>
            </template>
            <template v-else>
              <span v-for="tag in item.tags" :key="tag.id">{{ tag.name }}</span>
            </template>
          </li>
        </ul>
      </div>
    </article>
    <Pagination :total="total" @currentChange="currentChange"/>
  </div>
</template>

<script>
// import { getArticleList } from '@/api/article'
// import { errno } from '@/config'
import Pagination from '@/components/Pagination'
import { convertDate } from '@/utils'

export default {
  name: 'Index',
  components: { Pagination },
  layout: 'blog',
  data () {
    return {}
  },
  head () {
    return {
      title: '首页-玉捷博客',
      meta: [
        {
          hid: 'home',
          name: 'description',
          content: '玉捷-个人博客'
        }
      ]
    }
  },
  computed: {
    list () {
      return this.$store.state.article.list
    },
    total () {
      return 0
    }
  },
  methods: {
    currentChange (page) {
      // this.$store.commit('article/setQuery', { page: index })
      this.$store.dispatch('article/getList', { page })
    },
    formatToDate (v) {
      return convertDate(v)
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/base"
.article-wrapper
  font-size $font-size-small
  color $font-color

  article
    margin-bottom 20px
    background #fff

    .article-content
      padding 20px

      .title
        color #17233d
        margin-bottom 15px
        cursor pointer
        text-omit(3)

      .desc
        color #515a6e
        text-omit(3)

      .info
        display flex
        margin-top 15px

        li
          margin-right 20px
          display flex
          align-items center

          span
            font-size 16px
            color #808695

        svg
          font-size 17px
          margin-right 5px

  .item-pic
    height 200px
    background-position: center;
    background-size: cover;

@media (max-width: 768px)

  .article-wrapper
    article
      margin-bottom 10px
</style>
