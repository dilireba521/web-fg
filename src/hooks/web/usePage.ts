import { useRouter } from 'vue-router'
import type { RouteLocationRaw, Router } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

interface PageConfig {
  isReplace?: Boolean
  isNewWindow?: Boolean
}
export function useGo() {
  const { push, replace, resolve } = useRouter()

  // 页面跳转
  function go(opt: RouteLocationRaw = PageEnum.BASE_HOME, pageConfig?: PageConfig) {
    if (!opt) {
      return
    }
    if (!pageConfig?.isNewWindow) {
      pageConfig?.isReplace ? replace(opt) : push(opt)
    } else {
      const _href = resolve(opt)
      window.open(_href.href, '_blank')
    }
  }

  return {
    go
  }
}
