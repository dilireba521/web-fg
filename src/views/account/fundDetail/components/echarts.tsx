import { renderBasicPanel, renderPanel } from '@/views/account/index/components/modules'
import { ref, onMounted, watch, nextTick, reactive } from 'vue'
import { formatNumberWithCommas } from '@/utils/formate'
import { useECharts } from '@/hooks/web/useECharts'
import { Select, Empty, RangePicker, Tooltip, Spin, DatePicker } from 'ant-design-vue'
import { BasicSkeleton } from '@/components/skeleton'
import { useGetUserFundNetorth } from '@/api/user'
import dayjs, { Dayjs } from 'dayjs'
import { useRoute } from 'vue-router'

//净值曲线
export function useRenderTotalEchart() {
  const loading = ref(true)
  const spinning = ref(false)
  const chartDom = ref(null)
  const { setOptions } = useECharts(chartDom as any)
  const route = useRoute()

  const record = ref([])
  const searchInfo = reactive({
    year: dayjs(new Date().getFullYear().toString()),
    // unit: 'CNY'
    time: []
  })
  async function useGetUserFundNetorthFn() {
    try {
      spinning.value = true
      const _params: any = {
        id: route.query.id
      }
      if (searchInfo.year) {
        _params.year = searchInfo.year.format('YYYY')
      }
      if (searchInfo.time?.length > 0) {
        _params.beginDate = searchInfo.time[0]?.format('YYYY-MM-DD')
        _params.endDate = searchInfo.time[1]?.format('YYYY-MM-DD')
      }
      const { data } = await useGetUserFundNetorth(_params)
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
    () => searchInfo,
    () => {
      useGetUserFundNetorthFn()
    },
    { immediate: true, deep: true }
  )
  watch(
    () => searchInfo.year,
    (curV, oldV) => {
      if (curV) {
        useGetUserFundNetorthFn()
        searchInfo.time = []
      }
    },
    { immediate: true, deep: true }
  )
  watch(
    () => searchInfo.time,
    (curV, oldV) => {
      if (curV?.length > 0) {
        useGetUserFundNetorthFn()
        searchInfo.year = null
      }
    },
    { immediate: true, deep: true }
  )

  function initData() {
    const _xAxisData: any = [],
      _seriesData1: any = []
    if (record.value?.length > 0) {
      record.value?.forEach((item: any) => {
        _xAxisData.push(item.date)
        _seriesData1.push(item.netWorth)
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
                                  &nbsp;${formatNumberWithCommas(params[0].value)}
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
      color: ['#F55458FF'],
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
          // name: record?.[0]?.name,
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
      title: '净值曲线',
      content: () => (
        <BasicSkeleton loading={loading.value}>
          <Spin spinning={spinning.value}>
            <div class="px-4 pt-4 pb-2">
              <div class="flex justify-end gap-2">
                <DatePicker v-model:value={searchInfo.year} picker="year"></DatePicker>
                <RangePicker v-model:value={searchInfo.time}></RangePicker>
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
