<template>
  <div class="time-line-wrapper bg-white p-5 md:p-7 rounded">
    <Timeline :data="list" />
  </div>
</template>

<script>
export default {
  name: 'Pigeonhole',
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
      const { data } = await this.$axios.get('contents/archive')
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
