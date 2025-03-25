import type { Router, RouteLocationNormalized } from 'vue-router'
// import { createPermissionGuard } from './permissionGuard'
// import { createStateGuard } from './stateGuard'
import { useRequestCancel } from '@/utils/http/requestCancel'
export function setupRouterGuard(router: Router) {
  createHttpGuard(router)
  // createPermissionGuard(router)
  // createStateGuard(router)
}

// 在路由切换时关闭当前页面以完成请求的接口
function createHttpGuard(router: Router) {
  const { removeAllPending } = useRequestCancel()
  router.beforeEach(() => {
    removeAllPending()
    return true
  })
}
