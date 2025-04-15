import { useGet, usePost } from '@/utils/http'

enum Api {
    NEWS_CATE = '/ow/news/category/',
    NEWS_INFO = '/ow/news/',
    HIRE_INFO = '/ow/hire/',
    MILESTONE_INFO = '/ow/milestone/',
    USER_INFO = '/user/info'
}

export const useGetNewsInfo = (params?: any) => useGet(Api.NEWS_INFO, params)

export const useGetHireInfo = (params?: any) => useGet(Api.HIRE_INFO, params)

export const useGetMilestoneInfo = (params?: any) => useGet(Api.MILESTONE_INFO, params)

export const useGetNewsCateInfo = (params?: any) => useGet(Api.NEWS_CATE, params)

export const useGetUserInfo = (params?: any) => useGet(Api.USER_INFO, params)

export const usePostUserInfo = (data?: any) => usePost(Api.USER_INFO, data)
