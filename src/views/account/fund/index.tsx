import { defineComponent, onMounted, ref, reactive } from 'vue'
import { BasicTable } from '@/components/table'
import { basicColumns } from './data'

export default defineComponent({
  setup(props, ctx) {
    const searchInfo = reactive({
      type: null,
    })
    const dataSoure = ref([
      {
        name: '123',
        amount: '123',
      },
      {
        name: '1233',
        amount: '1233',
      }, {
        name: '1234',
        amount: '1234',
      }
    ])
    function beforeFetch(params: any) {
      // if (params.timeRang?.length > 0) {
      //   params.beginTime = formatToDate(params.timeRang[0]) + ' 00:00:00'
      //   params.endTime = formatToDate(params.timeRang[1]) + ' 23:59:59'
      // }
    }
    return () => <div class="container">
      <div class='pt-10 pb-4 font-h5'>持有基金</div>
      <BasicTable
        searchInfo={searchInfo}
        // api={useGetUserFundApply}
        dataSource={dataSoure.value}
        beforeFetch={beforeFetch}
        columns={basicColumns()}
      >
      </BasicTable>
    </div>
  }
})
