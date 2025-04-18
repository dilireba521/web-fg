import { defineComponent, onMounted, ref, reactive } from 'vue'
import { BasicTable } from '@/components/table'
import { basicColumns } from './data'
import { formatToDate } from '@/utils/dateUtil'
import { Select, RangePicker } from 'ant-design-vue'

export default defineComponent({
  setup(props, ctx) {
    const searchInfo = reactive({
      type: null,
      queryInfo: '',
      timeRang: [],
    })
    const expandedRowKeys = ref([])
    const dataSoure = ref([
      {
        name: '123',
        amount: '123',
        detail:'dfgdf'
      },
      {
        name: '1233',
        amount: '1233',
        detail:'sdfmlsdjflsdl'
      }, {
        name: '1234',
        amount: '1234',
        detail:'sdfmldfgsdfgsdjflsdl'
      }
    ])
    function beforeFetch(params: any) {
      if (params.timeRang?.length > 0) {
        params.beginTime = formatToDate(params.timeRang[0]) + ' 00:00:00'
        params.endTime = formatToDate(params.timeRang[1]) + ' 23:59:59'
      }
    }
    function expandRowCb(data:any) {
      console.log("expandRowCb===",data)
      if(expandedRowKeys.value.includes(data.record.key)){
        expandedRowKeys.value = []
        return
      }else {
        expandedRowKeys.value = [data.record.key]
        return
      }
    }
    return () => <div class="container">
      <div class='pt-10 pb-4 font-h5'>申赎记录</div>
      <div class="flex mb-3">
            <div class="flex items-center  mr-4">
              <div class='font-h7 color-secondary'>申请类型：</div>
              <Select
              allowClear
              v-model:value={searchInfo.type}
              placeholder="请选择"
              // options={transferTypeOptions}
              class="w-40"
            ></Select>
              </div>
          
            <div class="flex items-center">
              <div class="font-h7 color-secondary">时间范围：</div>
              <RangePicker v-model:value={searchInfo.timeRang}></RangePicker>
            </div>
          </div>
      <BasicTable
        searchInfo={searchInfo}
        expandedRowKeys={expandedRowKeys.value}
        expandIconColumnIndex={-1}
        // api={useGetUserFundApply}
        dataSource={dataSoure.value}
        beforeFetch={beforeFetch}
        columns={basicColumns(expandRowCb,expandedRowKeys)}
      >
        {{
          expandedRowRender: ({record}) => {
            return <>{record.detail}</>
          }
        }}
      </BasicTable>
    </div>
  }
})
