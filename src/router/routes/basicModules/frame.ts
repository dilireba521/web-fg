import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
const route: RouteRecordRaw = {
  path: '/frame',
  name: 'Frame',
  component: LAYOUT,
  redirect: '/frame/index',
  meta: {
    title: '投资框架',
    orderNo: 30
  },
  children: [
    {
      path: 'index',
      name: 'FrameIndex',
      component: () => import('@/views/frame/index')
    }
  ]
}
export default route
