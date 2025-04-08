import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
const route: RouteRecordRaw = {
  path: '/fund',
  name: 'Fund',
  component: LAYOUT,
  redirect: '/fund/index',
  meta: {
    title: '基金产品',
    orderNo: 40
  },
  children: [
    {
      path: 'index',
      name: 'FundIndex',
      component: () => import('@/views/fund/index')
    }
  ]
}
export default route
