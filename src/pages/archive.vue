<template>
  <div class="time-line-wrapper bg-white">
    <div v-if="$route.query.tag" class="text-center pt-5">
      与<span class="text-blue-950 text-2xl">{{ $route.query.tag }}</span>标签有关的文章
    </div>
    <Timeline :data="list" />
  </div>
</template>

<script>
import Timeline from '@/components/Timeline'
export default {
  name: 'Pigeonhole',
  components: { Timeline },
  layout: 'blog',
  transition: 'slide-in',
  data () {
    return {
      list: []
    }
  },
  async fetch () {
    await this.getArchiveList()
  },
  head () {
    return {
      title: '归档-玉捷 Code',
      meta: [
        {
          hid: 'home',
          name: 'description',
          content: '玉捷 Code'
        }
      ]
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  methods: {
    async getArchiveList () {
      const tag = this.$route.query.tag
      let query = ''
      if (tag) {
        query = '?tag=' + encodeURI(tag)
      }
      const { data } = await this.$axios.get('contents/archive' + query)
      this.list = data.data
    }
  }
}
</script>

<style scoped lang="stylus">
//.time-line-wrapper
//  border-radius-5()
//  shadow-2-down()
//  border 1px solid $color-line-1
//  background-color #fff
//.tag
//  padding 30px
//  text-align center
//
//@media (max-width: $mobile)
//  .time-line-wrapper
//    .posts-collapse
//      padding 20px
//      .time
//        width 42px!important
</style>
