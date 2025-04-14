import type { RouteRecordRaw } from 'vue-router'
const route: RouteRecordRaw = {
  path: '/newsPage',
  name: 'NewsPage',
  redirect: '/newsPage/index',
  meta: {
    title: '资讯公告'
  },
  children: [
    {
      path: 'index',
      name: 'NewsPageIndex',
      component: () => import('@/views/newsPage/index')
    }
  ]
}
export default route
