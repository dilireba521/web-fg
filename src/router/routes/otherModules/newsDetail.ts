import type { RouteRecordRaw } from 'vue-router'
const route: RouteRecordRaw = {
  path: '/newsDetail',
  name: 'NewsDetail',
  redirect: '/newsDetail/index',
  meta: {
    title: '新闻详情'
  },
  children: [
    {
      path: 'index',
      name: 'NewsDetailIndex',
      component: () => import('@/views/newsDetail/index')
    }
  ]
}
export default route
