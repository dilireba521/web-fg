import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
const route: RouteRecordRaw = {
  path: '/info',
  name: 'Info',
  component: LAYOUT,
  redirect: '/info/index',
  meta: {
    title: '信息披露',
    orderNo: 40
  },
  children: [
    {
      path: 'index',
      name: 'InfoIndex',
      component: () => import('@/views/info/index/index')
    }
  ]
}
export default route
