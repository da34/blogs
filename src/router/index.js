import {createRouter, createWebHashHistory} from 'vue-router'
import DashBoard from '@/views/dash-board.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: DashBoard
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
