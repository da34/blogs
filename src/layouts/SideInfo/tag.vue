<template>
  <section class="box-card mt-3">
    <div class="box-title">
      <span>标签</span>
    </div>
    <div class="box-content flex-wrap space-x-2">
      <nuxt-link
        v-for="item in list"
        :key="item.id"
        class="tag"
        :to="'/archive?name=' + item.name"
      >
        {{ item.name }}
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Tag',
  // serverCacheKey: () => 'StaticTag',
  data () {
    return {
      list: []
    }
  },
  async fetch () {
    const { data } = await this.$axios.get('tags')
    this.list = data.result
  }
}
</script>
