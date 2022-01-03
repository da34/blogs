<template>
  <div class="link-wrapper bg-white p-5">
    <h1 class="text-3xl font-bold mb-7">
      以下排名不分先后
    </h1>
    <div class="flex flex-wrap justify-between">
      <a
        v-for="link in list"
        :key="link.URL"
        :title="link.name"
        :href="getURL(link.URL)"
        target="_blank"
        class="hover:scale-105 duration-300 mb-5 rounded-xl bg-white border border-gray-200 border-solid p-4 h-[100px] md:basis-[30%] basis-full flex justify-center items-center"
      >
        <img v-lazy="link.avatar" class="h-[70px] w-[70px] rounded-full object-cover">
        <div class="ml-4">
          <p class="text-base">{{ link.name }}</p>
          <p class="text-gray-500 desc">{{ link.outline }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'blog',
  transition: 'slide-in',
  data () {
    return {
      list: []
    }
  },
  async fetch () {
    const { data } = await this.$axios.get('links')
    this.list = data.result
  },
  computed: {
    ...mapGetters([
      'site'
    ])
  },
  head () {
    return {
      title: `友情链接-${this.site.name}`,
      meta: [
        {
          hid: 'home',
          name: 'description',
          content: this.site.name
        }
      ]
    }
  },
  methods: {
    getURL (str) {
      let strURL = ''
      if (str.substring(0, 7) === 'http://' || str.substring(0, 8) === 'https://') {
        strURL = str
      } else {
        strURL = 'http://' + str
      }
      return strURL
    }
  }
}
</script>

<style scoped lang="stylus">
.desc
  text-omit(2)
</style>
