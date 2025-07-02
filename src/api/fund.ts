import { useGet, usePost } from '@/utils/http'

enum Api {
    FUND_CATEGORY = '/web/fund/category/',
    FUND_SR = '/web/fund/sr/',
    FUND_LIST = '/web/fund/list/',
    FUND_INFO = '/web/fund/info/'
}
export const usePostFundSr = (data?: any) => usePost(Api.FUND_SR, data)

export const useGetCategory = (data?: any) => useGet(Api.FUND_CATEGORY, data)
export const useGetlist = (data?: any) => useGet(Api.FUND_LIST, data)

export const useGetInfo = (data?: any) => useGet(Api.FUND_INFO, data)