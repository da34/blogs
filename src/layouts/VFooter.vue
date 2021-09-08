<template>
  <div class="footer-wrap">
    <footer class="footer-content">
      <div class="footer">
        <div class="blog-info">
          <p>© {{ date }} 玉捷个人博客</p>
          <a href="http://www.beian.miit.gov.cn" target="_blank">{{ site.internetNumber }}</a>
          <p>
            博客已运行 {{ activeTime }}
            <SvgIcon icon-class="heart" class="move" />
          </p>
        </div>
        <div class="link-info">
          <a href="https://github.com/da34" target="_blank" title="点我跳转到github">
            <SvgIcon icon-class="git" />
          </a>
          <a href="http://wpa.qq.com/msgrd?v=3&uin=1255029618&site=qq&menu=yes" title="通过qq联系我" target="_blank">
            <SvgIcon icon-class="qq" />
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { padLocation } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'VFooter',
  data () {
    return {
      startTime: '2019-05-01 08:00:00',
      activeTime: '正在加载...',
      date: new Date().getFullYear()
    }
  },
  computed: {
    ...mapGetters([
      'site'
    ])
  },
  created () {
    setInterval(() => { this.getRunTime() }, 1000)
  },
  methods: {
    getRunTime () {
      const date = parseInt(new Date() - new Date(this.startTime))
      // 天数
      const day = Math.floor(date / 1000 / 60 / 60 / 24)
      // // 小时
      const hour = Math.floor(date / 1000 / 60 / 60 % 24)
      // // 分钟
      const minute = Math.floor(date / 1000 / 60 % 60)
      // // 秒
      const second = Math.floor(date / 1000 % 60)
      this.activeTime = `${day}天${padLocation(hour)}小时${padLocation(minute)}分${padLocation(second)}秒`
      // this.activeTime = `${day}天${padLocation(hour)}小时`
    }
  }
}
</script>

<style scoped lang="stylus">
.footer-wrap
  border-top 1px solid $color-line-1
  height 120px
.footer-content
  width $width
  margin 0 auto
  height 100%
  position relative
  padding 15px 10px
  line-height 1.5em
  display: flex;
  .footer
    display: flex;
    align-items: center;
    width 100%
  .blog-info
    font-size $font-size-mini
    color $color-subsidiary
    display: flex
    flex-direction: column
    justify-content: center
    width: 45%;
    a
      color $color-subsidiary
  .move
    margin-left 3px
    font-size $font-size-medium
    animation pulse .8s infinite
  .link-info
    transition all .3s
    width: 100%;
    text-align: right;
    color $color-content
    svg
      font-size 25px
      margin-left 25px
      color $color-content
@keyframes pulse
  to
    transform translateY(0) scale(.8)
  from
    transform translateY(3px) rotate(1)

@media (max-width: $pc)
  .footer-content
    width 100%
@media (max-width: $mobile)
  .footer-wrap
    height 86px
  .footer-content
    width 100%
    padding 10px 20px
    .footer
      justify-content: space-between;
    .link-info,.blog-info
      width auto
</style>
