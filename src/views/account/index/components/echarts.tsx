import { Select, Empty, Driver } from 'ant-design-vue'
import { BasicSkeleton } from '@/components/skeleton'
import { ref, onMounted, nextTick } from 'vue'
import { renderBasicPanel, renderPanel } from './modules'
import { useECharts } from '@/hooks/web/useECharts'
import { formatNumberWithCommas } from '@/utils/formate'
//总资产规模
export function useRenderTotalEchart(record: any) {
  const loading = ref(true)
  const chartDom = ref(null)
  const { setOptions } = useECharts(chartDom as any)

  onMounted(async () => {
    await nextTick() // 确保DOM已经渲染完成
    initData()
    loading.value = false
  })

  function initData() {
    const _xAxisData: any = ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      _seriesData1: any = [100, 200, 1510, 80, 70, 110, 130]
    if (record) {
      record?.forEach((item: any) => {
        _xAxisData.push(item.date)
        _seriesData1.push(item.value)
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
                                ¥&nbsp;${formatNumberWithCommas(params[0].value)}
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
          <div class="px-4 pt-4 pb-2">
            <div class="flex justify-end gap-2">
              <Select value="CNY">
                <Select.Option value="jack">CNY</Select.Option>
                <Select.Option value="lucy">USD</Select.Option>
              </Select>
              <Select value="年">
                <Select.Option value="jack">年</Select.Option>
                <Select.Option value="lucy">月</Select.Option>
              </Select>
            </div>
            <div ref={chartDom} style="height: 344px;"></div>
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

// 资产占比
export function useAssetPie(record: any) {
  const loading = ref(true)
  const chartDom = ref(null)
  const { setOptions } = useECharts(chartDom as any)

  onMounted(async () => {
    await nextTick() // 确保DOM已经渲染完成
    setTimeout(() => {
      loading.value = false
      initData()
    }, 3000)
    // loading.value = false
  })

  function initData() {
    const _data =
      record?.length > 0
        ? record?.map((item: any) => ({
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
      <BasicSkeleton paragraph={{ rows: 12, width: '100%'}} loading={loading.value}>
        {renderPanel({
          title: '资产占比',
          content: () => <div ref={chartDom} style="height: 400px;"></div>
        })}
      </BasicSkeleton>
    )
  }
  return {
    render,
    loading
  }
}

// 持有基金占比
export function useFundPie(record: any) {
    const loading = ref(true)
    const chartDom = ref(null)
    const { setOptions } = useECharts(chartDom as any)
  
    onMounted(async () => {
      await nextTick() // 确保DOM已经渲染完成
      setTimeout(() => {
        loading.value = false
        initData()
      }, 3000)
      // loading.value = false
    })
  
    function initData() {
      const _data =
        record?.length > 0
          ? record?.map((item: any) => ({
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
            color: ['#2C97EB', '#FFD54F', '#5BB86F', '#F55458'],
            label: {
              formatter: `{b}\n{d}%`,
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
        <BasicSkeleton paragraph={{ rows: 12, width: '100%'}} loading={loading.value}>
          {renderPanel({
            title: '持有基金占比',
            content: () => <div ref={chartDom} style="height: 400px;"></div>
          })}
        </BasicSkeleton>
      )
    }
    return {
      render,
      loading
    }
}