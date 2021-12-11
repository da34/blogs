<template>
  <section class="box-card article-wrap">
    <div class="box-title">
      <span>联系我</span>
    </div>
    <div class="box-content">
      <a href="https://github.com/da34" target="_blank" title="点我跳转到github">
        <SvgIcon icon-class="git" />
      </a>
      <a href="http://wpa.qq.com/msgrd?v=3&uin=1255029618&site=qq&menu=yes" title="通过qq联系我" target="_blank">
        <SvgIcon icon-class="qq" />
      </a>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  async fetch () {
  }
}
</script>

<style lang="stylus" scoped>
.article-wrap
  margin-top 10px
  padding 20px
  font-size $font-size-small
  .box-content
    flex-direction row
    svg
      font-size 25px
      margin-right 25px
      color $color-content
</style>
