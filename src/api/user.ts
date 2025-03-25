import { useGet, usePost } from '@/utils/http'

enum Api {
    USER_INFO = '/user/info'
}

export const useGetUserInfo = (params?: any) => useGet(Api.USER_INFO, params)

export const usePostUserInfo = (data?: any) => usePost(Api.USER_INFO, data)
