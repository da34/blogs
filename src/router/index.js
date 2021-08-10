import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 路由配置说明
 * hidden: true                   是否显示在侧边栏
 * name:'router-name'            路由的名字。必须设置
 * meta : {
   role: ['admin','editor']     可以访问的角色
   title: 'title'               侧边栏显示的名称
   icon: 'name'                 使用的icon名称
 }
 **/
import Layout from '@/layout/index.vue'
const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        isHidden: true,
        component: () => import('@/views/dash-board/index.vue'),
        meta: { title: '控制台', icon: 'dashboard', isCache: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/index.vue')
  }
]

const asyncRoutes = [
]


const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export default router
