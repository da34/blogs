import { resolve } from 'path'
import CompressionPlugin from 'compression-webpack-plugin'
export default {
  // 开启打包分析
  analyze: true,
  alias: {
    images: resolve(__dirname, './assets/images'),
    css: resolve(__dirname, './assets/css')
  },
  server: { // 部署到线上nginx配置
    host: '0.0.0.0',
    port: 5000
  },
  globals: {
    id: '__YuJie_Blog__'
  },
  srcDir: 'src/',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '玉捷',
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
        charset: 'utf-8'
      },
      {
        hid: 'description',
        name: 'description',
        content: '前端萌新 | 努力奋斗 | 开源 | 玉捷'
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
        content: '前端萌新 | 努力奋斗 | 开源 | 玉捷'
      },
      {
        property: 'og:url',
        content: 'https://blog.lsyboy.cn'
      },
      {
        property: 'og:site_name',
        content: '前端萌新 | 努力奋斗 | 开源 | 玉捷'
      },
      {
        property: 'og:description',
        content: '前端萌新 | 努力奋斗 | 开源 | 玉捷'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://resource.lsyboy.cn/blog/static/favicon.ico'
      }
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/index.styl',
    '@/assets/css/main.css'
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios',
    '@/plugins/svg-icon',
    '@/plugins/filters',
    '@/plugins/vue-lazy-load.client.js',
    '@/plugins/click-effects.client.js',
    '@/plugins/baidu-push.client.js'
  ],
  corejs: 3,
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxt/postcss8'
  ],
  // 全局导入css 不用@import
  styleResources: {
    // your settings here
    stylus: [
      './assets/css/vars.styl'
    ]
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    prefix: '/api', // baseURL
    credentials: true
  },
  proxy: {
    '/api': {
      target: 'http://localhost:7001/api/', // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  router: {
    extendRoutes (routes) {
      // 捕获未知路由，然后统一跳转到根路由
      routes.push({
        path: '*',
        redirect: '/'
      })
    },
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }
      const position = { x: 0, y: 0 }
      // console.log(to.matched)
      // if (to.matched.length < 2) {
      //   position = { x: 0, y: 0 }
      // } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
      //   position = { x: 0, y: 0 }
      // }
      // if (to.hash) {
      //   position = { selector: decodeURIComponent(to.hash) }
      //   // 有hash异步返回
      //   return new Promise(resolve => {
      //     setTimeout(() => {
      //       resolve(position)
      //     }, 500)
      //   })
      // }
      return position
    },
    linkActiveClass: 'active-line'
  },
  loading: { color: 'pink' },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new CompressionPlugin({
        test: /\.(js|css|html)$/,
        threshold: 1000
      })
    ],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    },
    babel: {
      plugins: [
        [
          'prismjs',
          {
            languages: ['javascript', 'bash', 'html', 'css', 'c', 'http', 'yaml', 'sql', 'scss', 'tsx', 'jsx', 'python']
          }
        ]
      ]
    },
    publicPath: 'https://resource.lsyboy.cn/blog/static',
    terser: {
      parallel: true,
      cache: false,
      sourceMap: false,
      extractComments: {
        filename: 'LICENSES'
      },
      terserOptions: {
        output: {
          comments: /^\**!|@preserve|@license|@cc_on/
        },
        ecma: 2015,
        drop_console: true // 删除console
      }
    },
    extractCSS: true, // 单独提取css为文件
    optimization: { // 拆分大文件
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'commons',
            test: /[\\/]src[\\/]/,
            chunks: 'all',
            minChunks: 2
          },
          mdEditor: {
            test: /[\\/]node_modules[\\/](@kangc)[\\/]/,
            name: 'mdEditor',
            chunks: 'all',
            minSize: 0,
            priority: 10
          }
        }
      }
    },
    extend (config) {
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
