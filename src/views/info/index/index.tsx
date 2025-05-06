import { defineComponent, reactive, watch, ref } from 'vue'
import Banner from './components/banner'
import { Form, Input, List, Button, message, Tree, RangePicker } from 'ant-design-vue'
import { BasicButtonForm } from '@/components/button'
import { fundTypeOptions } from '@/utils/options/basicOptions'
import { BasicList } from '@/components/list'

export default defineComponent({
  setup(props, ctx) {
    const labelCol = { style: { width: '78px' } }
    const searchInfo = reactive({
      typeId: [],
      queryInfo: ''
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
    const dataSource = ref([
      {
        id: 1
      },
      {
        id: 2
      }
    ])
    // 树
    const treeData = ref([
      {
        title: 'parent 1',
        key: '0-0',
        children: [
          {
            title: 'leaf 1-0',
            key: '0-0-0'
          },
          {
            title: 'leaf 1-1',
            key: '0-0-1'
          }
        ]
      }
    ])
    function renderItem(name: string, value: string) {
      return (
        <div class="flex">
          <div class="color-secondary">{name}</div>
          <div>{value}</div>
        </div>
      )
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
            <div class="leading-14 mt-2">文件类型</div>
            <Tree treeData={treeData.value} defaultExpandAll={true} selectable={false} blockNode={true} checkable></Tree>
          </div>
          <div class="flex-1 pl-8">
            <Form class="my-3" layout="inline" labelCol={labelCol}>
              <Form.Item>
                <RangePicker />
              </Form.Item>
              <Form.Item>
                <Input
                  class="w-[332px]"
                  v-model:value={searchInfo.queryInfo}
                  placeholder="输入基金名称/关键字"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" class="w-74px">
                  查询
                </Button>
              </Form.Item>
            </Form>
            <BasicList
              ref={listRef}
              loading={loading.value}
              isHandle={true}
              split={false}
              dataSource={dataSource.value}
              searchInfo={searchInfo}
            >
              {{
                renderItem: () => {
                  return (
                    <List.Item class="!p-6 bg-black/3 mb-1 cursor-pointer hover:bg-[#C1272D1A] hover:text-[#C1272D]">
                      <div class="w-full flex items-center justify-between">
                        <div class="font-h6 truncate">经典CTA-2号私募投资基金</div>
                        <div class="color-tertiary">2025-03-06</div>
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
