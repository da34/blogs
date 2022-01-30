<template>
  <div class="link-wrapper bg-white">
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
        class="md:hover:scale-105 duration-300 mb-5 rounded-xl bg-white border border-gray-200 border-solid p-4 h-[100px] md:basis-[30%] basis-full flex justify-center items-center"
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
export default {
  layout: 'blog',
  transition: 'slide-in',
  data () {
    return {
      list: []
    }
  },
  async fetch () {
    const { data } = await this.$axios.get('links?pageSize=99&filters[isValid]=1')
    // console.log(data)
    this.list = data.data.list
  },
  head () {
    return {
      title: '友情链接-玉捷 Code',
      meta: [
        {
          hid: 'home',
          name: 'description',
          content: '玉捷 Code'
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
