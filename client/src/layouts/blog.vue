<template>
  <div class="wrap">
    <VHeader />
    <AppMain class="content" />
    <VFooter />
    <!--    <client-only placeholder="Loading...">-->
    <BaseBackTop />
    <!--    </client-only>-->
    <!--    <canvas class="canvas" />-->
  </div>
</template>

<script>
import VHeader from './VHeader/index'
import VFooter from './VFooter'
import AppMain from './AppMain'

export default {
  name: 'Layout',
  components: {
    VHeader,
    VFooter,
    AppMain
  }
}
/* eslint-disable */
console.log('%c version 2.1', 'font-size:20pt;color:#FFA7A6')
console.log('%c 欢迎来到玉捷博客', 'font-size:20pt;color:#FFA7A6')
</script>

<style scoped lang="stylus">
.canvas
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -99;

.wrap
  width 100%

  .content
    min-height calc(100vh - 183px)
    padding-bottom 50px
    position relative

  #bg
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index -1
    background-attachment fixed


//@media (max-width: $mobile)
//  .wrap
//    margin-top 60px
//    .content
//      //min-height calc(100vh - 190px)
//      min-height calc(100vh - 163px)
//background url("../assets/images/bg.jpg")
/*background url("https://acg.toubiec.cn/random")*/
</style>
