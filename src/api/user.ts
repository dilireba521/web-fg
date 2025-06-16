import { useGet, usePost } from '@/utils/http'

enum Api {
    USER_ASSET_MAP = '/web/user/asset/map/',
    USER_FUND_LIST = '/web/user/fund/list/',
    USER_ASSET_INFO = '/web/user/asset/info/',
    USER_INFO = '/web/userinfo/',
    CHANGE_PASSWORD = '/web/change/password/',
}

export const useGetUserAssetMap = (params?: any) => useGet(Api.USER_ASSET_MAP, params)
export const useGetUserFundList = (params?: any) => useGet(Api.USER_FUND_LIST, params)
export const usePostUserFundList = (data?: any) => usePost(Api.USER_FUND_LIST, data)
export const useGetUserAssetInfo = (params?: any) => useGet(Api.USER_ASSET_INFO, params)

export const usePostChangePas = (data?: any) => usePost(Api.CHANGE_PASSWORD, data)

export const useGetUserInfo = (params?: any) => useGet(Api.USER_INFO, params)

export const usePostUserInfo = (data?: any) => usePost(Api.USER_INFO, data)
