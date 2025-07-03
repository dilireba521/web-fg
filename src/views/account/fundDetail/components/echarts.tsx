import { renderBasicPanel, renderPanel } from '@/views/account/index/components/modules'
import { ref, onMounted, watch, nextTick, reactive } from 'vue'
import { formatNumberWithCommas, formateNumStr } from '@/utils/formate'
import { useECharts } from '@/hooks/web/useECharts'
import { Select, Empty, RangePicker, Tooltip, Spin, DatePicker } from 'ant-design-vue'
import { BasicSkeleton } from '@/components/skeleton'
import { useGetUserFundNetorth } from '@/api/user'
import dayjs, { Dayjs } from 'dayjs'
import { useRoute } from 'vue-router'
import { netValueCurveOptions } from '@/utils/options/basicOptions'
import { hasOwn } from '@vueuse/core'

// 单位净值
export function useRenderTotalEchart() {
  const loading = ref(true)
  const spinning = ref(false)
  const chartDom = ref(null)
  const { setOptions } = useECharts(chartDom as any)
  const route = useRoute()

  const record = ref([])
  const searchInfo = reactive({
    year: dayjs(new Date().getFullYear().toString()),
    type: '1',
    time: []
  })
  const showType = ref(false)
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
        if (record.value?.length > 0 && hasOwn(record.value[0], 'netWorthCny')) {
          showType.value = true
        }
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
    { deep: true }
  )
  watch(
    () => searchInfo.time,
    (curV, oldV) => {
      if (curV?.length > 0) {
        useGetUserFundNetorthFn()
        searchInfo.year = null
      }
    },
    { deep: true }
  )

  function setSeriesData(data: any, markPointData: any, name?: string, showMarkPoint?: boolean) {
    let _series: any = {
      name: name,
      type: 'line', // 这里可以是'line'、'bar'、'pie'等，根据图表类型选择
      data: data,
      symbol: data?.length > 1 ? 'none' : 'circle',
      smooth: true,
      visible: false,
      lineStyle: {
        width: 1
      }
    }
    if (showMarkPoint) {
      const _markPointData = []
      record.value?.forEach((item, i) => {
        if (item?.inOutSet?.length > 0) {
          let _hasOut = false,
            _hasIn = false
          console.log('item----', item?.inOutSet)
          item?.inOutSet?.forEach((item2: any) => {
            if (item2?.type == 'out') {
              _hasOut = true
            }
            if (item2?.type == 'in') {
              _hasIn = true
            }
          })
          if (_hasOut) {
            _markPointData.push({
              coord: [i, item?.netWorth],
              label: {
                color: '#fff',
                formatter: (params) => {
                  return 'S'
                }
              }
            })
          } 
          if (_hasIn) {
            _markPointData.push({
              coord: [i, item?.netWorth],
              itemStyle: {
                color: '#5BB86FFF'
              },
              symbolRotate: 180,
              label: {
                offset: [0, 6],
                color: '#fff',
                formatter: (params) => {
                  return 'B'
                }
              }
            })
          }
        }
      })

      _series = {
        ..._series,
        markPoint: {
          symbol: 'pin',
          symbolSize: 30,
          data: _markPointData
        }
      }
    }
    return _series
  }
  function initData() {
    let _isParent: any = false
    const _xAxisData: any = [],
      _series = [],
      _markPointData: any = [],
      _seriesData1: any = [],
      _seriesData2: any = [],
      _seriesData3: any = []

    if (record.value?.length > 0) {
      record.value?.forEach((item: any) => {
        _xAxisData.push(item.date)
        _seriesData1.push(item.netWorth)
        if(item?.netWorthCny)
        _seriesData2.push(item?.netWorthCny)
        if(item?.netWorthUsd)
        _seriesData3.push(item?.netWorthUsd)
        _markPointData.push(item?.inOutSet)
      })
    }
    _isParent = _seriesData2?.length > 0 && _seriesData3?.length > 0
    const _first = record.value?.[0]
    _series.push(setSeriesData(_seriesData1, _markPointData, _first?.name, true))

    if (_isParent) {
      _series.push(setSeriesData(_seriesData2, [], _first?.nameCny, false))
      _series.push(setSeriesData(_seriesData3, [], _first?.nameUsd, false))
    }

    setOptions({
      legend: {
        show: true,
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 4,
        itemGap: 36,
        textStyle: {
          color: '#000000E0'
        },
        selected: {
          [_first?.name]: true,
          [_first?.nameCny]: false,
          [_first?.nameUsd]: false
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#FFFFFF',
        textStyle: {
          color: '#000000E0',
          fontSize: 12,
          lineHeight: 20
        },
        formatter: (params) => {
          console.log(params);
          let _hasOut = false,
            _outData = 0,
          _hasIn = false,
          _inData = 0
          const _inOutSet = record.value[params[0].dataIndex]?.inOutSet
          _inOutSet?.forEach((item2: any) => {
            if (item2?.type == 'out') {
              _outData += item2?.shares
              _hasOut = true
            }
            if (item2?.type == 'in') {
              _inData += item2?.shares
              _hasIn = true
            }
          })
          let _str = `<div clsss='text-black/65'>${params[0].name}</div>
          <div style='border-bottom: 1px solid #00000026; margin: 8px 0;'></div>
          <div class='flex justify-between gap-2'>
            <div>${params[0].marker}${params[0].seriesName}</div>${formateNumStr(params[0].value)}
          </div>`
          if (_isParent) {
            if (params[1]) {
              _str += ` <div class='flex justify-between gap-2'>
              <div>${params[1].marker}${params[1].seriesName}</div>${formateNumStr(params[1].value)}
            </div>`
            }
            if (params[2]) {
              _str += ` <div class='flex justify-between gap-2'>
              <div>${params[2].marker}${params[2].seriesName}</div>${formateNumStr(params[2].value)}
            </div>`
            }
          }
          if(_hasIn){
            _str += `<div class='flex justify-between gap-2'>
            <div> 申购（金额）</div>${formateNumStr(_inData)}</div>`
          }
          if(_hasOut){
            _str += `<div class='flex justify-between gap-2'>
            <div> 赎回（份额）</div>${formateNumStr(_outData)}</div>`
          }
         
          return `<div class='min-w-30'>${_str}</div>`
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
        top: '30',
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
      series: _series
    })
  }
  function render() {
    return renderBasicPanel({
      title: '单位净值',
      content: () => (
        <BasicSkeleton loading={loading.value} paragraph={{ rows: 12 }}>
          <Spin spinning={spinning.value}>
            <div class="px-4 pt-4 pb-2">
              <div class="flex justify-end gap-2">
                {/* {
                  showType.value && <Select
                  v-model:value={searchInfo.type}
                  options={netValueCurveOptions}
                  style="width: 160px"
                ></Select>
                } */}
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
