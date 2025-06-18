import { defineComponent, reactive, watch, ref, toRaw } from 'vue'
import Banner from './components/banner'
import { Form, Input, List, Button, message, Tree, RangePicker } from 'ant-design-vue'
import { BasicButtonForm } from '@/components/button'
import { fundTypeOptions, productNoticeOptions } from '@/utils/options/basicOptions'
import { BasicList } from '@/components/list'
import { useGetNews } from '@/api/news'
import { formatToDate } from '@/utils/dateUtil'
import { useGo } from '@/hooks/web/usePage'
import { watchDebounced } from '@vueuse/core'
import { usePostNewsInfo } from '@/api/news'

export default defineComponent({
  setup(props, ctx) {
    const { go } = useGo()
    const labelCol = { style: { width: '78px' } }
    const searchInfo = reactive({
      timeRang: null,
      category: null,
      queryString: ''
    })

    const searchFormRef = ref()
    watch(
      () => searchInfo,
      (val, oldVal) => {
        // console.log(val,oldVal)
        if (searchInfo.category?.length > 1) {
          // 选择多个，只取最后一个
          searchInfo.category = [searchInfo.category[searchInfo.category.length - 1]]
        }
      },
      { deep: true }
    )
    watchDebounced(
      () => searchInfo.category,
      () => {
        handleClickSearch()
      },
      { debounce: 200 }
    )
    // 列表
    const listRef = ref()
    const loading = ref(false)

    // 树
    const treeData = ref(
      productNoticeOptions.map((item) => {
        return {
          title: item.label,
          key: item.value
        }
      })
    )
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
    function clear() {
      searchInfo.category = null
    }
    // 打开公告详情
    function openDetail(params: any) {
      // console.log('openDetail===', params)
      if (params?.file?.file) {
        window.open(params?.file?.file)
      } else {
        go(`/info/detail/?id=${params?.id}`)
        usePostNewsInfo({ id: params?.id })
      }
    }
    return () => (
      <div>
        <Banner />
        <div class="pt-25 container flex min-h-200">
          <div class="w-76 pr-8 shrink-0" style="box-shadow: 1px 0px 0px 0px rgba(0,0,0,0.1);">
            <div
              class="flex justify-between leading-54px text-sm"
              style="box-shadow: 0px 1px 0px 0px rgba(0,0,0,0.1);"
            >
              <div class="color-secondary">筛选</div>
              <div onClick={clear} class="color-tertiary cursor-pointer">
                清除
              </div>
            </div>
            <div class="leading-14 mt-2">公告类型</div>
            <Tree
              treeData={treeData.value}
              defaultExpandAll={true}
              selectable={false}
              blockNode={true}
              v-model:checkedKeys={searchInfo.category}
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
                      onClick={() => openDetail(item)}
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
