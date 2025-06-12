import type { Router, RouteRecordRaw } from 'vue-router'
import { useUserStoreWithOut } from '@/store/modules/user'
import { PageEnum } from '@/enums/pageEnum'
import { routebasicModuleList } from '../routes'
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic'

const LOGIN_PATH = PageEnum.BASE_LOGIN
const BASE_HOME = PageEnum.BASE_HOME

const whitePathList: String[] = routebasicModuleList.map((item) => item.path)

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  router.beforeEach(async (to, from, next) => {
    const token = userStore.getToken
    // console.log('token', token, to.path,whitePathList)
    console.log('useUserStoreWithOut=====', to, from)

    // get userinfo while last fetch time is empty
    if (token && userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction()
      } catch (err) {
        next()
        return
      }
    }
    // 白名单直接跳转
    // if (whitePathList.find((item: any) => to.path.startsWith(item))) {
    //   // 登录页看是否有token
    //   if (to.path === LOGIN_PATH && token) {
    //     next((to.query?.redirect as string) || '/')
    //     return
    //   }
    //   next()
    //   return
    // }
    
    
    // 未登录且无效路径,直接进入首页
    if (!token && to.path !== LOGIN_PATH) {
      next({
        path: LOGIN_PATH,
        replace: true
      })
      return
    } 
    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query })
      return
    } else {
      next()
      return
    }
  })
}
