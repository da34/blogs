import VueLazyload from 'vue-lazyload'
import Vue from 'vue'
// import '@/utils/quaint' // 樱花

// 图片懒加载
Vue.use(VueLazyload, {
  // error: 'dist/error.png',
  // loading: require('../assets/images/loading.gif'),
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
