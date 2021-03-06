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
    path: '/setting',
    component: () => import('@/views/setting'),
    hidden: false
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
        name: '????????????',
        meta: { title: '????????????', icon: 'user', noCache: true }
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
  //     meta: {title: '??????', icon: 'dashboard'}
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
      meta: { title: '??????', icon: 'people' },
      affix: true // ???????????????true?????????????????????tags-view???(?????? false)
    }]
  },
  {
    path: '/study',
    component: Layout,
    name: 'Study',
    // hidden: true,
    meta: { title: '????????????', icon: 'el-icon-finished', breadcrumb: false },
    children: [
      {
        // path: '',
        path: 'todo_list',
        name: 'ToDo List',
        component: () => import('@/views/study_manage/todo_list/index'),
        meta: { title: '????????????', icon: 'el-icon-finished' }
      },
      // {
      //   path: 'study_history',
      //   name: 'History',
      //   component: () => import('@/views/study_manage/history/index'),
      //   meta: { title: '????????????', icon: 'el-icon-data-line' }
      // },
      // {
      //   path: 'study_path',
      //   name: 'History',
      //   component: () => import('@/views/study_manage/study_path/index'),
      //   meta: { title: '??????????????????', icon: 'el-icon-notebook-1' }
      // },
      // {
      //   path: 'study_path_all',
      //   name: 'History',
      //   component: () => import('@/views/study_manage/study_path_all/index'),
      //   meta: { title: '??????????????????', icon: 'el-icon-notebook-2' }
      // },
      // {
      //   path: 'study_resources',
      //   name: 'History',
      //   component: () => import('@/views/study_manage/study_resource/index'),
      //   meta: { title: '??????????????????', icon: 'el-icon-collection-tag' }
      // },
      {
        path: 'work_find',
        name: 'WorkFind',
        component: () => import('@/views/study_manage/work_find/index'),
        meta: { title: '??????????????????', icon: 'el-icon-suitcase-1' }
      }
    ]
  },
  {
    path: '/paper',
    component: Layout,
    name: 'Paper',
    meta: { title: '????????????', icon: 'pdf', breadcrumb: false },
    children: [
      {
        path: '',
        name: 'History',
        component: () => import('@/views/paper_manage/history/index'),
        // hidden: true,
        meta: { title: '??????????????????', icon: 'el-icon-document' }
      },
      {
        path: 'paper_mine',
        name: '????????????',
        component: () => import('@/views/paper_manage/paper_mine/index'),
        meta: { title: '????????????', icon: 'el-icon-reading' }
      },
      {
        path: 'paper_all',
        name: '????????????',
        component: () => import('@/views/paper_manage/paper_all/index'),
        hidden: true,
        meta: { title: '????????????', icon: 'el-icon-files' }
      },
      // {
      //   path: 'paper_show',
      //   name: '???????????????',
      //   component: () => import('@/views/paper_manage/paper_show/index'),
      //   // hidden: true,
      //   meta: { title: '???????????????', icon: 'el-icon-data-analysis' }
      // },
      {
        path: 'paper_reader/:path/:page/:id',
        // name: '???????????????',
        component: () => import('@/views/paper_manage/paper_reader/index'),
        hidden: true,
        meta: { title: '???????????????', icon: 'el-icon-view' }
      },
      {
        path: 'conference_manage',
        name: '????????????',
        component: () => import('@/views/paper_manage/paper_conference/index'),
        meta: { title: '????????????', icon: 'el-icon-message-solid' }
      }
    ]
  },
  {
    path: '/activity',
    component: Layout,
    name: 'Activity',
    // hidden: true,
    meta: { title: '????????????', icon: 'el-icon-phone-outline', breadcrumb: false },
    children: [
      {
        path: 'badminton_manage',
        name: 'Badminton Manage',
        component: () => import('@/views/activities_manage/badminton_manage/index'),
        meta: { title: '?????????????????????', icon: 'el-icon-phone-outline' }
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

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/',
  //       meta: { title: 'GitHub', icon: 'link' }
  //     }
  //   ]
  // },

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
