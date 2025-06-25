import { defineComponent, reactive, ref, toRaw } from 'vue'
import { BasicTable } from '@/components/table'
import { basicColumns } from './data'
import { RangePicker, Button } from 'ant-design-vue'
import { useGetUserLogs } from '@/api/user'
import { formatToDate } from '@/utils/dateUtil'

export default defineComponent({
  setup() {
    const tableRef = ref()

    const searchInfo = reactive({
      timeRang: ''
    })
    function beforeFetch(params: any) {
      if (params.timeRang?.length > 0) {
        params.beginTime = formatToDate(params.timeRang[0]) + ' 00:00:00'
        params.endTime = formatToDate(params.timeRang[1]) + ' 23:59:59'
      }
    }
    function handleClick() {
      tableRef.value?.fetch({ searchInfo: toRaw(searchInfo) })
    }
    return () => {
      return (
        <div>
          <div class='flex justify-end gap-4 pb-2  mt-6'>
            <RangePicker v-model:value={searchInfo.timeRang} ></RangePicker>
            <Button onClick={handleClick} class='w-74px' type='primary'>查询</Button>
          </div>
          <BasicTable
            ref={tableRef}
            api={useGetUserLogs}
            beforeFetch={beforeFetch}
            searchInfo={searchInfo}
            isHandle={true}
            columns={basicColumns()}></BasicTable>
        </div>
      )
    }
  }
})
