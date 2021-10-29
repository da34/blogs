<template>
    <div class="article-wrapper">
      <p class="verse">
        每日一言：“ {{ verse }}”
      </p>
      <article v-for="item in list" :key="item.id" class="article">
        <!--      <div v-if="item.firstPicture" v-lazy:background-image="item.firstPicture" class="img" />-->
        <div v-if="item.firstPicture" class="img-wrap">
          <NuxtLink :to="`/content/${item.id}`" tag="div">
            <img v-lazy="item.firstPicture" class="img">
          </NuxtLink>
        </div>
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
      <Pagination v-model="currentPage" class="pagination-wrap" :total="total" :limit="7" @change="pageChange"/>
    </div>
</template>

<script>
import 'ant-design-vue/lib/divider/style/css'
import { mapState, mapActions, mapGetters } from 'vuex'
let scrollTo
if (process.client) {
  scrollTo = require('@/utils/scroll-to').scrollTo
}

export default {
  name: 'Index',
  layout: 'blog',
  transition: 'slide-in',
  // components: { Pagination },
  data () {
    return {
      currentPage: 1
    }
  },
  async fetch () {
    await this.getList({ page: this.currentPage })
    await this.getVerse()
  },
  head () {
    return {
      title: `首页-${this.site.name}`,
      meta: [
        {
          hid: 'home',
          name: 'description',
          content: this.site.name
        }
      ]
    }
  },
  computed: {
    ...mapState('modules/front', [
      'verse',
      'from'
    ]),
    ...mapState('modules/content', [
      'list',
      'total'
    ]),
    ...mapGetters([
      'site'
    ])
  },
  watch: {
    currentPage: '$fetch'
  },
  methods: {
    ...mapActions('modules/content', [
      'getList'
    ]),
    ...mapActions('modules/front', [
      'getVerse'
    ]),
    pageChange () {
      scrollTo(0)
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
  margin-bottom 10px
.article
  margin-bottom 20px
  border-radius-5()
  shadow-2-down()
  position relative
  background-color #fff
  border 1px solid $color-line-1
  width 100%
  display flex
  height 180px
  overflow hidden
  .img-wrap
    width 30%
    div
      width 100%
      height 100%
  .img
    width 100%
    height 100%
    object-fit cover
    //background-size: cover;
    //background-position: 50% 50%;
.article-content
  padding 20px 30px
  flex 1
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .title
    font-size $font-size-title
    cursor pointer
    font-weight bold
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

@media (max-width: $mobile)
  .article-wrapper
    padding 0 10px
  .verse
    padding 10px 20px
    margin-bottom 0
    display none
  .article-content
    .title
      text-omit(2)
      font-weight normal
      margin-bottom 10px
    .info
      justify-content start
  .article
    height 100%
    flex-direction column
    padding 20px
    margin-bottom 10px
    overflow hidden
    .img-wrap
      width 100%
      position relative
      padding-top 40%
      overflow hidden
      margin-bottom 10px
      border-radius-5()
    .img
      position absolute
      top 0
      width 100%
      height 100%
      //transform translate3d(-50%, -50%, 0)
  .article-content
    padding 0
  .read-more
    display none
.pagination-wrap.pagination
  padding 10px
</style>
