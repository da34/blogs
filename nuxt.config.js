import { resolve } from 'path'

// const resolve = dir => {
//   return path.join(__dirname, dir)
// }

export default {
  srcDir: 'src/',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        name: 'description',
        content: '前端萌新 | 努力奋斗 | 开源| 玉捷'
      },
      {
        name: 'keywords',
        content: '玉捷'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:title',
        content: '前端萌新 | 努力奋斗 | 开源| 玉捷'
      },
      {
        property: 'og:url',
        content: 'http://lsyblog.com'
      },
      {
        property: 'og:site_name',
        content: '前端萌新 | 努力奋斗 | 开源 | 玉捷'
      },
      {
        property: 'og:description',
        content: '前端萌新 | 努力奋斗 | 开源| 玉捷'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://img.cdn.lsyblog.com/favicon.ico'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'iview/dist/styles/iview.css',
    '@/assets/css/index.styl'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/iview',
    '@/plugins/axios',
    '@/plugins/filters',
    '@/plugins/components',
    {
      src: '@/plugins/svg-icon',
      ssr: true
    },
    {
      src: '@/plugins/vue-lazyload',
      ssr: false
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    prefix: '/api/', // baseURL
    credentials: true
  },
  proxy: {
    '/api/': {
      target: 'http://localhost:7001/api/v1/', // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  router: {
    scrollBehavior: (to, from, savedPosition) => {
      return {
        x: 0,
        y: 0
      }
    },
    linkActiveClass: 'active-nav',
    middleware: 'menu'
  },
  loading: { color: '#FFA7A6' },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, ctx) {
      // 排除 nuxt 原配置的影响,Nuxt 默认有vue-loader,会处理svg,img等
      // 找到匹配.svg的规则,然后将存放svg文件的目录排除
      // console.log(resolve(__dirname, 'src/icons/svg'))
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.exclude = [resolve(__dirname, 'src/icons/svg')]

      // 添加loader规则
      config.module.rules.push({
        test: /\.svg$/, // 匹配.svg
        include: [resolve(__dirname, 'src/icons/svg')], // 将存放svg的目录加入到loader处理目录
        use: [{
          loader: 'svg-sprite-loader',
          options: { symbolId: 'icon-[name]' }
        }]
      })
    }
  }
}
