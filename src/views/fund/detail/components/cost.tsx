import { defineComponent, reactive } from "vue";
import { TabRender } from "./manager"
import { BasicTable } from '@/components/table'
import { basicColumns, basicColumns2,basicColumns3 } from '../data'
 
export default defineComponent({
    setup() {
        const searchInfo = reactive({
            active: '1',
        })
        const tabs:LabelValueOptions = [
            {
                label: '申购费率',
                value: '1'
            },
            {
                label: '赎回费率',
                value: '2'
            },
            {
                label: '管理费、托管费',
                value: '3'
            },
        ]
        return ()=> <div class='pt-8'>
        <div class='font-500 border-b-[#00000014] border-b-1 border-b-solid pb-2'>费用信息</div>
        <div class='px-6'>
        <TabRender class="py-4 " tabs={tabs} v-model:activeKey={searchInfo.active}></TabRender>
        {
            searchInfo.active == '1' &&  <BasicTable
            searchInfo={searchInfo}
            columns={basicColumns()}
          ></BasicTable>
        }
        {
            searchInfo.active == '2' &&  <BasicTable
            searchInfo={searchInfo}
            columns={basicColumns2()}
          ></BasicTable>
        } {
            searchInfo.active == '3' &&  <BasicTable
            searchInfo={searchInfo}
            columns={basicColumns3()}
          ></BasicTable>
        }
        </div>
    </div>
    }
})