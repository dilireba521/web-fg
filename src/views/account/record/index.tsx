import { defineComponent, onMounted, ref, reactive } from 'vue'
import { BasicTable } from '@/components/table'
import { basicColumns } from './data'
import { formatToDate } from '@/utils/dateUtil'
import { Select, RangePicker, Row, Col } from 'ant-design-vue'
import { StepRender } from './components/modules'
import { TextTranslate } from '@/components/OptionTranslate'
import { applyTypeOptions, applyStatusOptions } from '@/utils/options/basicOptions'
import { useGetUserFundSrlist } from '@/api/user'
export default defineComponent({
  setup(props, ctx) {
    const searchInfo = reactive({
      type: null,
      queryInfo: '',
      timeRang: []
    })
    const expandedRowKeys = ref([])

    function beforeFetch(params: any) {
      if (params.timeRang?.length > 0) {
        params.beginTime = formatToDate(params.timeRang[0]) + ' 00:00:00'
        params.endTime = formatToDate(params.timeRang[1]) + ' 23:59:59'
      }
    }
    function expandRowCb(data: any) {
      // console.log('expandRowCb===', data)
      if (expandedRowKeys.value.includes(data.record.key)) {
        expandedRowKeys.value = []
        return
      } else {
        expandedRowKeys.value = [data.record.key]
        return
      }
    }
    return () => (
      <div class="container pb-10  min-h-150">
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
          {{
            expandedRowRender: ({ record }) => {
              const _hasError = record?.status == '3'
              const _current =_hasError ? 2 : record?.status != '2' ? 1 : 2
              const _isIn = record?.type == 'in'
              const _typeName = _isIn ? '申购' : '赎回'

              const _steps = [
                {
                  title: _typeName + '申请',
                  desc: ''
                },
                {
                  title: _typeName + '确认',
                  desc: ''
                },
                {
                  title: _typeName + '结果',
                  desc: ''
                }
              ]
              _steps[_current].desc = record?.remark
              return (
                <div class="pt-10">
                  <div class="pb-8 border-b-[#00000014] border-b-1 border-b-solid">
                    <div class="w-474px m-auto">
                      <StepRender hasError={_hasError} current={_current} steps={_steps}></StepRender>
                    </div>
                  </div>
                  <div class="w-814px m-auto pt-8 pb-4">
                    <Row gutter={[8, 8]}>
                      {renderItem('申请时间', record?.applyTime)}
                      {renderItem(
                        '申请类型',
                        <TextTranslate type="dot" options={applyTypeOptions} value={record?.type} />
                      )}
                      {renderItem(
                        '申请状态',
                        <TextTranslate
                          type="dot"
                          options={applyStatusOptions}
                          value={record?.status}
                        />
                      )}
                      {record?.type == 'in'
                        ? renderItem('申购金额', record?.amount)
                        : renderItem('赎回份额', record?.shares + '（份）')}
                    </Row>
                  </div>
                </div>
              )
            }
          }}
        </BasicTable>
      </div>
    )
  }
})
function renderItem(name: string, value: any) {
  return (
    <Col span={8} class="pb-2 flex text-base">
      <div class="text-nowrap min-w-[76px] color-secondary">{name}</div>
      <div>{typeof value == 'function' ? value?.() : value || '- -'}</div>
    </Col>
  )
}
