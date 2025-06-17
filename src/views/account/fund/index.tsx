import { defineComponent, onMounted, ref, reactive } from 'vue'
import { BasicTable } from '@/components/table'
import { basicColumns } from './data'
import { useGetUserFundList } from '@/api/user'

export default defineComponent({
  setup(props, ctx) {
    const searchInfo = reactive({
      type: null,
    })
    const dataSoure = ref([])
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
    // onMounted(() => {
    //   useGetUserFundListFn()
    // })
    return () => <div class="container pb-10">
      <div class='pt-10 pb-4 font-h5'>持有基金</div>
      <BasicTable
        searchInfo={searchInfo}
        api={useGetUserFundList}
        // dataSource={dataSoure.value}
        beforeFetch={beforeFetch}
        columns={basicColumns()}
      >
      </BasicTable>
    </div>
  }
})
