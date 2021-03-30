<template>
  <div class="tag-wrapper">
    <div class="tag-title">
      <h1>{{ $route.params.name }}<small>标签</small></h1>
    </div>
    <div>
      <article v-for="article in articleList" :key="article.id" class="post-type-normal">
        <div class="post-header">
          <span class="time">{{ article.createdAt | formatDate('MM-DD') }}</span>
          <nuxt-link
            :to="{ name: 'article-id', params: { id: article.id } }"
            class="title"
          >
            {{ article.title }}
          </nuxt-link>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  layout: 'blog',
  async asyncData ({ params, $axios }) {
    const { name } = params
    const { data } = await $axios.$get(`/article/tag?name=${encodeURI(name)}`)
    return {
      articleList: data
    }
  },
  head () {
    return {
      title: '标签-玉捷博客',
      meta: [
        {
          hid: 'home',
          name: 'description',
          content: '玉捷-个人博客'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/css/theme"
.tag-wrapper
  padding 60px
  background #fff
  .tag-title
    margin 20px 0
    h1
      display inline-block
      color #17233d
      font-size 25px
    small
      color #808695
      font-size 18px
      font-weight 700
      margin-left 5px
.post-type-normal
  position relative
  font-size $font-size-medium
.post-header
  margin 20px 0 15px
  padding-left 70px
  position relative

  &:hover
    .time
      color $active-color
  &:before
    position absolute
    top 8px
    left 0
    content ''
    width 6px
    height 6px
    z-index 5
    background-color #97dffd
    border-radius 3px
  .time
    position absolute
    top 3px
    left 20px
    font-size $font-size-mini
</style>
