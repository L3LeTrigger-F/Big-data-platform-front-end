import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

/* Router modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

Vue.use(VueRouter)
/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

/**
  ConstantRoutes
  a base page that does not have permission requirements
  all roles can be accessed
*/
export const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/auth-redirect',
    component: () => import(/* webpackChunkName: "auth-redirect" */ '@/views/login/auth-redirect.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Complex-table',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    meta: { hidden: true },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/index.vue'),
        name: 'Profile',
        meta: {
          title: 'profile',
          icon: 'user',
          noCache: true
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
// 动态路由
export const asyncRoutes: RouteConfig[] = [
  {
    path: '/users',
    component: Layout,
    meta: { roles: ['admin'] },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/users/users-edit.vue'),
        name: 'users',
        meta: {
          title: 'users',
          icon: 'example',
          roles: ['admin'],
          affix: false
        }
      }
    ]
  },
  {
    path: '/dialog',
    component: Layout,
    meta: { roles: ['operator'] },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dialog/dialog-edit.vue'),
        name: 'dialog_edit',
        meta: {
          title: 'dialog_edit',
          icon: 'documentation',
          roles: ['operator'],
          affix: false
        }
      }
    ]
  },
  tableRouter,
  {
    path: '/rules-associated',
    component: Layout,
    redirect: '/rules-associated/rules-visit-table',
    meta: {
      title: 'rulesvisit',
      icon: 'edit',
      affix: true,
      roles: ['operator','auditor']
    },
    children: [
      {
        path:'rules-manage-table',
        component: () => import( '@/views/rules-associated/rules-visit-table.vue'),
        name:'rules-manage-table',
        meta:{
          title:'rulesmanage',
          icon:'edit',
          affix: true,
          roles: ['operator']
        }
      },
      {
        path:'rules-visit-table',
        component: () => import( '@/views/rules-associated/rules-manage-table.vue'),
        name:'rules-visit-table',
        meta:{
          title:'rulesvisit',
          icon:'education',
          roles: ['operator','auditor'],
          affix: true
        }
      }
    ]
  },
  {
    path: "/evidence",
    component: Layout,
    redirect:"/evidence/evidence-edit",
    meta: { title: 'evidence_edit',
    icon: 'edit',
    affix: false,
    roles: ["operator"] },
    children: [
      {
        path: "/evidence/evidence-edit",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/evidence/evidence-edit.vue"
          ),
        name: "evidence_edit",
        meta: {
          title: "evidence_edit",
          icon: "example",
          roles: ["operator"],
          affix: true
        }
      }
    ]
  }
]

const createRouter = () => new VueRouter({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
