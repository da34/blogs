<template>
  <section class="box-card mt-3">
    <div class="box-content">
      <div class="flex flex-col items-center basis-1/3">
        <p class="text-base font-bold">
          文章
        </p>
        <p class="text-base pt-1">
          {{ articleCollect.contentCount }}
        </p>
      </div>
      <div class="flex flex-col items-center basis-1/3">
        <p class="text-base font-bold">
          分类
        </p>
        <p class="text-base pt-1">
          {{ articleCollect.categoryCount }}
        </p>
      </div>
      <div class="flex flex-col items-center basis-1/3">
        <p class="text-base font-bold">
          标签
        </p>
        <p class="text-base pt-1">
          {{ articleCollect.tagCount }}
        </p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      articleCollect: {}
    }
  },
  async fetch () {
    await this.getCollect()
  },
  methods: {
    async getCollect () {
      const { data } = await this.$axios.get('site')
      this.articleCollect = data.data
    }
  }
}
</script>
