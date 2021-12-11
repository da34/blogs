<template>
  <section class="box-card site-wrap">
    <div class="box-title">
      <span>站点信息</span>
    </div>
    <div class="box-content">
      <div class="info">
        <p>已运行时间</p>
        <p>{{ activeTime }}</p>
      </div>
    </div>
  </section>
</template>

<script>
const startTime = '2019-05-01 08:00:00'
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

<style lang="stylus" scoped>
.site-wrap
  margin-top 10px
  padding 20px
  font-size $font-size-small
  .info
    display flex
    justify-content space-between
</style>
