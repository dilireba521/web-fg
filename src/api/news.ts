import { useGet, usePost } from '@/utils/http'

enum Api {
    CATEGORY = '/web/news/category/',
    NEWS = '/web/news/',
    NEWS_INFO = '/web/news/info/',
}

export const useGetNewsCategory = (params?: any) => useGet(Api.CATEGORY, params)
export const useGetNewsInfo = (params?: any) => useGet(Api.NEWS_INFO, params)
export const usePostNewsInfo = (data?: any) => usePost(Api.NEWS_INFO, data)
export const useGetNews = (params?: any) => useGet(Api.NEWS, params)

export const usePostNews = (data?: any) => usePost(Api.NEWS, data)
