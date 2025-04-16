import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
const route: RouteRecordRaw = {
  path: '/reportPage',
  name: 'ReportPage',
  component: LAYOUT,
  redirect: '/reportPage/index',
  meta: {
    title: '投资观察'
  },
  children: [
    {
      path: 'index',
      name: 'reportPageIndex',
      component: () => import('@/views/reportPage/index')
    }
  ]
}
export default route
