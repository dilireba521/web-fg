import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic'
import type { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
// import { LAYOUT } from '@/router/constant'

// 公开路由模块
const basicModules = import.meta.glob('./basicModules/**/*.ts', { eager: true })
export const routebasicModuleList: RouteRecordRaw[] = []

// 加入到路由集合中
function addRoute(moduleList: Record<string, unknown>, routeList: RouteRecordRaw[]) {
  Object.keys(moduleList).forEach((key) => {
    const mod = (moduleList as any)[key].default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    routeList.push(...modList)
  })
}
addRoute(basicModules, routebasicModuleList)
// 根路由
export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root'
  }
}
// 未经许可的基本路由
export const basicRoutes = [RootRoute, ...routebasicModuleList, PAGE_NOT_FOUND_ROUTE]
