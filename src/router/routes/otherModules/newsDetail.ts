import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
const route: RouteRecordRaw = {
  path: '/newsDetail',
  name: 'NewsDetail',
  component: LAYOUT,
  redirect: '/newsDetail/index',
  meta: {
    title: '新闻详情'
  },
  children: [
    {
      path: 'index',
      name: 'NewsDetailIndex',
      component: () => import('@/views/newsDetail/index')
    }
  ]
}
export default route
