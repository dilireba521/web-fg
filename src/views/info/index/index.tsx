import { defineComponent, reactive, watch, ref, toRaw } from 'vue'
import Banner from './components/banner'
import { Form, Input, List, Button, message, Tree, RangePicker } from 'ant-design-vue'
import { BasicButtonForm } from '@/components/button'
import { fundTypeOptions, productNoticeOptions } from '@/utils/options/basicOptions'
import { BasicList } from '@/components/list'
import { useGetNews } from '@/api/news'
import { formatToDate } from '@/utils/dateUtil'
import { useGo } from '@/hooks/web/usePage'

export default defineComponent({
  setup(props, ctx) {
    const { go } = useGo()
    const labelCol = { style: { width: '78px' } }
    const searchInfo = reactive({
      timeRang: null,
      fundType: null,
      queryString: ''
    })
    const searchOptions = {
      man: fundTypeOptions
    }
    const searchFormRef = ref()
    watch(
      () => searchInfo,
      (val, oldVal) => {
        // console.log(val,oldVal)
      },
      { deep: true }
    )
    // 列表
    const listRef = ref()
    const loading = ref(false)
    
    // 树
    const treeData = ref(productNoticeOptions)
    function renderItem(name: string, value: string) {
      return (
        <div class="flex">
          <div class="color-secondary">{name}</div>
          <div>{value}</div>
        </div>
      )
    }
    function beforeFetch(params: any) {
      if (params.timeRang?.length > 0) {
        params.beginDate = formatToDate(params.timeRang[0]) + ' 00:00:00'
        params.endDate = formatToDate(params.timeRang[1]) + ' 23:59:59'
      }
    }
    function handleClickSearch() {
      listRef.value?.fetch({ searchInfo: toRaw(searchInfo) })
    }
    return () => (
      <div>
        <Banner />
        <div class="pt-25 container flex">
          <div class="w-76 pr-8 shrink-0" style="box-shadow: 1px 0px 0px 0px rgba(0,0,0,0.1);">
            <div
              class="flex justify-between leading-54px text-sm"
              style="box-shadow: 0px 1px 0px 0px rgba(0,0,0,0.1);"
            >
              <div class="color-secondary">筛选</div>
              <div class="color-tertiary cursor-pointer">清除</div>
            </div>
            <div class="leading-14 mt-2">公告类型</div>
            <Tree
              treeData={treeData.value}
              defaultExpandAll={true}
              selectable={false}
              blockNode={true}
              v-model:checkedKeys={searchInfo.fundType}
              checkable
            ></Tree>
          </div>
          <div class="flex-1 pl-8 pb-10">
            <Form class="my-3" layout="inline" labelCol={labelCol}>
              <Form.Item>
                <RangePicker v-model:value={searchInfo.timeRang} />
              </Form.Item>
              <Form.Item>
                <Input
                  class="w-[332px]"
                  v-model:value={searchInfo.queryString}
                  placeholder="输入基金名称/关键字"
                />
              </Form.Item>
              <Form.Item>
                <Button onClick={() => handleClickSearch()} type="primary" class="w-74px">
                  查询
                </Button>
              </Form.Item>
            </Form>
            <BasicList
              api={useGetNews}
              ref={listRef}
              loading={loading.value}
              isHandle={true}
              split={false}
              beforeFetch={beforeFetch}
              searchInfo={searchInfo}
            >
              {{
                renderItem: ({ item }) => {
                  return (
                    <List.Item
                      onClick={() => {
                        go(`/info/detail/?id=${item?.id}`)
                      }}
                      class="!p-6 bg-black/3 mb-1 cursor-pointer hover:bg-[#C1272D1A] hover:text-[#C1272D]"
                    >
                      <div class="w-full flex items-center justify-between">
                        <div class="font-h6 truncate">{item?.title}</div>
                        <div class="color-tertiary">{item?.releaseTime}</div>
                      </div>
                    </List.Item>
                  )
                }
              }}
            </BasicList>
          </div>
        </div>
      </div>
    )
  }
})
