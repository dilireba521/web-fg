import { useGet, usePost } from '@/utils/http'

enum Api {
  NOTICE_CATEGORY = '/web/notice/category/',
  NOTICE = '/web/notice/'
}

export const useGetNotice = (params?: any) => useGet(Api.NOTICE, params)
export const useGetNoticeCategory = (params?: any) => useGet(Api.NOTICE_CATEGORY, params)
