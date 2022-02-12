<template>
  <section class="box-card mt-3">
    <div class="box-title">
      <span>标签</span>
    </div>
    <div class="box-content flex-wrap">
      <nuxt-link
        v-for="item in list"
        :key="item.id"
        class="art-tag"
        :to="{ name: 'search', params: { tagName: item.name } }"
      >
        {{ item.name }}
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Tag',
  data () {
    return {
      list: []
    }
  },
  async fetch () {
    const { data } = await this.$axios.get('tags')
    this.list = data.data.list
  }
}
</script>
