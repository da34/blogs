<template>
  <div class="article-wrapper text-lg">
    <NuxtLink
      v-for="item in list"
      :key="item.id"
      tag="section"
      :to="`/content/${item.id}`"
      class="md:duration-300 hover:scale-[1.02] md:flex rounded-2xl bg-white mb-5 md:h-[190px] cursor-pointer overflow-hidden"
    >
      <div v-if="item.firstPicture" class="md:basis-1/3 flex items-center justify-center">
        <img v-lazy="item.firstPicture" class="md:h-[160px] md:w-11/12 h-32 w-full object-cover">
      </div>
      <div :class="['md:py-6', 'px-5', 'p-4', 'basis-2/3', 'flex', 'flex-col', 'justify-between', { 'basis-full': !item.firstPicture }]">
        <h2 class="md:text-2xl duration-150 text-lg title">
          {{ item.title }}
        </h2>
        <p class="text-gray-500 desc overflow-hidden text-base mt-1 md:mt-0">
          {{ item.contentOutline }}
        </p>
        <div class="flex justify-between md:text-base text-sm mt-1 md:mt-0">
          <div class="info-item">
            {{ item.createTime | convertDate }}
          </div>
          <div v-if="item.tags.length" class="info-item">
            <NuxtLink v-for="tag in item.tags" :key="tag.id" class="ml-2 tag" :to="'/archive?name=' + tag.name">
              {{ tag.name }}
            </NuxtLink>
          </div>
        </div>
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
      const { data } = await this.$axios.$get('contents')
      this.list = data.list
      this.total = data.count
    }
  }
}
</script>

<style scoped lang="stylus">
  .desc
    text-omit(2)
  .title
    text-omit(2)

@media (min-width: 768px)
  .desc
    text-omit(3)
</style>
