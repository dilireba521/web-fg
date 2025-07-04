import { useGet, usePost } from '@/utils/http'

enum Api {
    USER_LOGS = '/web/user/logs/',
    SLIDERS = '/web/sliders/',
    USER_FUND_DAILY = '/web/user/fund/daily/',
    USER_FUND_NETORTH = '/web/user/fund/netorth/',
    USER_FUND_NOTICE = '/web/user/fund/notice/',
    USER_FUND_NOTICE_INFO = '/web/user/fund/notice/info/',
    USER_FUND_SRLIST = '/web/user/fund/srlist/',
    USER_ASSET_AF = '/web/user/asset/af/',
    USER_ASSET_MAP = '/web/user/asset/map/',
    USER_FUND_LIST = '/web/user/fund/list/',
    USER_ASSET_INFO = '/web/user/asset/info/',
    USER_INFO = '/web/userinfo/',
    CHANGE_PASSWORD = '/web/change/password/',
}

export const useGetSliders= (params?: any) => useGet(Api.SLIDERS, params)
export const useGetUserLogs= (params?: any) => useGet(Api.USER_LOGS, params)
export const useGetUserFundDaily= (params?: any) => useGet(Api.USER_FUND_DAILY, params)
export const useGetUserFundNetorth= (params?: any) => useGet(Api.USER_FUND_NETORTH, params)
export const useGetUserFundNotice= (params?: any) => useGet(Api.USER_FUND_NOTICE, params)
export const useGetUserFundNoticeInfo= (params?: any) => useGet(Api.USER_FUND_NOTICE_INFO, params)
export const usePostUserFundNoticeInfo= (data?: any) => usePost(Api.USER_FUND_NOTICE_INFO, data)
export const useGetUserFundSrlist= (params?: any) => useGet(Api.USER_FUND_SRLIST, params)
export const useGetUserAssetAf = (params?: any) => useGet(Api.USER_ASSET_AF, params)
export const useGetUserAssetMap = (params?: any) => useGet(Api.USER_ASSET_MAP, params)
export const useGetUserFundList = (params?: any) => useGet(Api.USER_FUND_LIST, params)
export const usePostUserFundList = (data?: any) => usePost(Api.USER_FUND_LIST, data)
export const useGetUserAssetInfo = (params?: any) => useGet(Api.USER_ASSET_INFO, params)

export const usePostChangePas = (data?: any) => usePost(Api.CHANGE_PASSWORD, data)

export const useGetUserInfo = (params?: any) => useGet(Api.USER_INFO, params)

export const usePostUserInfo = (data?: any) => usePost(Api.USER_INFO, data)
