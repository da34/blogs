import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/common.scss'
// import installComponent from '@/assets/js/antd-install-component'

const app = createApp(App)
  .use(router)

// installComponent(app)
app.mount('#app')
