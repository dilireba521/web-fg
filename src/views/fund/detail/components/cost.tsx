import { defineComponent, reactive, computed } from "vue";
import { TabRender } from "./manager"
import { BasicTable } from '@/components/table'
import { basicColumns, basicColumns2,basicColumns3 } from '../data'
 
export default defineComponent({
    props: {
        record:{
          type: Object,
          default: () => {
            return {}
          }
        }
      },
    setup(props) {
        const dataSourceMap = computed(()=>{
            const _fees = props.record
            if(!Object.keys(_fees)?.length) return {}
            console.log("------", props.record,_fees);
            
            return {
                in: _fees?.filter(item => item.type == 'in'),
                out: _fees?.filter(item => item.type == 'out'),
                manage: _fees?.filter(item => item.type != 'in' && item.type != 'out'),
            }
        })
        const searchInfo = reactive({
            active: 'in',
        })
        const tabs:LabelValueOptions = [
            {
                label: '申购费率',
                value: 'in'
            },
            {
                label: '赎回费率',
                value: 'out'
            },
            {
                label: '管理费、托管费',
                value: 'manage,deposit'
            },
        ]
        return ()=> <div class='pt-8'>
        <div class='font-500 border-b-[#00000014] border-b-1 border-b-solid pb-2'>费用信息</div>
        <div class='px-6'>
        <TabRender class="py-4 " tabs={tabs} v-model:activeKey={searchInfo.active}></TabRender>
        {
            searchInfo.active == 'in' &&  <BasicTable
            searchInfo={searchInfo}
            columns={basicColumns()}
            dataSource={dataSourceMap.value.in}
            pagination={false}
          ></BasicTable>
        }
        {
            searchInfo.active == 'out' &&  <BasicTable
            searchInfo={searchInfo}
            columns={basicColumns2()}
            dataSource={dataSourceMap.value.out}
            pagination={false}
          ></BasicTable>
        } {
            searchInfo.active == 'manage,deposit' &&  <BasicTable
            searchInfo={searchInfo}
            columns={basicColumns3()}
            dataSource={dataSourceMap.value.manage}
            pagination={false}
          ></BasicTable>
        }
        </div>
    </div>
    }
})