<template>
  <div class="article-wrapper text-lg">
    <ArticleList :articleList="list" />
<!--    <BaseDownLoading v-model="currentPage" :total="total" :limit="7" />-->
    <BasePagination v-model="currentPage" :total="total" :limit="7" />
  </div>
</template>

<script>

export default {
  name: 'Index',
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
      const { data } = await this.$axios.$get('contents?status=publish&page=' + this.currentPage)
      this.list = data.list
      this.total = data.count
    }
  }
}
</script>
