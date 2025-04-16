import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
const route: RouteRecordRaw = {
  path: '/hireDetail',
  name: 'HireDetail',
  component: LAYOUT,
  redirect: '/hireDetail/index',
  meta: {
    title: '招聘信息'
  },
  children: [
    {
      path: 'index',
      name: 'HireDetailIndex',
      component: () => import('@/views/hireDetail/index')
    }
  ]
}
export default route
