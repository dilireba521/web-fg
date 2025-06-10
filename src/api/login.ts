import { useGet, usePost } from '@/utils/http'

enum Api {
    LOGIN = '/web/login/'
}
export const usePostLogin = (data?: any) => usePost(Api.LOGIN, data)
