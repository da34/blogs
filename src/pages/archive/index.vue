<template>
  <div class="time-line-wrapper">
    <h2 v-if="$route.query.name" class="tag">"{{$route.query.name}}" 下的文章</h2>
    <Timeline :data="archive.items" :total="archive.count" />
  </div>
</template>

<script>
import Timeline from '@/components/Timeline'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Pigeonhole',
  components: { Timeline },
  layout: 'blog',
  transition: 'slide-in',
  async fetch ({ route, store }) {
    await store.dispatch('modules/content/getArchiveList', { name: route.query.name })
  },
  head () {
    return {
      title: '归档-玉捷博客',
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
    ...mapState('modules/content', [
      'archive'
    ])
  },
  // activated () {
  //   // setTimeout(_ => {
  //   //   this.$store.dispatch('bus/HTML_Height')
  //   // }, 1000)
  // },
  methods: {
    ...mapActions('modules/content', [
      'getArchiveList'
    ])
  }
}
</script>

<style scoped lang="stylus">
.time-line-wrapper
  border-radius-5()
  shadow-2-down()
  border 1px solid $color-line-1
.tag
  padding 30px
  text-align center

@media (max-width: $mobile)
  .time-line-wrapper
    .posts-collapse
      padding 20px
      .time
        width 42px!important
</style>
