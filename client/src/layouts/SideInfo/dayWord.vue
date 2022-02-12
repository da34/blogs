<template>
  <section class="box-card mt-3">
    <div class="box-title">
      <span>每日一言</span>
    </div>
    <div class="box-content">
      {{verse.hitokoto}} —— {{verse.from}}
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      verse: '温柔的晚风 ，傍晚的晚霞 ，解暑的西瓜 冒泡的可乐 ，人间的美好多着呢 !不要为眼前的黑暗所迷惑，你要相信自己配得上世间一切的美好。'
    }
  },
  async fetch () {
    await this.getVerse()
  },
  methods: {
    async getVerse () {
      const { data } = await this.$axios.get('external/verse')
      this.verse = data.data
    }
  }
}
</script>
