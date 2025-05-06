import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
const route: RouteRecordRaw = {
  path: '/mail',
  name: 'mail',
  component: LAYOUT,
  redirect: '/mail/index',
  meta: {
    title: '信息披露',
    orderNo: 40
  },
  children: [
    {
      path: 'index',
      name: 'mailIndex',
      component: () => import('@/views/mail/index/index.vue')
    }
  ]
}
export default route
