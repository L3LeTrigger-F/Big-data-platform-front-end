import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const tableRoutes: RouteConfig = {
  path: '/evidence-chain',
  component: Layout,
  redirect: '/evidence-chain/evidence-visit',
  name: 'Table',
  meta: {
    title: 'table',
    icon: 'table',
    affix: false,
    roles: ['operator','auditor']
  },
  children: [
    {
      path: 'evidence-visit',
      component: () => import(/* webpackChunkName: "inline-edit-table" */ '@/views/evidence-chain/evidence-visit.vue'),
      name: 'InlineEditTable',
      meta: {
        icon: 'table',
        title: 'inlineEditTable',
        roles: ['operator','auditor']
      }
    },

    {
      path: 'evidence-edit',
      component: () => import(/* webpackChunkName: "complex-table" */ '@/views/evidence-chain/evidence-edit.vue'),
      name: 'ComplexTable',
      meta: { title: 'complexTable' ,
      icon: "example",
      roles: ['operator']},

    }
  ]
}

export default tableRoutes
