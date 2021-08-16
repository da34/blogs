import { renderIcon } from '@/utils'
import { SpaceDashboardRound, ReportGmailerrorredSharp, AdminPanelSettingsRound } from '@vicons/material'
const routeName = 'dashboard';
const RedirectName = 'redirect';
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
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/redirect',
    name: RedirectName,
    component: Layout,
    meta: {
      title: RedirectName,
    },
    hidden: true,
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
    path: '/',
    name: routeName,
    component: Layout,
    meta: {
      title: 'Dashboard',
      alwaysShow: true,
      icon: renderIcon(SpaceDashboardRound),
      // permissions: ['super_admin', 'admin'],
      sort: 0,
    },
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: `${routeName}_dashboard`,
        // icon: renderIcon(SpaceDashboardRound),
        component: () => import('@/views/dashboard/console/console.vue'),
        meta: { title: '控制台', keepAlive: true }
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: Layout,
    meta: {
      title: 'Test',
      icon: renderIcon(AdminPanelSettingsRound),
    },
    children: [
      {
        path: 'redirect/1111111',
        name: 'test1',
        component: () => import('@/views/redirect/index.vue'),
        meta: {
          title: 'super_admin 测试',
          permissions: ['super_admin'],
        },
      },
      {
        path: 'redirect/22222222',
        name: 'test2',
        component: () => import('@/views/redirect/index.vue'),
        meta: {
          title: 'admin,super_admin 测试',
          permissions: ['admin', 'super_admin'],
        },
      },
    ],
  },
  {
    path: '/:path(.*)*',
    name: 'errorPage',
    component: Layout,
    meta: {
      title: '错误页',
      sort: 1
      // icon: renderIcon(ReportGmailerrorredSharp),
    },
    children: [
      {
        path: '/:path(.*)*',
        name: 'errorPageSon',
        icon: renderIcon(ReportGmailerrorredSharp),
        component: () => import('@/views/exception/404.vue'),
        meta: {
          title: '404',
        },
      },
    ],
  },
]

export {
  asyncRoutes,
  constantRouters
}
