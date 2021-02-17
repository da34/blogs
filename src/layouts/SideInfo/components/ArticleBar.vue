<template>
  <div>
    <ul
      v-loading="false"
      class="list-group"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 1)"
    >
      <nuxt-link v-for="item in list" :key="item.id" tag="li" :to="{ name: 'article-id', params: { id: item.id} }" class="list-group-item">
        <div class="article-title">
          <h3 class="desc hover-active">
            # {{ item.title }}
          </h3>
        </div>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
import { formDate } from '@/utils'

// const phoneWidth = 768

export default {
  name: 'ArticleBar',
  filters: {
    formToDate (v) {
      return formDate(v)
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      loading: true
    }
  },
  created () {
    // if (process.client) {
    //   const { width } = document.documentElement.getBoundingClientRect()
    //   // 如果是手机不请求
    //   if (phoneWidth < width) {
    //     // this.fetchHot()
    //   }
    // }
  }
}
</script>

<style scoped lang="stylus">
  @import "~assets/css/theme"
.list-group-item
  padding 7px 5px
  display flex
  .article-img
    flex 0 0 33%
    margin-right 10px
    border-radius 5px
    overflow hidden
    img
      height 100%
      width 100%
  .desc
    font-size $font-size-small
    margin-bottom 2px
    cursor pointer
    &:hover
      margin-left 5px
  .info-bottom
    color $minor-color
    font-size $font-size-mini
</style>
