<template>
  <div v-if="list.length" class="time-line-wrapper">
    <div class="tag-all">
      <h2 class="tag-title">标签</h2>
      <nuxt-link :to="`/tag/${tag.name}`" v-for="tag in tagData" :key="tag.id">
        <Tag size="large" style="margin-right: 10px;cursor: pointer;">{{ tag.name }}({{ tag.articles.length }})</Tag>
      </nuxt-link>
    </div>
    <Timeline :data="list" :total="$store.getters.articleCollect.articleCount"/>
  </div>
</template>

<script>
import Timeline from '@/components/Timeline'

export default {
  name: 'Pigeonhole',
  components: { Timeline },
  layout: 'blog',
  async asyncData ({
    $axios,
    store
  }) {
    const { data } = await $axios.$get(`article/archive?page=${store.getters.archivePage}&limit=10`)
    const tagData = await $axios.$get('tags/tagAndArticle')
    return {
      list: data.data,
      count: data.count,
      tagData: tagData.data
    }
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
  data () {
    return {}
  },
  computed: {
    currentPage () {
      return this.$store.getters.archivePage
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
.time-line-wrapper
  background #fff

.tag-all
  padding 30px 60px 10px 60px

.tag-title
  font-weight 700
  font-size 25px
  margin-bottom 30px
</style>
