<template>
  <div class="wrap">
    <div class="content">
      <VHeader/>
      <AppMain/>
    </div>
    <BackTop/>
    <VFooter/>
  </div>
</template>

<script>
import BackTop from '@/components/BackTop'

import VHeader from './VHeader/index'
import VFooter from './VFooter'
import AppMain from './AppMain'
// import ProgressBar from '@/components/ProgressBar'
//
// let scrollTo
// if (process.client) {
//   scrollTo = require('@/utils/scroll-to').scrollTo
// }
export default {
  name: 'Layout',
  components: {
    VHeader,
    VFooter,
    AppMain,
    BackTop
  },
  mounted () {
    // window.addEventListener('popstate', function (event) {
    //   const url = location.hash
    //   // const scrollTop = document.documentElement.scrollTop
    //   const id = url.slice(1)
    //   if (id) {
    //     const $comment = document.getElementById(id)
    //     const { top } = $comment.getBoundingClientRect()
    //     // console.log(scrollTop, top)
    //     scrollTo(top)
    //   }
    // })
  }
}
/* eslint-disable */
console.log('%c version 2.0', 'font-size:20pt;color:#FFA7A6')
console.log('%c 欢迎来到玉捷博客', 'font-size:20pt;color:#FFA7A6')
</script>

<style scoped lang="stylus">
.wrap
  width 100%
  margin-top 75px

  .content
    min-height calc(100vh - 225px)
    padding-bottom 50px

  #bg
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index -1
    background-attachment fixed

//background url("../assets/images/bg.jpg")
/*background url("https://acg.toubiec.cn/random")*/
</style>
