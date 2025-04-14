import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
const route: RouteRecordRaw = {
  path: '/news',
  name: 'news',
  component: LAYOUT,
  redirect: '/news/index',
  meta: {
    title: '信息资讯',
    orderNo: 50
  },
  children: [
    {
      path: 'index',
      name: 'NewsIndex',
      component: () => import('@/views/news/index')
    }
  ]
}
export default route
