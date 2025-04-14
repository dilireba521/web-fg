import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
const route: RouteRecordRaw = {
  path: '/connect',
  name: 'Connect',
  component: LAYOUT,
  redirect: '/connect/index',
  meta: {
    title: '联系我们',
    orderNo: 70
  },
  children: [
    {
      path: 'index',
      name: 'connectIndex',
      component: () => import('@/views/connection/index')
    }
  ]
}
export default route
