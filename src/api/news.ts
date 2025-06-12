import { useGet, usePost } from '@/utils/http'

enum Api {
    NEWS = '/web/news/',
}

export const useGetNews = (params?: any) => useGet(Api.NEWS, params)

export const usePostNews = (data?: any) => usePost(Api.NEWS, data)
