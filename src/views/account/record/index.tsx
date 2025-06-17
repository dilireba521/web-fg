import { defineComponent, onMounted, ref, reactive } from 'vue'
import { BasicTable } from '@/components/table'
import { basicColumns } from './data'
import { formatToDate } from '@/utils/dateUtil'
import { Select, RangePicker, Row, Col } from 'ant-design-vue'
import { StepRender } from './components/modules'
import { TextTranslate } from '@/components/OptionTranslate';
import { applyTypeOptions } from "@/utils/options/basicOptions"
import { useGetUserFundSrlist } from "@/api/user"
export default defineComponent({
  setup(props, ctx) {
    const searchInfo = reactive({
      type: null,
      queryInfo: '',
      timeRang: []
    })
    const expandedRowKeys = ref([])
    const dataSoure = ref([
      {
        name: '123',
        amount: '123',
        detail: 'dfgdf'
      },
      {
        name: '1233',
        amount: '1233',
        detail: 'sdfmlsdjflsdl'
      },
      {
        name: '1234',
        amount: '1234',
        detail: 'sdfmldfgsdfgsdjflsdl'
      }
    ])
    function beforeFetch(params: any) {
      if (params.timeRang?.length > 0) {
        params.beginTime = formatToDate(params.timeRang[0]) + ' 00:00:00'
        params.endTime = formatToDate(params.timeRang[1]) + ' 23:59:59'
      }
    }
    function expandRowCb(data: any) {
      console.log('expandRowCb===', data)
      if (expandedRowKeys.value.includes(data.record.key)) {
        expandedRowKeys.value = []
        return
      } else {
        expandedRowKeys.value = [data.record.key]
        return
      }
    }
    return () => (
      <div class="container pb-10">
        <div class="pt-10 pb-4 font-h5">申赎记录</div>
        <div class="flex mb-3">
          <div class="flex items-center  mr-4">
            <div class="font-h7 color-secondary">申请类型：</div>
            <Select
              allowClear
              v-model:value={searchInfo.type}
              placeholder="请选择"
              options={applyTypeOptions}
              class="w-40"
            ></Select>
          </div>

          <div class="flex items-center">
            <div class="font-h7 color-secondary">时间范围：</div>
            <RangePicker v-model:value={searchInfo.timeRang}></RangePicker>
          </div>
        </div>
        <BasicTable
          api={useGetUserFundSrlist}
          searchInfo={searchInfo}
          expandedRowKeys={expandedRowKeys.value}
          expandIconColumnIndex={-1}
          beforeFetch={beforeFetch}
          columns={basicColumns(expandRowCb, expandedRowKeys)}
        >
          {/* {{
            expandedRowRender: ({ record }) => {
              const current = 1
              const _steps = [
                {
                  title: '赎回申请',
                  desc: '1'
                },
                {
                  title: '赎回确认',
                  desc: '2'
                },
                {
                  title: '赎回结果',
                  desc: '3'
                }
              ]
              return (
                <div class="pt-10">
                  <div class="pb-8 border-b-[#00000014] border-b-1 border-b-solid">
                  <div class="w-474px m-auto">
                    <StepRender current={current} steps={_steps}></StepRender>
                    </div>
                  </div>
                  <div class="w-814px m-auto pt-8 pb-4">
                    <Row gutter={[8,8]}>
                     {renderItem('申请时间', '2025-04-08 12:00:00')}
                     {renderItem('申赎类型', '赎回')}
                     {renderItem('审核状态', <TextTranslate type="dot" options={applyStatusOptions} value='2' />)}
                     {renderItem('赎回份额', '621')}
                     {renderItem('赎回金额', '8875.60（CNY）')}
                    </Row>
                  </div>
                </div>
              )
            }
          }} */}
        </BasicTable>
      </div>
    )
  }
})
function renderItem(name: string, value: any) {
  return <Col span={8} class='pb-2 flex text-base'>
      <div class='text-nowrap min-w-[76px] color-secondary'>{name}</div>
      <div>{ typeof value == 'function' ?  value?.() : value || '- -'}</div>
  </Col>
}
