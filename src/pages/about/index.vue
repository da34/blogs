<template>
  <div class="about-wrapper">
  </div>
</template>

<script>
export default {
  name: 'About',
  layout: 'blog',
  head () {
    return {
      title: '关于-玉捷博客',
      meta: [
        {
          hid: 'home',
          name: 'description',
          content: '玉捷-个人博客'
        }
      ]
    }
  },
  data () {
    return {
      activities: [
        {
          content: '第一次尝试写博客并上线',
          timestamp: '2019-05-1',
          color: '#53A8FF'
        }, {
          content: '重写前端ui和服务端,后台改用vue-element-admin。',
          timestamp: '2019-06-13',
          color: '#FFA7A6'
        }, {
          content: '新增表情模块,修复若干bug',
          timestamp: '2019-08-21',
          color: '#d9d1c7'
        },
        {
          content: '改成ssr利于seo，使用nuxt框架',
          timestamp: '2019-09-20',
          color: '#f9d5c7'
        },
        {
          content: '后台管理系统更新，前台支持github登录',
          timestamp: '2019-11-10',
          color: '#f9f5c7'
        }
      ]
    }
  }
  // mounted () {
  //   // setTimeout(_ => {
  //   //   this.$store.dispatch('bus/HTML_Height')
  //   // }, 1000)
  // },
  // activated () {
  //   // setTimeout(_ => {
  //   //   this.$store.dispatch('bus/HTML_Height')
  //   // }, 1000)
  // }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
.about-wrapper
  padding 30px
  background-color $background-color
  box-sizing border-box
  line-height 2
</style>
