import { createFetch, isObject, useFetch } from '@vueuse/core'
import type { CreateFetchOptions } from '@vueuse/core'
import { deepMerge } from '../index'
import { stringifyQuery, parseQuery } from 'vue-router'
import type { LocationQueryRaw } from 'vue-router'
import { joinTimestamp, formatRequestDate } from './helper'
import { useRequestCancel } from './requestCancel'
import { ref, watch } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { checkStatus } from './checkStatus'

function createRequest(opt?: Partial<CreateFetchOptions>) {
  const { addPending, removePending } = useRequestCancel()
  return createFetch(
    deepMerge(
      {
        options: {
          timeout: 60000,
          refetch: true,
          initialData: { init: 'yyy' },
          // 在请求前修改配置，如：注入 token 值
          beforeFetch(ctx) {
            const { url, options } = ctx
            const userStore = useUserStore()
            // 设置token
            if (userStore.getToken) {
              // @ts-ignore
              options.headers.Token = userStore.getToken
            }
            // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
            if (options.method == 'GET') {
              if (ctx.url.includes('?')) {
                const _index = url.indexOf('?')
                ctx.url =
                  // url.slice(0, _index) + joinTimestamp(true, true) + '&' + url.slice(_index + 1)
                  url.slice(0, _index) + '?' + url.slice(_index + 1)
              } else {
                // ctx.url += joinTimestamp(true, true)
                ctx.url
              }
            }
            // 处理请求，为了防止重复请求，添加到 pending 中
            addPending(ctx)
            return ctx
          },
          // 在请求后处理数据，如：拦截错误、处理过期
          afterFetch(ctx) {
            removePending(ctx)
            return ctx
          },
          // 请求错误
          onFetchError(ctx) {
            removePending(ctx)
            // 主动终止接口时,不做任何错误处理
            if (ctx.error.code == 20 || ctx.error.name == 'AbortError') {
              return ctx
            }
            checkStatus(ctx.response?.status ? ctx.response.status : 500, ctx.data?.msg || ctx.response?.statusText || 'Unknown Error')
            console.error(ctx)
            // data = undefined
            return ctx
          }
        }
      } as CreateFetchOptions,
      opt || {}
    )
  )
}
// console.log('import.meta.env.BASE_API_URL==', import.meta.env)

const useRequest = createRequest({
  baseUrl: import.meta.env.VITE_GLOB_URL
})
/**
 * 封装 get 请求
 * @param url 请求地址
 * @param query 请求参数
 */
export function useGet<T = unknown>(url: string, params?: LocationQueryRaw) {
  const _url = ref('')
  watch(
    () => params,
    (curV) => {
      const queryString = isObject(curV) ? stringifyQuery(curV) : curV || ''
      _url.value = `${url}${queryString ? '?' : ''}${queryString}`
    },
    { immediate: true, deep: true }
  )
  return useRequest<T>(_url).json()
}

/**
 * 封装 post 请求
 * @param url 请求地址
 * @param payload 请求参数
 */

export function usePost<T = unknown>(url: string, payload?: any) {
  return useRequest<T>(url).post(payload).json()
}
