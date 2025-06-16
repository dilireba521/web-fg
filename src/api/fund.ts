import { useGet, usePost } from '@/utils/http'

enum Api {
    FUND_LIST = '/web/fund/list/',
    FUND_INFO = '/web/fund/info/'
}
export const useGetlist = (data?: any) => useGet(Api.FUND_LIST, data)

export const useGetInfo = (data?: any) => useGet(Api.FUND_INFO, data)