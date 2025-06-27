import { defineComponent, onMounted, ref, reactive } from 'vue'
import { BasicTable } from '@/components/table'
import { basicColumns } from './data'
import { useGetUserFundList } from '@/api/user'

export default defineComponent({
  setup(props, ctx) {
    const searchInfo = reactive({
      type: null,
    })
    const expandedRowKeys = ref()
    // async function useGetUserFundListFn(){
    //   const {data} = await useGetUserFundList()
    //   console.log("data-----",data);
    //   if(data.value?.retCode == 0){
    //     dataSoure.value = data.value?.data
    //   }
    // }

    function beforeFetch(params: any) {
      // if (params.timeRang?.length > 0) {
      //   params.beginTime = formatToDate(params.timeRang[0]) + ' 00:00:00'
      //   params.endTime = formatToDate(params.timeRang[1]) + ' 23:59:59'
      // }
    }
    function afterFetch(data: any) {
      expandedRowKeys.value = data?.map((item: any) => item.id)
    }
    // onMounted(() => {
    //   useGetUserFundListFn()
    // })
    return () => <div class="container min-h-150 pb-10">
      <div class='pt-10 pb-4 font-h5'>持有基金</div>
      <BasicTable
        searchInfo={searchInfo}
        expandedRowKeys={expandedRowKeys.value}
        api={useGetUserFundList}
        rowKey='id'
        beforeFetch={beforeFetch}
        afterFetch={afterFetch}
        columns={basicColumns()}
      >
      </BasicTable>
    </div>
  }
})
