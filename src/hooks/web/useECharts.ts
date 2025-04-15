import type { EChartsOption } from 'echarts'
import type { Ref } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import { tryOnUnmounted, useDebounceFn } from '@vueuse/core'
import { unref, nextTick, watch, computed, ref } from 'vue'
import { useBreakpoint } from '@/hooks/event/useBreakpoint'
import { useEventListener } from '@/hooks/event/useEventListener'
import * as echarts from 'echarts'
import { formatToDate } from '@/utils/dateUtil'

export function useECharts(
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'default'
) {
  const getDarkMode = ref('dark')
  let chartInstance: echarts.ECharts | null = null
  let resizeFn: Fn = resize
  const cacheOptions = ref({}) as Ref<EChartsOption>
  let removeResizeFn: Fn = () => {}

  resizeFn = useDebounceFn(resize, 200)

  const getOptions = computed(() => {
    if (getDarkMode.value !== 'dark') {
      return cacheOptions.value as EChartsOption
    }
    return {
      tooltip: {
        backgroundColor: '#FFFFFF',
        textStyle: {
          color: '#000000E0'
        }
      },
      legend: {
        show: true,
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 4,
        itemGap: 36,
        textStyle: {
          color: '#D1D4DCFF'
        }
      },
      backgroundColor: 'transparent',
      ...cacheOptions.value
    } as EChartsOption
  })

  function initCharts(t = theme) {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }

    chartInstance = echarts.init(el, t)
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn
    })
    removeResizeFn = removeEvent
    const { widthRef, screenEnum } = useBreakpoint()
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn()
      }, 30)
    }
  }

  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options
    return new Promise((resolve) => {
      // debugger
      if (unref(elRef)?.offsetHeight === 0) {
        useTimeoutFn(() => {
          setOptions(unref(getOptions))
          resolve(null)
        }, 30)
      }
      nextTick(() => {
        useTimeoutFn(() => {
          if (!chartInstance) {
            initCharts(getDarkMode.value as 'default')

            if (!chartInstance) return
          }
          clear && chartInstance?.clear()
          chartInstance?.setOption(unref(getOptions))
          resolve(null)
        }, 30)
      })
    })
  }

  function resize() {
    chartInstance?.resize({
      animation: {
        duration: 300,
        easing: 'quadraticIn'
      }
    })
  }

  watch(
    () => getDarkMode.value,
    (theme) => {
      if (chartInstance) {
        chartInstance.dispose()
        initCharts(theme as 'default')
        setOptions(cacheOptions.value)
      }
    }
  )

  // watch(getCollapsed, (_) => {
  //   useTimeoutFn(() => {
  //     resizeFn()
  //   }, 300)
  // })

  tryOnUnmounted(() => {
    if (!chartInstance) return
    removeResizeFn()
    chartInstance.dispose()
    chartInstance = null
  })

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts(getDarkMode.value as 'default')
    }
    return chartInstance
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance
  }
}

export function useMaxMinValue(data: any[], key?: string) {
  let _min = Infinity,
    _max = -Infinity
  data.forEach((item) => {
    let _val
    if (key) {
      _val = item[key]
    } else {
      _val = item
    }
    _min = Math.min(_min, _val)
    _max = Math.max(_max, _val)
  })
  return {
    min: _min,
    max: _max
  }
}

/* 根据日期增加虚拟数据
 * data: 原始数据
 * keys: 需要增加的key
 * day: 日期字段
 */
export function addVirtualDataByDate(data: any[], keys: string[], day: string) {
  if (!data || data.length == 0) return []
  const _data = JSON.parse(JSON.stringify(data))
  const _lenAdd = Math.floor(_data.length / 2)
  const _last = _data[_data.length - 1]
  const _lastDate = new Date(_last[day])
  for (let i = 1; i <= _lenAdd; i++) {
    const _date = new Date(_lastDate.getTime() + i * 24 * 60 * 60 * 1000)
    const _item = {
      [day]: formatToDate(_date)
    }
    keys.forEach((key) => {
      _item[key] = null as any
    })
    _data.push(_item)
  }
  return _data
}

/* 根据日期增加虚拟数据-自定义方法
 * data: 原始数据
 * day: 日期字段
 * fn: 自定义方法
 */
export function addVirtualDataByDateCustom(data: any[], day: string, fn: any) {
  if (!data || data.length == 0) return []
  const _data = JSON.parse(JSON.stringify(data))
  const _lenAdd = Math.floor(_data.length / 2)
  const _last = _data[_data.length - 1]
  const _lastDate = new Date(_last[day])
  for (let i = 1; i <= _lenAdd; i++) {
    const _date = new Date(_lastDate.getTime() + i * 24 * 60 * 60 * 1000)
    const _ItemArr = fn?.(formatToDate(_date)) || []
    _data.push(..._ItemArr)
  }
  return _data
}
