<template>
  <div class="relative flex items-center">
    <input v-model="keyword" placeholder="搜索文章" class="px-2 py-1.5 bg-gray-100 rounded pr-8 border border-solid focus:border-blue-950" @keydown.enter="handleSearch">
    <BaseSvgIcon icon-class="search" class="absolute text-gray-500 right-2" @click="handleSearch" />
  </div>
</template>

<script>
import Message from '../../components/base/Message'

export default {
  name: 'Search',
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    handleSearch () {
      const keyword = this.keyword
      if (keyword) {
        this.$router.replace(`/search?keyword=${this.keyword}`)
        this.keyword = ''
      } else {
        Message({
          type: 'info',
          text: '请输入搜索内容'
        })
      }
    }
  }
}
</script>

<style scoped lang="stylus">
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
