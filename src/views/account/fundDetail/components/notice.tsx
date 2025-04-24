import { defineComponent, reactive, ref, toRaw, watch } from 'vue'
import { Segmented, RangePicker, Input, List, message, Button, Tabs } from 'ant-design-vue'
import { BasicList } from '@/components/list'
import { useRoute } from 'vue-router'
// import { useGetFundNotice } from '@/api/fund'
import { basicOptions, productNoticeOptions } from '@/utils/options/basicOptions'
import { useGo } from '@/hooks/web/usePage'
import { formatToDate } from '@/utils/dateUtil'
import { useUserStore } from '@/store/modules/user'
export default defineComponent({
  setup(props) {
    const userStore = useUserStore()
    const { go } = useGo()
    const route = useRoute()
    const listRef = ref()
    const searchInfo = reactive({
      type: 'all',
      fundId: route.query?.id,
      content: '',
      timeRang: null
    })
    const loading = ref(false)
    const options = [...productNoticeOptions]
    watch(
      () => [searchInfo.timeRang, searchInfo.type],
      () => {
        handleClickSearch()
      }
    )
    function handleClick(params: any) {
      if (userStore.getToken) {
        window.open(params?.file?.file, '_blank')
      } else {
        message.warning('请先登录账号！')
      }
    }
    function beforeFetch(params: any) {
      if (params.timeRang?.length > 0) {
        params.beginTime = formatToDate(params.timeRang[0]) + ' 00:00:00'
        params.endTime = formatToDate(params.timeRang[1]) + ' 23:59:59'
      }
      if (params.type == 'all') {
        params.type = ''
      }
    }
    function handleClickSearch() {
      listRef.value?.fetch({ searchInfo: toRaw(searchInfo) })
    }
    return () => (
      <div>
        <div class="flex justify-between items-center pb-2">
          <div class="font-500">基金报告</div>
          <div>
            <RangePicker v-model:value={searchInfo.timeRang} class="mr-4" />
            <Button onClick={handleClick} class="w-[74px]" type="primary">
              查询
            </Button>
          </div>
        </div>
        <div>
          <Tabs tabBarGutter={16} size="small">
            {options.map((item: any) => {
              return <Tabs.TabPane key={item.value} tab={item.label}></Tabs.TabPane>
            })}
          </Tabs>
          <BasicList
            ref={listRef}
            loading={loading.value}
            isHandle={true}
            beforeFetch={beforeFetch}
            // api={useGetFundNotice}
            searchInfo={searchInfo}
          >
            {{
              renderItem: ({ item }) => (
                <List.Item onClick={() => handleClick(item)} key={item?.id}>
                  <div>{item?.title}</div>
                  <div class="color-tertiary">{item?.updateTime}</div>
                </List.Item>
              )
            }}
          </BasicList>
        </div>
      </div>
    )
  }
})
