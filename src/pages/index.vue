<template>
  <div class="article-wrapper text-lg">
    <NuxtLink
      v-for="item in list"
      :key="item.id"
      tag="section"
      :to="`/content/${item.id}`"
      class="duration-300 hover:scale-[1.02] flex rounded-2xl bg-white mb-5 h-[190px] cursor-pointer overflow-hidden"
    >
      <div v-if="item.firstPicture" class="basis-1/3 flex items-center justify-center">
        <img v-lazy="item.firstPicture" class="h-[160px] rounded-xl w-11/12 object-cover">
      </div>
      <div :class="['py-6', 'px-5', 'basis-2/3', 'flex', 'flex-col', 'justify-between', { 'basis-full': !item.firstPicture }]">
        <h2 class="text-2xl duration-150">
          {{ item.title }}
        </h2>
        <p class="text-gray-500 desc overflow-hidden text-base">
          {{ item.contentOutline }}
        </p>
        <div class="flex justify-between text-base">
          <div class="info-item">
            {{ item.createdAt | convertDate }}
          </div>
          <div v-if="item.tags.length" class="info-item">
            <NuxtLink v-for="tag in item.tags" :key="tag.id" class="ml-2 tag" :to="'/archive?name=' + tag.name">
              {{ tag.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </NuxtLink>
    <Pagination v-model="currentPage" class="pagination-wrap" :total="total" :limit="7" @change="pageChange" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/base/Pagination'
// let scrollTo
// if (process.client) {
//   scrollTo = require('@/utils/scroll-to').scrollTo
// }

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
      title: `首页-${this.site.name}`,
      meta: [
        {
          hid: 'home',
          name: 'description',
          content: this.site.name
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'site'
    ])
  },
  watch: {
    currentPage: '$fetch'
  },
  methods: {
    async getList () {
      const params = `page=${this.currentPage}&limit=7`
      const { result } = await this.$axios.$get(`contents?${params}`)
      const { rows, count } = result
      this.list = rows
      this.total = count
    },
    pageChange () {
      // scrollTo(0)
    }
  }
}
</script>

<style scoped lang="stylus">
  .desc
    text-omit(3)
</style>
