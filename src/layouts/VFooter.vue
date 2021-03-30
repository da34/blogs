<template>
  <footer class="footer">
    <p>博客已运行 {{ activeTime }}<SvgIcon iconClass="heart" class="move" /> </p>
<!--    <p>托管于阿里云(学生机) | 使用七牛云 镜像存储</p>-->
    <p>COPYRIGHT {{ date }} 玉捷个人博客. <a style="color: #9fa0a7;" href="http://www.beian.miit.gov.cn" target="_blank">桂ICP备2021002604号-1</a></p>
  </footer>
</template>

<script>
import { padLocation } from '@/utils'

export default {
  name: 'VFooter',
  data () {
    return {
      startTime: '2019-05-01 08:00:00',
      activeTime: '正在加载...',
      date: new Date().getFullYear()
    }
  },
  created () {
    this.getRunTime()
  },
  methods: {
    getRunTime () {
      setInterval(() => {
        const date = parseInt(new Date() - new Date(this.startTime))
        // 天数
        const day = Math.floor(date / 1000 / 60 / 60 / 24)
        // 小时
        const hour = Math.floor(date / 1000 / 60 / 60 % 24)
        // 分钟
        const minute = Math.floor(date / 1000 / 60 % 60)
        // 秒
        const second = Math.floor(date / 1000 % 60)
        this.activeTime = `${day}天${padLocation(hour)}小时${padLocation(minute)}分${padLocation(second)}秒`
      }, 1000)
    }
  }
}
</script>

<style scoped lang="stylus">
//@import "~assets/css/theme"
.footer
  //height 85px
  box-sizing border-box
  padding 15px 10px
  text-align center
  font-size 14px
  line-height 1.5em
  //background-color: #23262E;
  color: #909090;
  .move
    margin-left 5px
    font-size 20px
    animation pulse .8s infinite
@keyframes pulse
  to
    transform translateY(0) scale(.8)
  from
    transform translateY(3px) rotate(1)
</style>
