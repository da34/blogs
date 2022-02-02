<template>
  <div class="article-wrapper text-lg">
    <ArticleList :articleList="list" />
    <Pagination v-model="currentPage" class="pagination-wrap" :total="total" :limit="7" />
  </div>
</template>

<script>
import Pagination from '@/components/base/Pagination'

export default {
  name: 'Index',
  components: { Pagination },
  layout: 'blog',
  transition: 'slide-in',
  fetchKey: 'home',
  data () {
    return {
      currentPage: 1,
      list: [],
      total: 0
    }
  },
  async fetch () {
    await this.getList()
  },
  head () {
    return {
      title: '首页-玉捷 Code',
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
    currentPage: '$fetch'
  },
  methods: {
    async getList () {
      const { data } = await this.$axios.$get('contents?status=publish')
      this.list = data.list
      this.total = data.count
    }
  }
}
</script>
