import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const tableRoutes: RouteConfig = {
  path: '/evidence-chain',
  component: Layout,
  redirect: '/evidence-chain/evidence-edit',
  name: 'Table',
  meta: {
    title: 'table',
    icon: 'table',
    affix: false
  },
  children: [
    {
      path: 'evidence-visit',
      component: () => import(/* webpackChunkName: "inline-edit-table" */ '@/views/evidence-chain/evidence-visit.vue'),
      name: 'InlineEditTable',
      meta: { title: 'inlineEditTable' }
    },

    {
      path: 'evidence-edit',
      component: () => import(/* webpackChunkName: "complex-table" */ '@/views/evidence-chain/evidence-edit.vue'),
      name: 'ComplexTable',
      meta: { title: 'complexTable' },

    }
  ]
}

export default tableRoutes
