<template>
  <section class="box-card tag-wrap">
    <div class="box-title">
      <span>标签</span>
    </div>
    <div class="box-content">
      <nuxt-link
        v-for="item in list"
        :key="item.id"
        :to="'/archive?name=' + item.name"
      >
        <span style="cursor: pointer;margin-bottom: 5px;padding: 5px;">
          {{ item.name }}
        </span>
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
  // methods: {
  //   randColor () {
  //     const colors = ['#f2d6ed', '#a9adeb', '#ff7978', '#5586ff', '#f4d596', '#7d7575', '#ff7978']
  //     const index = Math.floor(Math.random() * 7)
  //     return colors[index]
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
.tag-wrap
  margin-top 10px
  padding 20px
  font-size $font-size-small
  .box-content
    display block
</style>
