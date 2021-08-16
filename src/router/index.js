import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRouters } from './routes'
import createRouterGuards from './router-guards'


const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouters
})

export function setupRouter(app) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router
