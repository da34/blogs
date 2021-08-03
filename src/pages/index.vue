<template>
  <div class="article-wrapper">
    <p class="verse">
      每日一言：“ {{ verse }} ”
    </p>
    <article v-for="item in list" :key="item.id" class="article">
      <div v-if="item.firstPicture" v-lazy:background-image="item.firstPicture" class="img" />
      <div class="article-content">
        <NuxtLink class="title" :to="`/content/${item.id}`" tag="h2">
          {{ item.title }}
        </NuxtLink>
        <p class="desc">
          {{ item.contentOutline }}
        </p>
        <div class="info">
          <div v-if="item.tags.length" class="info-item">
            <SvgIcon icon-class="tag" />
            <nuxt-link v-for="(tag, i) in item.tags" :key="tag.id" class="tag" :to="'/archive?name=' + tag.name">
              <a-divider v-if="i!==0" type="vertical" />
              {{ tag.name }}
            </nuxt-link>
          </div>
          <div class="info-item">
            <SvgIcon icon-class="date" />{{ item.createdAt | convertDate }}
          </div>
          <div class="info-item">
            <SvgIcon icon-class="comment" />{{ item.comments.length }}
          </div>
          <NuxtLink class="read-more" :to="`/content/${item.id}`" tag="span">
            阅读全文
          </NuxtLink>
        </div>
      </div>
    </article>
    <Pagination :total="total" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import Pagination from '@/components/Pagination'

export default {
  name: 'Index',
  // components: { Pagination },
  layout: 'blog',
  async fetch ({ store }) {
    await store.dispatch('modules/front/getVerse')
    await store.dispatch('modules/content/getList')
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
    ...mapState('modules/front', [
      'verse'
    ]),
    ...mapState('modules/content', [
      'list',
      'total'
    ])
  },
  methods: {
    currentChange (page) {
      // this.$store.commit('content/setQuery', { page: index })
      this.$store.dispatch('content/getList', { page })
    }
  }
}
</script>

<style scoped lang="stylus">
.article-wrapper
  position: relative;

.verse
  font-size $font-size-medium
  color $color-subsidiary
  line-height 1.5
  font-weight bold
  margin-bottom 20px
.article
  margin-bottom 20px
  border 1px solid $color-line-1
  shadow-2-down()
  border-radius-5()
  width 100%
  position: relative;
  display flex
  height 180px
  .img
    width 30%
    height 100%
    background-size: cover;
.article-content
  padding 20px 30px
  flex 1
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .title
    font-size 24px
    cursor pointer
  .desc
    font-size $font-size-small
    color $color-content
    line-height 1.5
    font-weight 500
    text-omit(2)

  .info
    margin-top 10px
    font-size $font-size-small
    display flex
    justify-content: center;
    align-items: center;
    .info-item
      display flex
      justify-content center
      align-items center
      height 100%
      margin-right 20px
      svg
        margin-right 3px
    .tag
      position: relative;
      height 100%
      cursor pointer

    .read-more
      color $color-focus
      cursor pointer
      margin-left auto
</style>
