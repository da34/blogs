<template>
  <div class="article-wrapper text-lg">
    <NuxtLink
      v-for="item in list"
      :key="item.id"
      tag="section"
      :to="`/content/${item.id}`"
      class="md:duration-300 md:hover:scale-[1.02] md:flex min-h-[160px] shadow-3xl rounded-lg bg-white mb-5 cursor-pointer overflow-hidden"
    >
      <div v-if="item.firstPicture" v-lazy:background-image="item.firstPicture" class="md:basis-1/3 md:pl-30 md:pt-0 pt-[60%] bg-cover bg-center" />
      <div :class="[ 'px-5', 'p-4', 'basis-2/3', 'flex', 'flex-col', { 'basis-full': !item.firstPicture }]">
        <div class="flex text-gray-500 text-xs md:mt-0">
          <div class="info-item">
            {{ item.createTime | formatDate('YYYY年MM月DD日') }}
          </div>
          <div v-if="item.tags.length" class="info-item">
            <NuxtLink v-for="tag in item.tags" :key="tag.id" class="ml-2 art-tag" :to="'/archive?name=' + tag.name">
              {{ tag.name }}
            </NuxtLink>
          </div>
        </div>
        <h2 class="md:text-2xl duration-150 font-bold my-3 text-xl title">
          {{ item.title }}
        </h2>
        <p class="text-gray-500 desc overflow-hidden text-sm leading-5">
          {{ item.contentOutline }}
        </p>
      </div>
    </NuxtLink>
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
      const { data } = await this.$axios.$get('contents?sortBy[createTime]=DESC&filters[status]=publish&filters[type]=article&fields=id,title,contentOutline,isTop,createTime,firstPicture')
      this.list = data.list
      this.total = data.count
    }
  }
}
</script>

<style scoped lang="stylus">
  .desc
    text-omit(3)
  .title
    text-omit(2)
</style>
