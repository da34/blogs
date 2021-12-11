<template>
  <div class="footer-wrap">
    <footer class="footer-content">
      <div class="footer">
        <div class="blog-info">
          <p>© 2019 - {{ date }} {{ site.name }}</p>
          <p>托管于腾讯云 | 使用七牛云对象存储</p>
          <a href="http://www.beian.miit.gov.cn" target="_blank">{{ site.internetNumber }}</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VFooter',
  data () {
    return {
      date: new Date().getFullYear()
    }
  },
  computed: {
    ...mapGetters([
      'site'
    ])
  }
}
</script>

<style scoped lang="stylus">
.footer-wrap
  height 120px
  background #232323
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
    justify-content: center
  .blog-info
    font-size $font-size-mini
    color $color-subsidiary
    display flex
    flex-direction: column
    text-align center
    a
      color $color-subsidiary
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
</style>
