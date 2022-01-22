<template>
  <div class="time-line-wrapper bg-white">
    <h2 v-if="$route.query.name" class="tag">
      "{{ $route.query.name }}" 下的文章
    </h2>
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
  methods: {
    async getArchiveList () {
      const name = this.$route.query.name
      let query = ''
      if (name) {
        query = '?name=' + encodeURI(name)
      }
      const { data } = await this.$axios.get('site/archive' + query)
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
