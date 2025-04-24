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
        active: '/account/index' // 激活的菜单-面包屑或二级菜单必须要定义
      },
    },
    {
      path: 'detail',
      name: 'AccountFundDetail',
      component: () => import('@/views/account/fundDetail/index'),
      meta: {
        title: '基金详情',
        active:'/account/index',
        parentPath: '/account/index'
      }
    }
  ]
}
export default route
