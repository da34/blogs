<template>
  <section class="box-card mt-3">
    <div class="box-title">
      <span>站点信息</span>
    </div>
    <div class="box-content">
      <div class="flex justify-between w-full">
        <span>已运行时间</span>
        <span>{{ activeTime }}</span>
      </div>
    </div>
  </section>
</template>

<script>
const startTime = '2021-02-17 08:00:00'
export default {
  data () {
    return {
      activeTime: ''
    }
  },
  async fetch () {
  },
  mounted () {
    const date = parseInt(new Date() - new Date(startTime))
    // 天数
    const day = Math.floor(date / 1000 / 60 / 60 / 24)
    this.activeTime = `${day}天`
  }
}
</script>
