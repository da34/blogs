<template>
  <div class="about-wrapper">
    <main class="content">
<!--      <hr class="parting-line">-->
      <div class="site">
        <div class="info">
          <h2 class="info-title">
            关于我
          </h2>
          <p>喜欢计算机有关的事物,喜欢前端,励志成为一名前端攻城狮</p>
          <p>目前主要在学vue，本站也是用vue做的,其他语言稍有涉足,偶尔打打LOL,主力web方向,目前在朝着前端码农努力着.</p>
        </div>
        <div class="technology">
          <h2 class="technology-title">
            关于本站
          </h2>
          <p>
            写了本站经历了两个月左右,过程收获满满,之前也用过typecho,emlog,wrdpress等出色的博客开源系统,总觉得自己是一名前端的切图仔,要自己从头开始写一个博客
            正好我也在学vue，由此本博客就诞生了!
          </p>
          <h2 class="mini-title">
            技术栈
          </h2>
          <ul>
            <li>
              <h2 class="front">
                client:
              </h2>
              <span>
                <s>Vue +</s>
                <s>Vue-Router +</s>
                NuxtJs +
                Vuex +
                Element Ui
              </span>
            </li>
            <li>
              <h2 class="front">
                admin:
              </h2>
              <span>
                Vue + Vue-Router + Vuex + View Ui
              </span>
            </li>
            <li>
              <h2 class="front">
                serve:
              </h2>
              <span>
                <s>koa2 </s> +
                <s>koa-router +</s>
                EggJs +
                Sequelize
              </span>
            </li>
          </ul>
        </div>
        <div class="relation">
          <h2 class="title" style="text-align: left;">
            联系方式
          </h2>
          <ul>
            <li>
              <h2 class="front">
                QQ:
              </h2><span>2450266081</span>
            </li>
            <li>
              <h2 class="front">
                邮箱:
              </h2><span>jade_czech@163.com</span>
            </li>
            <li>
              <h2 class="front">
                Github:
              </h2><span><a href="https://github.com/da34" target="_blank">https://github.com/da34</a></span>
            </li>
          </ul>
        </div>
        <div class="history">
          <h2 class="history-title">
            本站发展历史
          </h2>
          <div class="block">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :color="activity.color"
                :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </main>
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
        { hid: 'home', name: 'description', content: '玉捷-个人博客' }
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
    @media (max-width 768px)
      width 100%
      padding 10px
      .title
        font-size 18px!important
    .content
      padding 0 20px
      .title
        font-size 22px
        text-align center
      #YuJie
        font-size 18px
      .site
        .front
          display inline-block
          font-size 18px
          font-weight 700
          margin-right 20px
        .info
          .info-title
            font-size 26px
        .technology
          margin-top 30px
          .technology-title
            font-size 26px
          .mini-title
            font-size $font-size-title
          a
            font-size $font-size-big
            &:hover
              color $active-color
        .history
          margin 30px auto 0
          .history-title
            font-size 26px
            margin-bottom 15px
        .info, .technology, .relation
          ul
            padding-left 30px
            li
              list-style disc
</style>
