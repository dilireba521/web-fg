import { computed, defineComponent, onMounted, ref } from 'vue'
import { renderPanel, renderBasicPanel } from './components/modules'
import { Row, Col, Select } from 'ant-design-vue'
import { formateNumStr } from '@/utils/formate'
import {
  useRenderTotalEchart,
  useAssetChangeRate,
  useAssetPie,
  useFundPie,
  useFundValue
} from './components/echarts'
import { BasicSkeleton } from '@/components/skeleton'
import { SwapOutlined } from '@ant-design/icons-vue'
import { useGetUserAssetInfo } from '@/api/user'
export default defineComponent({
  setup(props, ctx) {
    const loading = ref(false)
    const isSwapped = ref(false)

    // 资产
    const dataSource = ref()
    // 组合比例
    const comRatio = computed(() => {
      const _cnyRatio = (((dataSource.value?.aumCny/dataSource.value?.aum) || 0) * 100).toFixed(2)  
      const _usdRatio = (((dataSource.value?.aumUsd/dataSource.value?.aum) || 0) * 100).toFixed(2)  
      return {
        cnyRatio: `${_cnyRatio}%`,
        usdRatio: `${_usdRatio}%`
      }
    })

    const assetArr = [
      {
        totalEquity: '1000000',
        name: 'CNY'
      },
      {
        totalEquity: '2000000',
        name: 'USD'
      }
    ]
    const { render: renderAssetChange } = useAssetChangeRate()
    const { render: renderTotalEchart } = useRenderTotalEchart()
    const { render: renderAssetEchart } = useAssetPie(assetArr)
    const { render: renderFundEchart } = useFundPie(assetArr)
    const { render: renderFundValueEchart } = useFundValue(assetArr)
    function handleChangeMore() {
      isSwapped.value = !isSwapped.value
    }
    async function useGetUserAssetInfoFn() {
      try {
        loading.value = true
        const { data } = await useGetUserAssetInfo()
        if (data.value?.retCode == 0) {
          dataSource.value = data.value?.data
        }
      } finally {
        loading.value = false
      }
    }
    function initData() {
      useGetUserAssetInfoFn()
    }
    initData()
    return () => (
      <div class="container pb-10">
        <div class="pt-6">
          <Row gutter={8}>
            <Col span={5}>
              <BasicSkeleton loading={loading.value}>
                {renderPanel({
                  title: '总资产AUM',
                  type: 'default',
                  panelClass: 'h-[124px]',
                  content: () => (
                    <div class="pt-2">
                      <div class="text-xs color-tertiary leading-5">CNY</div>
                      <div class="font-h5">{formateNumStr(dataSource.value?.aum)}</div>
                      <div class="text-nowrap flex gap-6 leading-5 text-xs color-tertiary pt-3">
                        <div>最新折算汇率：{dataSource.value?.exchangeRate}</div>
                        <div>数据来源：中国银行</div>
                      </div>
                    </div>
                  )
                })}
              </BasicSkeleton>
            </Col>
            <Col span={5}>
              <BasicSkeleton loading={loading.value}>
                {renderPanel({
                  title: '总收益',
                  type: 'default',
                  panelClass: 'h-[124px]',
                  content: () => (
                    <div class="pt-2">
                      <div class="text-xs color-tertiary leading-5">CNY</div>
                      <div class="font-h5">{formateNumStr(dataSource.value?.earnings)}</div>
                    </div>
                  )
                })}
              </BasicSkeleton>
            </Col>
            <Col span={5}>
              <BasicSkeleton loading={loading.value}>
                {renderPanel({
                  title: '收益率',
                  type: 'default',
                  panelClass: 'h-[124px]',
                  content: () => (
                    <div class="pt-2">
                      <div class="text-xs color-tertiary leading-5">&nbsp;</div>
                      <div class="font-h5">{dataSource.value?.earningRate}</div>
                    </div>
                  )
                })}
              </BasicSkeleton>
            </Col>
            <Col span={9}>
              <BasicSkeleton loading={loading.value}>
                {renderPanel({
                  title: '资产组合',
                  type: 'default',
                  panelClass: 'h-[124px]',
                  more: () => (
                    <div class="mr-2">
                      <SwapOutlined onClick={handleChangeMore} />
                    </div>
                  ),
                  content: () => (
                    <div class="pt-2">
                      <Row>
                        <Col span={12}>
                          <div class="text-xs color-tertiary leading-5">CNY</div>
                          <div class="font-h5">
                            {isSwapped.value ? comRatio.value?.cnyRatio : formateNumStr(dataSource.value?.aumCny)}
                          </div>
                          <div class="leading-5 text-xs pt-2">
                            {!isSwapped.value ? comRatio.value?.cnyRatio : formateNumStr(dataSource.value?.aumCny)}
                          </div>
                        </Col>
                        <Col span={12}>
                          <div class="text-xs color-tertiary leading-5">USD</div>
                          <div class="font-h5">
                            {isSwapped.value ? comRatio.value?.usdRatio : formateNumStr(dataSource.value?.aumUsd)}
                          </div>
                          <div class="leading-5 text-xs pt-2">
                            {!isSwapped.value ? comRatio.value?.usdRatio : formateNumStr(dataSource.value?.aumUsd)}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )
                })}
              </BasicSkeleton>
            </Col>
          </Row>
        </div>
        {/* 总资产规模 */}
        <div class="pt-6">{renderTotalEchart()}</div>
        {/* 资产占比 持有基金占比 持有基金市值（CNY） */}
        <Row class="mt-6" gutter={12}>
          <Col span={8}>{renderAssetEchart()}</Col>
          <Col span={8}>{renderFundEchart()}</Col>
          <Col span={8}>{renderFundValueEchart()}</Col>
        </Row>
        {/* 资产占比变化率 */}
        <div class="pt-6">{renderAssetChange()}</div>
      </div>
    )
  }
})
