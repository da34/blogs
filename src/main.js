import {createApp} from 'vue'
import App from './App.vue'
import {setupRouter} from './router'
import {setupStore} from "./stores";
import AppProvider from '@/components/Application/Application.vue';
// 导入全局样式
import '@/styles/index.scss'
const appProvider = createApp(AppProvider);
const app = createApp(App)

// // 注册全局常用的 naive-ui 组件
// setupNaive(app);

// 注册状态管理器
setupStore(app)

//优先挂载一下 Provider 解决路由守卫，Axios中可使用，Dialog，Message 等之类组件
appProvider.mount('#appProvider', true);

// 注册路由
setupRouter(app)

app.mount('#app')
// installComponent(app)
