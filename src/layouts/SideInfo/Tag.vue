<template>
  <Card class="box-card">
    <div slot="title" class="box-header">
      随便看看
    </div>
    <div
      v-for="article in list"
      :key="article.id"
      class="article"
    >
      <div class="bg-pic" :style="{ backgroundImage: `url(${article.imageUrl || 'https://w.wallhaven.cc/full/n6/wallhaven-n628ox.jpg)'}  ` }"></div>
      <div>
        <nuxt-link style="margin-bottom: 3px;" :to="`/article/${article.id}`" tag="h3">
          {{ article.title }}
        </nuxt-link>
        <svg-icon iconClass="time" style="font-size: 14px" />
        <span>  {{ article.createdAt | splitDate }}</span>
      </div>
    </div>
  </Card>
</template>

<script>
// import SvgIcon from '../../components/SvgIcon/index'
// import { getTagList } from '@/api/tag'
// import { errno } from '@/config'
// const phoneWidth = 768
export default {
  name: 'Tag',
  components: { },
  filters: {
    splitDate (date) {
      return date.split(' ')[0]
    }
  },
  data () {
    return {
      // tagList: []
    }
  },
  async fetch () {
    await this.$store.dispatch('article/getRandomList')
  },
  computed: {
    list () {
      return this.$store.state.article.randomList
    }
  },
  async created () {
    // eslint-disable-next-line nuxt/no-globals-in-created
    // const { width } = document.documentElement.getBoundingClientRect()
    // // 如果是手机不请求
    // if (phoneWidth < width) {
    //   // this.fetchTagList()
    // }
  },
  methods: {
    // async fetchTagList () {
    //   const data = await getTagList()
    //   if (data.code === errno) {
    //     this.tagList = data.data
    //   }
    // }
  }
}
</script>

<style scoped lang="stylus">
  @import "~assets/css/theme"
>>> .el-card__header
      padding 10px 15px
.box-card
  position: sticky!important;
  top: 70px;
  //margin-top 10px
.article
  position relative
  margin-bottom 10px
  height 115px
  color #fff
  display flex
  flex-direction column-reverse
  cursor pointer
  &:last-child
    margin-bottom 0
  .bg-pic
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-size cover
    background-position center center
    border-radius 5px
  div
    height 55%
    padding 0 10px
    padding-top 15px
    box-sizing border-box
    background: linear-gradient(to bottom, rgba(0,0,0,0), rgb(0,0,0));
    z-index 2
  h3
    font-size 14px
    font-weight 500
  span
    font-size 12px
</style>
