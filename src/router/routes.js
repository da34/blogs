import { renderIcon } from '@/utils'
const routeName = 'Dashboard';
const RedirectName = 'Redirect';
/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 * */
import Layout from '@/layout/index.vue'
const constantRouters = [
  {
    path: '/',
    name: routeName,
    component: Layout,
    meta: {
      title: 'Dashboard',
      // icon: renderIcon(DashboardOutlined),
      // permissions: ['super_admin', 'admin'],
      sort: 0,
    },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: `${routeName}_dashboard`,
        component: () => import('@/views/dashboard/console.vue'),
        meta: { title: '控制台', keepAlive: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/index.vue')
  },
  // {
  //   path: '/404',
  //   name: 'error',
  //   hidden: true,
  //   component: () => import('@/views/ErrPage/index')
  // },
  // {
  //   path: '/refresh',
  //   name: 'refresh',
  //   hidden: true,
  //   component: Refresh
  // }
  {
    path: '/:path(.*)*',
    name: 'ErrorPage',
    component: Layout,
    meta: {
      title: 'ErrorPage',
    },
    children: [
      {
        path: '/:path(.*)*',
        name: 'ErrorPageSon',
        component: () => import('@/views/exception/404.vue'),
        meta: {
          title: 'ErrorPage',
        },
      },
    ],
  },
  {
    path: '/redirect',
    name: RedirectName,
    component: Layout,
    meta: {
      title: RedirectName,
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: RedirectName,
        component: () => import('@/views/redirect/index.vue'),
        meta: {
          title: RedirectName,
        },
      },
    ],
  }
]

const asyncRoutes = [
  {
    path: '/test',
    name: 'Test',
    component: Layout,
    meta: {
      title: 'Test',
    },
    children: [
      {
        path: '/redirect/1111111',
        name: 'Test1',
        component: () => import('@/views/redirect/index.vue'),
        meta: {
          title: 'super_admin 测试',
          permissions: ['super_admin'],
        },
      },
      {
        path: '/redirect/22222222',
        name: 'Test2',
        component: () => import('@/views/redirect/index.vue'),
        meta: {
          title: 'admin 测试',
          permissions: ['admin'],
        },
      },
    ],
  }
]

export {
  asyncRoutes,
  constantRouters
}
