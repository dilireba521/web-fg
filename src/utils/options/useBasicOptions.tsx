import { nextTick, onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { toLabelValueOptions } from './basicOptions'
import { useProjectConfigStore } from '@/store/modules/projectConfig'
import { useGetNoticeCategory } from '@/api/notice'
import { useGetCategory } from '@/api/fund'
import { useGetNewsCategory } from '@/api/news'

interface Options {
  label: string
  value: string
  children?: Options[]
}
function baseFetch(api: Function, { label = 'label', value = 'value' }: Options, fn?: Function) {
  const options: Ref<any> = ref([])
  const useProjectConfig = useProjectConfigStore()
  const regex = /"\/(.+?)\/"/
  async function fetch() {
    const _key = api.toString().match(regex)?.[1]
    const _map = useProjectConfig.getOptionsMap

    if (_key && _map[_key]) {
      options.value = JSON.parse(JSON.stringify(_map[_key]))
      return Promise.resolve(JSON.parse(JSON.stringify(options.value)))
    }

    await api().then((res) => {
      if (res.data.value.data?.length > 0 || fn) {
        options.value = fn
          ? fn(res.data.value.data)
          : toLabelValueOptions(res.data.value.data, { label: label, value: value })
        if (_key) {
          useProjectConfig.setOptionsMap({
            ..._map,
            [_key]: JSON.parse(JSON.stringify(options.value))
          })
        }
        return Promise.resolve(JSON.parse(JSON.stringify(options.value)))
      }
    })
  }
  nextTick(() => {
    fetch()
  })
  // onMounted(() => {
  //   fetch()
  // })
  // 添加对 getOptionsMap 的监听
  watch(
    () => useProjectConfig.getOptionsMap,
    (newMap) => {
      const _key = api.toString().match(regex)?.[1]
      if (_key && newMap[_key] && options.value.length === 0) {
        options.value = JSON.parse(JSON.stringify(newMap[_key]))
      }
    },
    { deep: true }
  )
  return {
    options,
    fetch
  }
}

// 通知类型
export function useNoticeCategory() {
  return baseFetch(useGetNoticeCategory, { label: 'name', value: 'id' })
}

// 基金类型
export function useFundCategory() {
  return baseFetch(useGetCategory, { label: 'name', value: 'id' })
}

// 公告类型
export function useNewsCategory() {
  return baseFetch(useGetNewsCategory, { label: 'name', value: 'id' })
}