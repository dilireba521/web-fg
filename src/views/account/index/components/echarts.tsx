import { Select, Empty, RangePicker, Tooltip, DatePicker, Spin } from 'ant-design-vue'
import { BasicSkeleton } from '@/components/skeleton'
import { ref, onMounted, nextTick, watch, reactive } from 'vue'
import { renderBasicPanel, renderPanel } from './modules'
import { useECharts } from '@/hooks/web/useECharts'
import { formatNumberWithCommas } from '@/utils/formate'
import { InfoCircleOutlined } from '@ant-design/icons-vue'
import { useGetUserAssetMap, useGetUserAssetAf } from '@/api/user'
import dayjs, { Dayjs } from 'dayjs'

//总资产规模
export function useRenderTotalEchart() {
  const loading = ref(true)
  const spinning = ref(false)
  const chartDom = ref(null)
  const { setOptions } = useECharts(chartDom as any)
  const record = ref([])
  const searchInfo = reactive({
    year: dayjs(new Date().getFullYear().toString()),
    unit: 'CNY'
    // time: []
  })

  async function useGetUserAssetMapFn() {
    try {
      spinning.value = true
      const _params = {
        year: searchInfo.year.format('YYYY'),
        unit: searchInfo.unit
      }
      const { data } = await useGetUserAssetMap(_params)
      if (data.value?.retCode == 0) {
        record.value = data.value?.data
        await nextTick()
        initData()
        // console.log('record----', record.value)
      }
    } finally {
      spinning.value = false
      loading.value = false
    }
  }
  watch(
    () => searchInfo,
    () => {
      useGetUserAssetMapFn()
    },
    { immediate: true, deep: true }
  )
  function initData() {
    const _xAxisData: any = [],
      _seriesData1: any = []
    if (record.value) {
      record.value?.forEach((item: any) => {
        _xAxisData.push(item.date)
        _seriesData1.push(item.asset?.toFixed(2))
      })
    }
    setOptions({
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#FFFFFF',
        textStyle: {
          color: '#000000E0',
          fontSize: 12,
          lineHeight: 20
        },
        formatter: (params) => {
          return `<div class='min-w-30'>
                                <div clsss='text-black/65'>${params[0].name}</div>
                                <div style='border-bottom: 1px solid #00000026; margin: 8px 0;'></div>
                                ${searchInfo.unit == 'CNY' ? '¥' : '$'}&nbsp;${formatNumberWithCommas(params[0].value)}
                            </div>`
        },
        axisPointer: {
          type: 'line',
          lineStyle: {
            type: [4, 6],
            color: '#C1272D40'
          }
        }
      },
      color: searchInfo.unit == 'CNY' ? '#F55458FF' : '#5BB86FFF',
      grid: {
        left: '0',
        right: 20,
        bottom: '0',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          color: '#000000A6'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#eaeaeaFF'
          }
        },
        axisTick: {
          show: false
        },
        data: _xAxisData
      },
      yAxis: [
        {
          // name: 'AUM',
          type: 'value',
          alignTicks: true,
          axisLabel: {
            color: '#000000A6',
            formatter: '{value}'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#000000', // #fff 0.2
              type: [2, 6],
              dashOffset: 5,
              opacity: 0.1
            }
          },
          scale: true
        }
      ],
      series: [
        {
          name: record?.[0]?.name,
          type: 'line', // 这里可以是'line'、'bar'、'pie'等，根据图表类型选择
          data: _seriesData1,
          symbol: _seriesData1?.length > 1 ? 'none' : 'circle',
          smooth: true,
          lineStyle: {
            width: 1
          }
        }
      ]
    })
  }
  function render() {
    return renderBasicPanel({
      title: '总资产规模',
      content: () => (
        <BasicSkeleton loading={loading.value}>
          <Spin spinning={spinning.value}>
            <div class="px-4 pt-4 pb-2">
              <div class="flex justify-end gap-2">
                <Select allowClear={false} v-model:value={searchInfo.unit}>
                  <Select.Option value="CNY">CNY</Select.Option>
                  <Select.Option value="USD">USD</Select.Option>
                </Select>
                <DatePicker
                  allowClear={false}
                  v-model:value={searchInfo.year}
                  picker="year"
                ></DatePicker>
                {/* <Select v-model:value={searchInfo.year}>
                <Select.Option value="年">年</Select.Option>
                <Select.Option value="月">月</Select.Option>
              </Select> */}
              </div>
              <div style="height:344px">
                <div
                  ref={chartDom}
                  style={{ height: record.value?.length == 0 ? '1px' : '344px' }}
                ></div>
                <BasicSkeleton
                  loading={false}
                  showEmpty={record.value?.length == 0}
                ></BasicSkeleton>
              </div>
            </div>
          </Spin>
        </BasicSkeleton>
      )
    })
  }
  return {
    render,
    loading
  }
}

// 资产占比
export function useAssetPie(record: any, loading: any) {
  const chartDom = ref(null)
  const { setOptions } = useECharts(chartDom as any)

  watch(
    () => record,
    (cur) => {
      initData()
    },
    { immediate: true, deep: true }
  )

  function initData() {
    const _data =
      record.value?.length > 0
        ? record.value?.map((item: any) => ({
            value: Number(parseFloat(item.totalEquity).toFixed(4)),
            name: item.name
          }))
        : []
    setOptions({
      series: [
        {
          type: 'pie',
          radius: ['30%', '45%'],
          center: ['50%', '55%'],
          color: ['#F55458FF', '#5BB86FFF'],
          label: {
            formatter: `{b} {d}%`,
            color: '#000000E0'
          },
          data: _data,
          animationType: 'scale',
          animationEasing: 'exponentialInOut',
          animationDelay: function () {
            return Math.random() * 400
          }
        }
      ]
    })
  }
  function render() {
    return (
      <BasicSkeleton paragraph={{ rows: 12, width: '100%' }} loading={loading.value}>
        {renderPanel({
          title: '资产占比',
          content: () => (
            <div style="height:400px">
              <div
                ref={chartDom}
                style={{ height: record.value?.length == 0 ? '1px' : '400px' }}
              ></div>
              <BasicSkeleton loading={false} showEmpty={record.value?.length == 0}></BasicSkeleton>
            </div>
          )
        })}
      </BasicSkeleton>
    )
  }
  return {
    render
  }
}

// 持有基金占比
export function useFundPie(record: any, loading: any) {
  const chartDom = ref(null)
  const { setOptions } = useECharts(chartDom as any)

  watch(
    () => record,
    (cur) => {
      initData()
    },
    { immediate: true, deep: true }
  )

  function initData() {
    const _data =
      record.value?.length > 0
        ? record.value?.map((item: any) => ({
            value: Number(parseFloat(item.totalEquity).toFixed(4)),
            name: item.name
          }))
        : []
    setOptions({
      legend: {
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 4,
        textStyle: {
          color: '#000000E0'
        },
        formatter: function (name) {
          return name.length > 6 ? name.slice(0, 6) + '...' : name
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['30%', '45%'],
          center: ['50%', '55%'],
          color: ['#2C97EB', '#FFD54F', '#5BB86F', '#F55458'],
          label: {
            formatter: `{b}\n{d}%`,
            color: '#000000E0',
            overflow: 'truncate'
          },
          data: _data,
          animationType: 'scale',
          animationEasing: 'exponentialInOut',
          animationDelay: function () {
            return Math.random() * 400
          }
        }
      ]
    })
  }
  function render() {
    return (
      <BasicSkeleton paragraph={{ rows: 12, width: '100%' }} loading={loading.value}>
        {renderPanel({
          title: '持有基金占比',
          content: () => (
            <div style="height:400px">
              <div
                ref={chartDom}
                style={{ height: record.value?.length == 0 ? '1px' : '400px' }}
              ></div>
              <BasicSkeleton loading={false} showEmpty={record.value?.length == 0}></BasicSkeleton>
            </div>
          )
        })}
      </BasicSkeleton>
    )
  }
  return {
    render
  }
}

// 持有基金市值（CNY）
export function useFundValue(record: any, loading: any) {
  const chartDom = ref(null)
  const { setOptions } = useECharts(chartDom as any)

  watch(
    () => record,
    (cur) => {
      initData()
    },
    { immediate: true, deep: true }
  )

  function initData() {
    const _data =
      record.value?.length > 0
        ? record.value?.map((item: any) => ({
            value: Number(parseFloat(item.totalEquity).toFixed(4)),
            name: item.name
          }))
        : []
    setOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '0',
        right: 20,
        bottom: '8',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          color: '#000000A6'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#eaeaeaFF'
          }
        },
        axisTick: {
          show: false
        },
        data: _data?.map((item: any) => item.name)
      },
      yAxis: [
        {
          // name: 'AUM',
          type: 'value',
          alignTicks: true,
          axisLabel: {
            color: '#000000A6',
            formatter: '{value}'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#000000', // #fff 0.2
              type: [2, 6],
              dashOffset: 5,
              opacity: 0.1
            }
          }
          // scale: true
        }
      ],
      series: [
        {
          type: 'bar',
          color: ['#F55458'],
          label: {
            formatter: `{b}\n{d}%`,
            color: '#000000E0'
          },
          data: _data,
          barMaxWidth: '40'
        }
      ]
    })
  }
  function render() {
    return (
      <BasicSkeleton paragraph={{ rows: 12, width: '100%' }} loading={loading.value}>
        {renderPanel({
          title: () => (
            <div class="flex">
              <div class="mr-2">持有基金市值（CNY）</div>
              <Tooltip>
                {{
                  title: '233233',
                  default: () => <InfoCircleOutlined class="text-[#FAAD14] cursor-pointer" />
                }}
              </Tooltip>
            </div>
          ),
          content: () => (
            <div style="height:400px">
              <div
                ref={chartDom}
                style={{ height: record.value?.length == 0 ? '1px' : '400px' }}
              ></div>
              <BasicSkeleton loading={false} showEmpty={record.value?.length == 0}></BasicSkeleton>
            </div>
          )
        })}
      </BasicSkeleton>
    )
  }
  return {
    render
  }
}

// 资产占比变化率
export function useAssetChangeRate() {
  const loading = ref(false)
  const spinning = ref(false)
  const chartDom = ref(null)
  const { setOptions } = useECharts(chartDom as any)
  const record = ref([])
  const searchInfo = reactive({
    year: dayjs(new Date().getFullYear().toString()),
    unit: 'CNY',
    time: []
  })

  async function useGetUserAssetAfFn() {
    try {
      spinning.value = true
      const _params: any = {
        // unit: searchInfo.unit
      }
      if (searchInfo.year) {
        _params.year = searchInfo.year.format('YYYY')
      }
      if (searchInfo.time?.length > 0) {
        _params.beginDate = searchInfo.time[0]?.format('YYYY-MM-DD')
        _params.endDate = searchInfo.time[1]?.format('YYYY-MM-DD')
      }
      const { data } = await useGetUserAssetAf(_params)
      if (data.value?.retCode == 0) {
        record.value = data.value?.data
        await nextTick()
        initData()
        console.log('record----', record.value)
      }
    } finally {
      spinning.value = false
      loading.value = false
    }
  }
  watch(
    () => searchInfo.year,
    (curV, oldV) => {
      if (curV) {
        useGetUserAssetAfFn()
        searchInfo.time = []
      }
    },
    { immediate: true, deep: true }
  )
  watch(
    () => searchInfo.time,
    (curV, oldV) => {
      if (curV?.length > 0) {
        useGetUserAssetAfFn()
        searchInfo.year = null
      }
    },
    { immediate: true, deep: true }
  )

  function initData() {
    const _xAxisData: any = [],
      _seriesData1: any = [],
      _seriesData2: any = []
    if (record.value?.length > 0) {
      record.value?.forEach((item: any) => {
        _xAxisData.push(item.date)
        _seriesData1.push(item.aumCny)
        _seriesData2.push(item.aumUsd)
      })
    }
    setOptions({
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#FFFFFF',
        textStyle: {
          color: '#000000E0',
          fontSize: 12,
          lineHeight: 20
        },
        formatter: (params) => {
          return `<div class='min-w-30'>
                                <div clsss='text-black/65'>${params[0].name}</div>
                                <div style='border-bottom: 1px solid #00000026; margin: 8px 0;'></div>
                                ¥&nbsp;${formatNumberWithCommas(params[0].value)}<br/>
                                $&nbsp;${formatNumberWithCommas(params[1].value)}
                            </div>`
        },
        axisPointer: {
          type: 'line',
          lineStyle: {
            type: [4, 6],
            color: '#C1272D40'
          }
        }
      },
      color: ['#F55458FF', '#5BB86FFF'],
      grid: {
        left: '0',
        right: 20,
        bottom: '0',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          color: '#000000A6'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#eaeaeaFF'
          }
        },
        axisTick: {
          show: false
        },
        data: _xAxisData
      },
      yAxis: [
        {
          // name: 'AUM',
          type: 'value',
          alignTicks: true,
          axisLabel: {
            color: '#000000A6',
            formatter: '{value}'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#000000', // #fff 0.2
              type: [2, 6],
              dashOffset: 5,
              opacity: 0.1
            }
          },
          scale: true
        }
      ],
      series: [
        {
          type: 'line', // 这里可以是'line'、'bar'、'pie'等，根据图表类型选择
          data: _seriesData1,
          symbol: _seriesData1?.length > 1 ? 'none' : 'circle',
          smooth: true,
          lineStyle: {
            width: 1
          }
        },
        {
          type: 'line', // 这里可以是'line'、'bar'、'pie'等，根据图表类型选择
          data: _seriesData2,
          symbol: _seriesData2?.length > 1 ? 'none' : 'circle',
          smooth: true,
          lineStyle: {
            width: 1
          }
        }
      ]
    })
  }
  function render() {
    return renderBasicPanel({
      title: '资产占比变化率',
      content: () => (
        <BasicSkeleton loading={loading.value}>
          <div class="px-4 pt-4 pb-2">
            <div class="flex justify-end gap-2">
              {/* <Select allowClear={false} v-model:value={searchInfo.unit}>
                <Select.Option value="CNY">CNY</Select.Option>
                <Select.Option value="USD">USD</Select.Option>
              </Select> */}
              <DatePicker v-model:value={searchInfo.year} picker="year"></DatePicker>
              <RangePicker v-model:value={searchInfo.time}></RangePicker>
            </div>

            <div style="height:344px">
              <div
                ref={chartDom}
                style={{ height: record.value?.length == 0 ? '1px' : '344px' }}
              ></div>
              <BasicSkeleton loading={false} showEmpty={record.value?.length == 0}></BasicSkeleton>
            </div>
          </div>
        </BasicSkeleton>
      )
    })
  }
  return {
    render,
    loading
  }
}
