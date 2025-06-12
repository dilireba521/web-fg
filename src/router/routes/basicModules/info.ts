import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
const route: RouteRecordRaw = {
  path: '/info',
  name: 'Info',
  component: LAYOUT,
  redirect: '/info/index',
  meta: {
    title: '信息披露',
    orderNo: 40
  },
  children: [
    {
      path: 'index',
      name: 'InfoIndex',
      component: () => import('@/views/info/index/index')
    }, {
      path: 'detail',
      name: 'InfoDetail',
      component: () => import('@/views/info/detail/index'),
      meta: {
        title: '信息披露详情',
        active: '/info/index',
        parentPath: '/info/index'
      }
    }
  ]
}
export default route
