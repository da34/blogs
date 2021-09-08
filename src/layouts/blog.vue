<template>
  <div class="wrap">
    <VHeader />
    <AppMain class="content" />
    <VFooter />
    <BackTop />
  </div>
</template>

<script>
import BackTop from '@/components/BackTop'
import VHeader from './VHeader/index'
import VFooter from './VFooter'
import AppMain from './AppMain'
export default {
  name: 'Layout',
  components: {
    VHeader,
    VFooter,
    AppMain,
    BackTop
  }
}
/* eslint-disable */
console.log('%c version 2.0', 'font-size:20pt;color:#FFA7A6')
console.log('%c 欢迎来到玉捷博客', 'font-size:20pt;color:#FFA7A6')
</script>

<style scoped lang="stylus">
.wrap
  width 100%
  margin-top 80px

  .content
    min-height calc(100vh - 200px)
    padding-bottom 20px

  #bg
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index -1
    background-attachment fixed


@media (max-width: $mobile)
  .wrap
    margin-top 60px
    .content
      min-height calc(100vh - 190px)
//background url("../assets/images/bg.jpg")
/*background url("https://acg.toubiec.cn/random")*/
</style>
