import { defineComponent, reactive, ref } from 'vue'
import { BasicTable } from '@/components/table'
import { basicColumns } from './data'
import { RangePicker, Button } from 'ant-design-vue'
// import { useGetUserFundLogs } from '@/api/user'
export default defineComponent({
  setup() {
    const rescord = ref()
    const searchInfo = reactive({
      type: ''
    })
    return () => {
      return (
        <div>
          <div class='flex justify-end gap-4 pb-2  mt-6'>
            <RangePicker></RangePicker>
            <Button class='w-74px' type='primary'>查询</Button>
          </div>
          <BasicTable
            //  api={useGetUserFundLogs} 
            columns={basicColumns()}></BasicTable>
        </div>
      )
    }
  }
})
