// 404 on a page
export const PAGE_NOT_FOUND_ROUTE = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  redirect: '/'
  // component: () => import('@/views/home/index'),
}
