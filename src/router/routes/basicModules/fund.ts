import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
const route: RouteRecordRaw = {
  path: '/fund',
  name: 'Fund',
  component: LAYOUT,
  redirect: '/fund/index',
  meta: {
    title: '基金产品',
    orderNo: 20
  },
  children: [
    {
      path: 'index',
      name: 'FundIndex',
      component: () => import('@/views/fund/index/index')
    },
    {
      path: 'detail',
      name: 'FundDetail',
      component: () => import('@/views/fund/detail/index')
    }
  ]
}
export default route
