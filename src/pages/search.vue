<template>
  <div class="space-y-4">
    <div class="box-card">
      <div class="flex md:space-x-8 space-x-5 items-center">
        <h1 class="text-gray-500 whitespace-nowrap leading-7">
          分类：
        </h1>
        <div class="flex flex-wrap space-x-3">
          <div
            v-for="category in categories"
            :key="category.id"
            :class="['cursor-pointer hover:text-blue-950 px-2 py-1 rounded', selectCategory === category.name && 'bg-blue-950 text-white']"
            @click="onCategoryClick(category.name)"
          >
            {{ category.name }}
          </div>
        </div>
      </div>
      <div class="mt-3 flex md:space-x-8 space-x-5">
        <h1 class="text-gray-500 whitespace-nowrap leading-7">
          标签：
        </h1>
        <div class="flex flex-wrap space-x-3">
          <div
            v-for="tag in tags"
            :key="tag.id"
            :class="['cursor-pointer hover:text-blue-95 px-2 py-1 rounded', selectTags.includes(tag.name) && 'bg-blue-950 text-white']"
            @click="onTagClick(tag.name)"
          >
            {{ tag.name }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <ArticleList v-if="articleList.length" :article-list="articleList" />
      <BaseEmpty v-else class="bg-white" :image-style="{ width: '30%' }" description="没有搜索到文章" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blog',
  transition: 'slide-in',
  data () {
    return {
      tags: [],
      categories: [],
      articleList: [],
      selectTags: [],
      selectCategory: ''
    }
  },
  watch: {
    '$route.query.keyword' () {
      console.log(1111111111)
      this.searchContent()
    }
  },
  mounted () {
    Promise.all([this.getTags(), this.getCategories(), this.searchContent()])
  },
  methods: {
    async getTags () {
      const { data } = await this.$axios('tags?pageSize=99')
      this.tags = data.data.list
    },
    async getCategories () {
      const { data } = await this.$axios('category?pageSize=99')
      this.categories = data.data.list
    },
    async searchContent () {
      const { keyword = '' } = this.$route.query
      const query = {}
      keyword && (query.keyword = keyword)
      this.selectTags.length && (query.tagName = this.selectTags)
      this.selectCategory && (query.categoryName = this.selectCategory)
      const { data } = await this.$axios('contents/search', { params: query })
      this.articleList = data.data
    },
    onTagClick (name) {
      const oldLen = this.selectTags.length
      this.selectTags = this.selectTags.filter(tag => tag !== name)
      const newLen = this.selectTags.length

      if (oldLen === newLen) {
        this.selectTags.push(name)
      }
      this.searchContent()
    },
    onCategoryClick (name) {
      this.selectCategory = name
      this.searchContent()
    }
  }
}
</script>

<style scoped>

</style>
