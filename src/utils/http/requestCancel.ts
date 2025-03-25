import type { BeforeFetchContext, AfterFetchContext, CreateFetchOptions } from '@vueuse/core'
// 用于存储每个请求的标识和取消函数
const pendingMap = new Map<string, AbortController>()
const getPendingParams = (url: String): string => {
  const _i = url.indexOf('?')
  return url.substring(_i)
}
export function useRequestCancel() {
  /**
   * 添加请求
   * @param ctx 请求配置
   */
  function addPending(ctx: BeforeFetchContext) {
    const _key = getPendingParams(ctx.url)
    if (!pendingMap.has(_key)) {
      const controller = new AbortController()
      ctx.options.signal = controller?.signal
      pendingMap.set(_key, controller)
    }
  }

  /**
   * 移除请求
   * @param ctx 请求配置
   */
  function removePending(
    ctx:
      | AfterFetchContext
      | {
          data: any
          response: Response | null
          error: any
        }
  ) {
    const _key = getPendingParams(ctx.response?.url || '')
    if (_key && pendingMap.has(_key)) {
      pendingMap.get(_key)?.abort()
      pendingMap.delete(_key)
    }
    reset()
  }
  /**
   * 清除所有等待中的请求
   */
  function removeAllPending(): void {
    pendingMap.forEach((abortController) => {
      if (abortController) {
        abortController.abort()
      }
    })
  }
  function reset(): void {
    pendingMap.clear()
  }
  return {
    addPending,
    removePending,
    removeAllPending
  }
}
