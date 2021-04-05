import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/study/todo_list', // TODO
    component: () => import('@/views/welcome'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: '个人信息',
        meta: { title: '个人信息', icon: 'user', noCache: true }
      }
    ]
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: {title: '首页', icon: 'dashboard'}
  //   }]
  // },
  {
    path: '/index',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'people' },
      affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)
    }]
  },
  {
    path: '/study',
    component: Layout,
    name: 'Study',
    // hidden: true,
    meta: { title: '学习管理', icon: 'el-icon-finished', breadcrumb: false },
    children: [
      {
        // path: '',
        path: 'todo_list',
        name: 'ToDo List',
        component: () => import('@/views/study_manage/todo_list/index'),
        meta: { title: '今日待办', icon: 'el-icon-finished' }
      },
      // {
      //   path: 'study_history',
      //   name: 'History',
      //   component: () => import('@/views/study_manage/history/index'),
      //   meta: { title: '学习历史', icon: 'el-icon-data-line' }
      // },
      // {
      //   path: 'study_path',
      //   name: 'History',
      //   component: () => import('@/views/study_manage/study_path/index'),
      //   meta: { title: '我的学习路线', icon: 'el-icon-notebook-1' }
      // },
      // {
      //   path: 'study_path_all',
      //   name: 'History',
      //   component: () => import('@/views/study_manage/study_path_all/index'),
      //   meta: { title: '全部学习路线', icon: 'el-icon-notebook-2' }
      // },
      // {
      //   path: 'study_resources',
      //   name: 'History',
      //   component: () => import('@/views/study_manage/study_resource/index'),
      //   meta: { title: '全部学习资源', icon: 'el-icon-collection-tag' }
      // },
      {
        path: 'work_find',
        name: 'WorkFind',
        component: () => import('@/views/study_manage/work_find/index'),
        meta: { title: '找工作知识点', icon: 'el-icon-suitcase-1' }
      }
    ]
  },
  {
    path: '/paper',
    component: Layout,
    name: 'Paper',
    meta: { title: '论文管理', icon: 'pdf', breadcrumb: false },
    children: [
      {
        path: '',
        name: 'History',
        component: () => import('@/views/paper_manage/history/index'),
        // hidden: true,
        meta: { title: '论文阅读历史', icon: 'el-icon-document' }
      },
      {
        path: 'paper_mine',
        name: '我的论文',
        component: () => import('@/views/paper_manage/paper_mine/index'),
        meta: { title: '我的论文', icon: 'el-icon-reading' }
      },
      {
        path: 'paper_all',
        name: '全部论文',
        component: () => import('@/views/paper_manage/paper_all/index'),
        hidden: true,
        meta: { title: '全部论文', icon: 'el-icon-files' }
      },
      // {
      //   path: 'paper_show',
      //   name: '论文可视化',
      //   component: () => import('@/views/paper_manage/paper_show/index'),
      //   // hidden: true,
      //   meta: { title: '论文可视化', icon: 'el-icon-data-analysis' }
      // },
      {
        path: 'paper_reader/:path/:page/:id',
        // name: '论文阅读器',
        component: () => import('@/views/paper_manage/paper_reader/index'),
        hidden: true,
        meta: { title: '论文阅读器', icon: 'el-icon-view' }
      },
      {
        path: 'conference_manage',
        name: '会议提醒',
        component: () => import('@/views/paper_manage/paper_conference/index'),
        meta: { title: '会议提醒', icon: 'el-icon-message-solid' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    hidden: true,
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/',
        meta: { title: 'GitHub', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
