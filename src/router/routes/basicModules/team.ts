import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
const route: RouteRecordRaw = {
  path: '/team',
  name: 'Team',
  component: LAYOUT,
  redirect: '/team/index',
  meta: {
    title: '投资团队',
    orderNo: 30
  },
  children: [
    {
      path: 'index',
      name: 'TeamIndex',
      component: () => import('@/views/team/index')
    }
  ]
}
export default route
