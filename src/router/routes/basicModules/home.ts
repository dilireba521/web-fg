import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
const route: RouteRecordRaw = {
  path: '/',
  name: 'home',
  component: LAYOUT,
  redirect: '/home',
  meta: {
    title: '首页',
    orderNo: 10
  },
  children: [
    {
      path: 'home',
      name: 'HomeIndex',
      component: () => import('@/views/home/index')
    }
  ]
}
export default route
