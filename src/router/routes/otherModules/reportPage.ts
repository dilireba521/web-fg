import type { RouteRecordRaw } from 'vue-router'
const route: RouteRecordRaw = {
  path: '/reportPage',
  name: 'ReportPage',
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
