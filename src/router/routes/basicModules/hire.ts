import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
const route: RouteRecordRaw = {
  path: '/hire',
  name: 'Hire',
  component: LAYOUT,
  redirect: '/hire/index',
  meta: {
    title: '招贤纳士',
    orderNo: 60
  },
  children: [
    {
      path: 'index',
      name: 'hireIndex',
      component: () => import('@/views/hire/index')
    }
  ]
}
export default route
