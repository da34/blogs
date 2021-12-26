import VueLazyload from 'vue-lazyload'
import Vue from 'vue'

// 图片懒加载
Vue.use(VueLazyload, {
  // error: 'https://gravatar.loli.net/avatar/xxxxx?s=52&d=retro',
  // Loading: require('../assets/images/Loading.gif'),
  filter: {
    imgFormat (img) {
      const originSrc = img.src
      const {
        clientWidth,
        clientHeight
      } = img.el
      const isCDN = /resource.lsyboy.cn/
      if (isCDN.test(originSrc)) {
        img.src = originSrc + `?imageView2/1/w/${clientWidth}/h/${clientHeight}/q/80`
      }
    },
    webp (listener, options) {
      if (!options.supportWebp) { return }
      const isCDN = /resource.lsyboy.cn/
      if (isCDN.test(listener.src)) {
        listener.src += '/format/webp'
      }
    }
  }
})
