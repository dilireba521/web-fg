import type { App } from 'vue'

import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './routes'

// 创建一个可以被 Vue 应用程序使用的路由实例
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: basicRoutes,
})

// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router)
}
