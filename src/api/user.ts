import { useGet, usePost } from '@/utils/http'

enum Api {
    USER_INFO = '/web/userinfo/',
    CHANGE_PASSWORD = '/web/change/password/',
}

export const usePostChangePas = (data?: any) => usePost(Api.CHANGE_PASSWORD, data)

export const useGetUserInfo = (params?: any) => useGet(Api.USER_INFO, params)

export const usePostUserInfo = (data?: any) => usePost(Api.USER_INFO, data)
