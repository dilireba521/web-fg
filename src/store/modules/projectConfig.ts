import { defineStore } from 'pinia'
import { Persistent } from '@/utils/cache/persistent'
import { PROJ_CFG_KEY } from '@/enums/cacheEnum'

interface ProjectConfigState {
  optionsMap: any
}
// 自定义项目配置
export const useProjectConfigStore = defineStore({
  id: 'app-project-config',
  state: (): ProjectConfigState => ({
    // 下拉数据
    optionsMap: null,
  }),
  getters: {
    getProjectConfig(state): ProjectConfigState {
      return state?.optionsMap || Persistent.getSession(PROJ_CFG_KEY) || ({} as ProjectConfigState)
    },
    getOptionsMap(state): any {
      const _mapSession = Persistent.getSession(PROJ_CFG_KEY)?.optionsMap || {}
      const _map = state.optionsMap || {}
      return { ..._mapSession, ..._map }
    },
  },
  actions: {
    setOptionsMap(val: any) {
      this.optionsMap = val ? val : {}
      Persistent.setSession(PROJ_CFG_KEY, this.$state as any, false, 60 * 60 * 1000)
    },
  }
})
