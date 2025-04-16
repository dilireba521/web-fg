import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'
const route: RouteRecordRaw = {
  path: '/announcement',
  name: 'Announcement',
  component: LAYOUT,
  redirect: '/announcement/index',
  meta: {
    title: '资讯公告'
  },
  children: [
    {
      path: 'index',
      name: 'AnnouncementIndex',
      component: () => import('@/views/announcement/index')
    }
  ]
}
export default route
