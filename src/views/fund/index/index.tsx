import { defineComponent, reactive, watch, ref } from 'vue'
import Banner from './components/banner'
import { Form, Input, List, Button, message } from 'ant-design-vue'
import { BasicButtonForm } from '@/components/button'
import {
  fundTypeOptions,
  fundManagerOptions,
  riskLevelOptions2,
  establishOptions,
  fundTagOptions
} from '@/utils/options/basicOptions'
import { BasicList } from '@/components/list'
import { useGo } from '@/hooks/web/usePage'
import { useGetlist } from '@/api/fund'
import { useFundCategory } from '@/utils/options/useBasicOptions'
export default defineComponent({
  setup(props, ctx) {
    const { options } = useFundCategory()
    const { go } = useGo()
    const labelCol = { style: { width: '78px' } }
    const searchInfo = reactive({
      queryFundManager: '',
      queryYears: '',
      categoryId: '',
      queryString: '',
      riskLevel: ''
    })
    const searchOptions = {
      man: fundTypeOptions
    }
    const searchFormRef = ref()
    watch(
      () => searchInfo,
      (val, oldVal) => {
        console.log(val)
        // if()
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
    function renderItem(name: string, value: string) {
      return (
        <div class="flex">
          <div class="color-secondary">{name}</div>
          <div>{value || '- -'}</div>
        </div>
      )
    }
    function jump(data: any) {
      // console.log('222222----', data)

      go({
        path: '/fund/detail',
        query: {
          id: data.id
        }
      })
    }
    return () => (
      <div class="pb-10">
        <Banner />
        <div class="pt-25 container">
          <Form labelCol={labelCol}>
            <Form.Item>
              {{
                default: () => (
                  <Input
                    class="w-[332px]"
                    v-model:value={searchInfo.queryString}
                    placeholder="输入基金名称/代码/基金经理"
                  />
                ),
                label: () => <div class="font-h7 color-secondary">搜索</div>
              }}
            </Form.Item>
            <Form.Item>
              {{
                default: () => (
                  <div class="flex">
                    <BasicButtonForm
                      ref={searchFormRef}
                      options={fundManagerOptions}
                      v-model:value={searchInfo.queryFundManager}
                    />
                  </div>
                ),
                label: () => <div class="font-h7 color-secondary">基金经理</div>
              }}
            </Form.Item>
            <Form.Item>
              {{
                default: () => (
                  <div class="flex">
                    <BasicButtonForm
                      options={riskLevelOptions2}
                      v-model:value={searchInfo.riskLevel}
                    />
                  </div>
                ),
                label: () => <div class="font-h7 color-secondary">风险等级</div>
              }}
            </Form.Item>
            <Form.Item>
              {{
                default: () => (
                  <div class="flex">
                    <BasicButtonForm
                      options={establishOptions}
                      v-model:value={searchInfo.queryYears}
                    />
                  </div>
                ),
                label: () => <div class="font-h7 color-secondary">成立年限</div>
              }}
            </Form.Item>
            {options.value.length > 0 && (
              <Form.Item>
                {{
                  default: () => (
                    <div class="flex">
                      <BasicButtonForm
                        options={options.value}
                        v-model:value={searchInfo.categoryId}
                      />
                    </div>
                  ),
                  label: () => <div class="font-h7 color-secondary">基金标签</div>
                }}
              </Form.Item>
            )}
          </Form>
          <BasicList
            api={useGetlist}
            ref={listRef}
            loading={loading.value}
            split={false}
            searchInfo={searchInfo}
          >
            {{
              renderItem: ({ item }) => {
                const _level: any = riskLevelOptions2?.find(
                  (i) => i.value == item?.riskLevel
                )?.label
                return (
                  <List.Item class="!px-8 !py-6 bg-black/3 mb-2">
                    <div class="w-full flex items-center justify-between">
                      <div>
                        <div onClick={() => jump(item)} class="font-h5 font-500 cursor-pointer ">
                          {item?.name}
                        </div>
                        <div class="flex mt-3 gap-8">
                          {renderItem('基金代码：', item?.fundCode)}
                          {renderItem('风险等级：', _level)}
                          {renderItem('成立时间：', item?.establishDate)}
                          {renderItem('基金经理：', item?.manager)}
                        </div>
                      </div>
                      <div onClick={() => jump(item)} class="cursor-pointer color-primary1">
                        查看详细
                      </div>
                    </div>
                  </List.Item>
                )
              }
            }}
          </BasicList>
        </div>
      </div>
    )
  }
})
