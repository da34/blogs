<template>
  <div>
    <Timeline :data="list" :total="count" />
  </div>
</template>

<script>
import Timeline from '@/components/Timeline'

export default {
  name: 'Pigeonhole',
  layout: 'blog',
  components: { Timeline },
  head () {
    return {
      title: '归档-玉捷博客',
      meta: [
        { hid: 'home', name: 'description', content: '玉捷-个人博客' }
      ]
    }
  },
  data () {
    return {
      list: [],
      count: 0
    }
  },
  computed: {
    currentPage () {
      return this.$store.getters.archivePage
    }
  },
  async asyncData ({ $axios, store }) {
    const { data } = await $axios.$get(`article/archive?page=${store.getters.archivePage}&limit=10`)
    // console.log(data.data)
    return {
      list: data.data,
      count: data.count
    }
  },
  created () {
    // this.fetchArchive()
  }
  // activated () {
  //   // setTimeout(_ => {
  //   //   this.$store.dispatch('bus/HTML_Height')
  //   // }, 1000)
  // },
  // methods: {
  //   async fetchArchive () {
  //     // const { code, data } = await getArticleTime()
  //     // if (code === errno) {
  //     //   this.list = data
  //     //   setTimeout(_ => {
  //     //     this.$store.dispatch('bus/HTML_Height')
  //     //   }, 1000)
  //     // }
  //     // data.forEach(item => {
  //     //   this.count += item.list.length
  //     // })
  //   }
  // }
}
</script>

<style scoped lang="stylus">
</style>
