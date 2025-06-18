import { defineComponent, reactive, ref, watch, toRaw, nextTick } from 'vue'
import { Button, RangePicker } from 'ant-design-vue'
import { BasicTable } from '@/components/table'
import { basicColumns } from '../data'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)
import { formatToDate } from '@/utils/dateUtil'
import { useGetUserFundDaily } from "@/api/user"
// import { useGetFundNetworth, postFundNetworth } from '@/api/fund'

export default defineComponent({
  props: {
    record: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const loadingDownload = ref(false)
    const tableRef = ref()
    const searchInfo = reactive({
      timeRang: null
    })
    watch(
      () => props.record,
      (curV, prevV) => {
        if (curV?.id != prevV?.id) {
          tableRef.value?.fetch({ searchInfo: toRaw(searchInfo) })
        }
      },
      { deep: true }
    )
    function handleClick() {
      tableRef.value?.fetch({ searchInfo: toRaw(searchInfo) })
    }
    function beforeFetch(params: any) {
      params.id = props.record?.id
      if (params.timeRang?.length > 0) {
        params.beginDate = formatToDate(params.timeRang[0])
        params.endDate = formatToDate(params.timeRang[1])
      }
    }
    async function postFundNetworthFn() {
      loadingDownload.value = true
      let _params: any = {
        fundId: props.record?.id
      }
      if (searchInfo?.timeRang?.length > 0) {
        _params.beginDate = formatToDate(searchInfo?.timeRang[0])
        _params.endDate = formatToDate(searchInfo?.timeRang[1])
      }
      postFundNetworth(_params)
        .then((res) => {
          if (res.status == 200) {
            let _fileName = props.record?.name
            if (searchInfo?.timeRang?.length > 0) {
              _fileName +=
                '_' +
                _params.beginDate.replaceAll('-', '') +
                '_' +
                _params.endDate.replaceAll('-', '')
            }
            downloadFile(res.data, _fileName)
          }
        })
        .finally(() => {
          loadingDownload.value = false
        })
    }
    // 文件流转blob对象下载
    function downloadFile(data: any, fileName?: any) {
      // 创建一个下载链接
      const url = window.URL.createObjectURL(data)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName + '_基金净值.xlsx') // 设置下载的文件名
      document.body.appendChild(link)
      link.click()

      // 释放 URL 对象
      window.URL.revokeObjectURL(url)
    }
    return () => (
      <div>
        <div class="flex justify-between items-center pb-2">
          <div class='font-500'>基金净值</div>
          <div>
            <RangePicker v-model:value={searchInfo.timeRang} class="mr-4" />
            <Button onClick={handleClick} class="w-[74px]" type="primary">
              查询
            </Button>
            {/* <Button
              loading={loadingDownload.value}
              onClick={postFundNetworthFn}
              type="primary"
              ghost
            >
              导出
            </Button> */}
          </div>
        </div>
        <BasicTable
          ref={tableRef}
          immediate={true}
          api={useGetUserFundDaily}
          beforeFetch={beforeFetch}
          isHandle={true}
          searchInfo={searchInfo}
          columns={basicColumns()}
        ></BasicTable>
      </div>
    )
  }
})
