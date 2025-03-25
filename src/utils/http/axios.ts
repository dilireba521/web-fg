import axios from 'axios'
import { useUserStoreWithOut } from '@/store/modules/user'

const instance = axios.create({
  baseURL: import.meta.env.VITE_GLOB_URL
})

export function uploadImg<T = unknown>(url: string, data?: any) {
  const userStore = useUserStoreWithOut()
  return instance.post<T>(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Token: userStore.getToken
    }
  })
}

export function download<T = unknown>(url: string, data?: any) {
  const userStore = useUserStoreWithOut()
  return instance.post<T>(url, data, {
    responseType: 'blob',
    headers: {
      'Content-Type': 'multipart/form-data',
      Token: userStore.getToken
    }
  })
}
