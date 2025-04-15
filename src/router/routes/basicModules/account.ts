import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
const route: RouteRecordRaw = {
  path: '/account',
  name: 'Account',
  component: LAYOUT,
  redirect: '/account/index',
  meta: {
    title: '账户管理',
    orderNo: 30
  },
  children: [
    {
      path: 'index',
      name: 'AccountIndex',
      component: () => import('@/views/account/layout/index'),
      meta: {
        title: '账户信息',
        orderNo: 10,
        active: '/account/layout' // 激活的菜单-面包屑或二级菜单必须要定义
      },
    }
  ]
}
export default route
