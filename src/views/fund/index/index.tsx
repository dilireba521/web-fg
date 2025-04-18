import { defineComponent, reactive, watch, ref } from 'vue'
import Banner from './components/banner'
import { Form, Input, List ,Button, message } from 'ant-design-vue'
import { BasicButtonForm } from '@/components/button'
import { fundTypeOptions } from "@/utils/options/basicOptions"
import { BasicList } from '@/components/list'
import { useGo } from '@/hooks/web/usePage'
export default defineComponent({
  setup(props, ctx) {
    const { go } = useGo()
    const labelCol = { style: { width: '78px' } }
    const searchInfo = reactive({
      typeId: [],
      queryInfo: ''
    })
    const searchOptions = {
      man: fundTypeOptions
    }
    const searchFormRef = ref()
    watch(() => searchInfo, (val,oldVal) => {
      // console.log(val,oldVal)
    },{deep: true})
    // 列表
    const listRef = ref()
    const loading = ref(false)
    const dataSource = ref([{
      id: 1,
    },{
      id:2,
    }])
    function renderItem(name: string, value: string) {
      return (<div class='flex'>
        <div class='color-secondary'>{name}</div>
        <div>{value}</div>
      </div>)
    }
    function jump(data:any){
      console.log("222222----",data);
      
      go({
        path: '/fund/detail',
        query: {
          id: data.id
        }
      })
    }
    return () => <div>
      <Banner />
      <div class='pt-25 container'>
      <Form labelCol={labelCol}>
        <Form.Item>
        {{
            default: () => (
              <Input
                class="w-[332px]"
                v-model:value={searchInfo.queryInfo}
                placeholder="输入基金名称/代码/基金经理"
              />
            ),
            label: () => <div class="font-h7 color-secondary">搜索</div>
          }}
        </Form.Item>
        <Form.Item>
        {{
            default: () => (
             <BasicButtonForm ref={searchFormRef}  options={searchOptions.man} v-model:value={searchInfo.typeId} />
            ),
            label: () => <div class="font-h7 color-secondary">基金经理</div>
          }}
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
            return <List.Item class='!px-8 !py-6 bg-black/3 mb-2'>
              <div class="w-full flex items-center justify-between">
                <div>
                  <div class='font-h5 font-500'>经典CTA-2号私募投资基金</div>
                  <div class='flex mt-3 gap-8'>
                  {renderItem('基金代码：', '000001')}
                  {renderItem('风险等级：', '中低风险(R2)')}
                  {renderItem('成立年限：', '1年以内')}
                  {renderItem('基金经理：', '基金经理名称')}
                  </div>
                </div>
                <div onClick={jump} class='cursor-pointer color-primary1'>查看详细</div>
              </div>
              </List.Item>
          }
        }}
      </BasicList>
      </div>
    </div>
  }
})
