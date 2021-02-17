import VueLazyload from 'vue-lazyload'
import Vue from 'vue'
// import '@/utils/quaint' // 樱花

// 图片懒加载
Vue.use(VueLazyload, {
  error: 'dist/error.png',
  loading: require('../assets/images/loading.gif')
})
