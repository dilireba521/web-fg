import type { RouteRecordRaw } from 'vue-router'
const route: RouteRecordRaw = {
  path: '/hireDetail',
  name: 'HireDetail',
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
