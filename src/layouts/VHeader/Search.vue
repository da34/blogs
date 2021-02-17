<template>
  <div class="site-search">
    <!--    <svg-icon name="search" style="margin-right: 15px" />-->
    <!--    <el-autocomplete-->
    <!--      v-model="state"-->
    <!--      class="search"-->
    <!--      :debounce="500"-->
    <!--      size="small"-->
    <!--      suffix-icon="el-icon-search"-->
    <!--      :fetch-suggestions="querySearchAsync"-->
    <!--      placeholder="搜索本站"-->
    <!--      @select="handleSelect"-->
    <!--    />-->
  </div>
</template>

<script>
// import { getSearchArticle } from '@/api/article'
// import { errno } from '@/config'
export default {
  name: 'Search',
  data () {
    return {
      state: ''
    }
  },
  methods: {
    async querySearchAsync (queryString, callback) {
      // if (queryString) {
      //   const { data, code, message } = await this.$axios.$get(`article/search?title=${queryString}`)
      //   if (code === 0) {
      //     data.map(item => {
      //       item.value = item.title
      //     })
      //     callback(data)
      //   } else {
      //     this.$message(message)
      //   }
      // }
    },
    handleSelect ({ id }) {
      this.state = ''
      // replace到新的路由，并且不存储记录
      this.$router.replace(`/article/${id}`)
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
$size = 26px
  .site-search
    width 15%
    margin-right 50px
    height 100%
    color $font-color
    overflow hidden
    .search
      width 100%
      line-height 75px

@media (max-width 1200px)
  .site-search
    height 100%
    width 30%
    margin-right 0
    .search
      line-height 50px
</style>
