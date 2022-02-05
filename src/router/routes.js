import {renderIcon} from '@/utils'
import {
  DashboardOne,
  FileWord,
  MessageOne,
  Page,
  PageTemplate,
  Permissions,
  Link,
  ApplicationOne,
  CalendarDot,
  EmailSecurity
} from '@icon-park/vue-next'
/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 * @param meta.alwaysShow 是否显示跟路由
 * @param hidden 是否在菜单显示
 * */
import Layout from '@/layout/index.vue'

const routeName = 'Dashboard';
const RedirectName = 'Redirect';
const ContentName = 'Content';
const CommentName = 'Comment';
const LinkName = 'Link';
const ProjectName = 'Project';
const HistoryName = 'History';
const PageName = 'Page';
const EmailName = 'Email';

const constantRouters = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    hidden: true,
    component: () => import('@/views/register/index.vue')
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
        // path: '/redirect/:path(.*)',
        path: '',
        name: RedirectName + 'Con',
        component: () => import('@/views/redirect/index.vue'),
        meta: {
          title: RedirectName + 'Con',
        },
      },
    ],
  }
]

const asyncRoutes = [
  {
    path: '/',
    // name: routeName,
    component: Layout,
    meta: {
      title: 'Dashboard',
      alwaysShow: false,
      icon: renderIcon(DashboardOne),
      // permissions: ['super_admin', 'admin'],
      sort: 0,
    },
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: `${routeName}`,
        icon: renderIcon(DashboardOne),
        component: () => import('@/views/dashboard/index.vue'),
        meta: {title: '控制台', keepAlive: true},
        sort: 0,
      }
    ]
  },
  {
    path: '/jurisdiction',
    name: 'jurisdiction',
    component: Layout,
    meta: {
      title: 'Test',
      icon: renderIcon(Permissions),
      alwaysShow: true,
      sort: 99,
    },
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/jurisdiction/admin.vue'),
        meta: {
          title: 'admin 测试',
          permissions: ['admin'],
        },
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/jurisdiction/user.vue'),
        meta: {
          title: 'user,admin 测试',
          permissions: ['user', 'admin'],
        },
      },
    ],
  },
  {
    path: '/content',
    name: ContentName,
    component: Layout,
    meta: {
      title: '文章管理',
      icon: renderIcon(FileWord),
      // sort: 1,
    },
    redirect: '/content/list',
    children: [
      {
        path: 'list',
        name: `${ContentName}List`,
        // name: 'ContentList',
        component: () => import('@/views/content/article/list/index.vue'),
        meta: {title: '文章列表', keepAlive: true}
      },
      {
        path: 'action',
        name: `${ContentName}Action`,
        component: () => import('@/views/content/article/action/index.vue'),
        hidden: true,
        meta: {title: '文章操作'}
      },
      {
        path: 'tag/list',
        name: `${ContentName}TagList`,
        component: () => import('@/views/content/tag/index.vue'),
        meta: {title: '标签列表', keepAlive: true}
      },
      {
        path: 'category/list',
        name: `${ContentName}CategoryList`,
        component: () => import('@/views/content/category/index.vue'),
        meta: {title: '分类列表', keepAlive: true}
      }
    ]
  },
  {
    path: '/page',
    name: PageName,
    component: Layout,
    meta: {
      title: '页面管理',
      icon: renderIcon(Page),
      // sort: 1,
      alwaysShow: false
    },
    children: [
      {
        path: '',
        name: `${PageName}List`,
        component: () => import('@/views/page/list/index.vue'),
        meta: {title: '页面管理', keepAlive: true},
        icon: renderIcon(Page),
      },
      {
        path: 'action',
        name: `${PageName}Action`,
        component: () => import('@/views/page/action/index.vue'),
        hidden: true,
        meta: {title: '页面操作'}
      },
    ]
  },
  {
    path: '/comments',
    name: CommentName,
    component: Layout,
    meta: {
      alwaysShow: false,
    },
    children: [
      {
        path: '',
        name: `${CommentName}List`,
        component: () => import('@/views/comment/index.vue'),
        meta: {title: '评论管理', keepAlive: true},
        icon: renderIcon(MessageOne),
      },
    ]
  },
  {
    path: '/links',
    name: LinkName,
    component: Layout,
    meta: { alwaysShow: false },
    children: [
      {
        path: '',
        name: `${LinkName}List`,
        component: () => import('@/views/link/index.vue'),
        meta: {title: '友联管理', keepAlive: true},
        icon: renderIcon(Link),
      }
    ]
  },
  {
    path: '/projects',
    name: ProjectName,
    component: Layout,
    meta: {
      alwaysShow: false
    },
    children: [
      {
        path: '',
        name: `${ProjectName}List`,
        component: () => import('@/views/project/index.vue'),
        meta: {title: '作品管理', keepAlive: true},
        icon: renderIcon(ApplicationOne)
      },
    ]
  },
  {
    path: '/email',
    name: EmailName,
    component: Layout,
    meta: {
      alwaysShow: false
    },
    children: [
      {
        path: '',
        name: `${EmailName}List`,
        component: () => import('@/views/email/index.vue'),
        meta: {title: '邮件管理', keepAlive: true},
        icon: renderIcon(EmailSecurity)
      },
    ]
  },
  {
    path: '/histories',
    name: HistoryName,
    component: Layout,
    meta: {
      alwaysShow: false,
    },
    children: [
      {
        path: '',
        name: `${HistoryName}List`,
        component: () => import('@/views/history/index.vue'),
        meta: {title: '建站日志', keepAlive: true},
        icon: renderIcon(CalendarDot)
      }
    ]
  },
  {
    path: '/:path(.*)*',
    name: 'errorPage',
    component: Layout,
    hidden: true,
    meta: {
      title: '错误页',
      sort: 100,
      // icon: renderIcon(ReportGmailerrorredSharp),
    },
    children: [
      {
        path: '/:path(.*)*',
        name: 'errorPageSon',
        icon: renderIcon(PageTemplate),
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
