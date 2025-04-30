// @ts-nocheck
// 此文件中的所有类型错误都将被忽略
import type { UserInfo } from '#/store'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { getAuthCache, setAuthCache } from '@/utils/auth'
import { TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'
import { useGetUserInfo } from '@/api/user'
// import { useGo } from '@/hooks/web/usePage'
import { Modal } from 'ant-design-vue'
import { h } from 'vue'
import { router } from '@/router'
interface UserState {
  token?: string
  userInfo?: any
  lastUpdateTime: number
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: undefined,
    userInfo: undefined,
    lastUpdateTime: 0
  }),
  getters: {
    getUserInfo(state): UserInfo {
      // 使用类型断言解决类型不匹配问题
      return state.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY as any) || {}
    },
    getToken: (state) => state.token || getAuthCache<string>(TOKEN_KEY),
    getLastUpdateTime(state): number {
      return state.lastUpdateTime
    }
  },
  actions: {
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      // 使用类型断言解决类型不匹配问题
      setAuthCache(USER_INFO_KEY as any, info)
    },
    async setToken(info: string | undefined) {
      this.token = info
      await setAuthCache(TOKEN_KEY, info)
    },
    resetState() {
      this.token = undefined
      this.userInfo = undefined
      this.lastUpdateTime = 1
    },
    async getUserInfoAction() {
      if (!this.getToken) return null
      try {
        const { data } = await useGetUserInfo()
        if (data.value?.retCode == 0) {
          this.setUserInfo(data.value?.data)
        }
      } catch (error) {
        console.log(error)
      }
    },

    async afterLogin(info: string) {
      this.setToken(info)
      if (!this.getToken) return null
      try {
        const { data } = await useGetUserInfo()
        if (data.value?.retCode == 0) {
          this.setUserInfo(data.value?.data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async loginOut() {
      if (this.getToken) {
        // TODO 调用登出接口
      }
      await this.setToken(undefined)
      this.setUserInfo(null)
      this.resetState()
      router.replace('/')
    },
    confirmLoginOut() {
      Modal.confirm({
        title: () => h('span', { class: 'text-primary' }, '确定要退出登录吗？'),
        centered: true,
        cancelButtonProps: {
          className: 'is-gray',
          type: 'primary'
        },
        onOk: async () => {
          this.loginOut()
        }
      })
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
