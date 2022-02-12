import { throttle } from '@/utils/index'
export const scrollMixin = {
  data () {
    return {
      visible: true,
      beforeTop: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', throttle(this.handleScroll, 500))
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      const afterTop = window.pageYOffset || document.documentElement.scrollTop
      const differTop = afterTop - this.beforeTop
      // 如果mini导航处于打开状态，导航栏不隐藏
      const miniDom = document.querySelector('.mobile-nav')
      if (differTop === 0 || miniDom) {
        return
      }
      const type = differTop > 0 ? 'down' : 'top'
      this.beforeTop = afterTop
      this.visible = type !== 'down'
    }
  }
}
