import { useGet, usePost } from '@/utils/http'

enum Api {
    FUND_LIST = '/web/fund/list/'
}
export const useGetlist = (data?: any) => useGet(Api.FUND_LIST, data)
