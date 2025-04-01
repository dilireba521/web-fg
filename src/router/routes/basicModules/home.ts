import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
const route: RouteRecordRaw = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/index',
  meta: {
    title: '首页',
    orderNo: 10
  },
  children: [
    {
      path: 'index',
      name: 'HomeIndex',
      meta: {
        active: '/home/index' // 激活的菜单-面包屑或二级菜单必须要定义
      },
      component: () => import('@/views/home/index')
    }
  ]
}
export default route
