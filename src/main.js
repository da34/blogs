import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from "./stores";
import './styles/common.scss'
import "tailwindcss/tailwind.css"
// import { setupNaive } from '@/plugins/naive'
// import installComponent from '@/assets/js/antd-install-component'

const app = createApp(App)

  // // 注册全局常用的 naive-ui 组件
  // setupNaive(app);

  // 注册状态管理器
  setupStore(app)

  // 注册路由
  setupRouter(app)

  app.mount('#app')
// installComponent(app)
