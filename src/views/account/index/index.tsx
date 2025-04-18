import { defineComponent, onMounted, ref } from 'vue'
import { renderPanel, renderBasicPanel } from './components/modules'
import { Row, Col, Select } from 'ant-design-vue';
import { formatNumberWithCommas } from "@/utils/formate"
import { useRenderTotalEchart } from './components/echarts'
import { BasicSkeleton } from '@/components/skeleton';
import { SwapOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  setup(props, ctx) {
    const loading = ref(true)
    const isSwapped = ref(false)
    onMounted(() => {
      setTimeout(() => {
        loading.value = false
      }, 3000)
    })
    const { render: renderTotalEchart } = useRenderTotalEchart()
    function handleChangeMore() {
      isSwapped.value = !isSwapped.value
    }
    return () => <div class="container">
      <div class='pt-6'>
        <Row gutter={8}>
          <Col span={10}>
            <BasicSkeleton loading={loading.value}>
              <Row>
                <Col span={12}>
                  {renderPanel({
                    title: '总资产AUM',
                    type: 'default',
                    panelClass: 'h-[124px]',
                    content: () => (<div class='pt-2'>
                      <div class='text-xs color-tertiary leading-5'>CNY</div>
                      <div class='font-h5'>{formatNumberWithCommas(1234567890.00)}</div>
                      <div class='text-nowrap flex gap-6 leading-5 text-xs color-tertiary pt-3'>
                        <div>最新折算汇率：7.3</div>
                        <div>数据来源：中国银行</div>
                      </div>
                    </div>),
                  })}
                </Col>
                <Col span={12}>
                  {renderPanel({
                    title: '总收益',
                    type: 'default',
                    panelClass: 'h-[124px]',
                    content: () => (<div class='pt-2'>
                      <div class='text-xs color-tertiary leading-5'>CNY</div>
                      <div class='font-h5'>1,234,567,890.00</div>
                    </div>),
                  })}
                </Col>
              </Row>
            </BasicSkeleton>
          </Col>
          <Col span={10}>
            <BasicSkeleton loading={loading.value}>
              {renderPanel({
                title: '资产组合',
                type: 'default',
                panelClass: 'h-[124px]',
                more: () => (<div class='mr-2'><SwapOutlined onClick={handleChangeMore} /></div>),
                content: () => (<div class='pt-2'>
                  <Row>
                    <Col span={12}>
                      <div class='text-xs color-tertiary leading-5'>CNY</div>
                      <div class='font-h5'>{isSwapped.value ? '90.00%' : '8,510.30'}</div>
                      <div class='leading-5 text-xs pt-2'>{!isSwapped.value ? '90.00%' : '8,510.30'}</div>
                    </Col>
                    <Col span={12}>
                      <div class='text-xs color-tertiary leading-5'>USD</div>
                      <div class='font-h5'>{isSwapped.value ? '90.00%' : '8,510.30'}</div>
                      <div class='leading-5 text-xs pt-2'>{!isSwapped.value ? '90.00%' : '8,510.30'}</div>
                    </Col>
                  </Row>
                </div>),
              })}
            </BasicSkeleton>
          </Col>
          <Col span={4}>
            <BasicSkeleton loading={loading.value}>
              {renderPanel({
                title: '持有基金数量',
                type: 'default',
                panelClass: 'h-[124px] flex flex-col',
                content: () => (<div class="w-full flex-1 flex items-center justify-center pr-4 pb-3 font-h5">222</div>),
              })}
            </BasicSkeleton>
          </Col>
        </Row>

      </div>
      {/* 总资产规模 */}
      <div class='pt-6'>
        {renderTotalEchart()}
      </div>
    </div>
  }
})

