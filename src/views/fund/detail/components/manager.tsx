import { defineComponent, ref, reactive, watch, computed } from 'vue'
import logoImg from '@/assets/icons/logo.svg'
export default defineComponent({
    setup(props: any) {
        const searchInfo = reactive({
            active: 'cur',
        })
        const tabs:LabelValueOptions = [
            {
                label: '现任基金经理',
                value: 'cur'
            },
            {
                label: '历任基金经理',
                value: 'old'
            },
        ]
        
        return () => <div class='pt-8'>
            <div class='font-500 border-b-[#00000014] border-b-1 border-b-solid pb-2'>基金经理</div>
            <div class='px-6'>
            <TabRender class="py-4 border-b-[#00000014] border-b-1 border-b-solid" tabs={tabs} v-model:activeKey={searchInfo.active}></TabRender>
            {renderManager()}
            </div>
        </div>
    }
})

export const TabRender = defineComponent({
    props: {
        tabs: {
            type: Object as PropType<LabelValueOptions>,
            default: () => []
        },
        activeKey: {
            type: [String, Number],
            default: ''
        },
        classItem: {
            type: String,
            default: 'text-sm mr-4'
        }
    },
    emits: ['update:activeKey'],
    setup(props, { emit }) {
        function handleClick(params:any) {
            emit('update:activeKey', params.value)
        }
        return () => {
            return (
                <div class="flex activeKey">
                    {props?.tabs.map((item) => {
                        return (
                            <div
                                class={[
                                    'cursor-pointer',
                                    props.classItem,
                                    item.value == props.activeKey && 'text-[#C1272DFF]'
                                ]}
                                onClick={() => handleClick(item)}
                            >
                                {item.label}
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
})

function renderManager(data?:any) {
    return <div>
        <div class='py-6 flex'>
            <img 
            src={data?.img} 
            onError={(e) => (e.target.src = logoImg)}
            class='w-60 h-60 bg-[#E8E8E8]'></img>
            <div class='pl-6'>
                <div class='pb-6'>基金经理1</div>
                <div>
                    {renderItem('简介', '经济学硕士。现任易方达基金管理有限公司投资三部总经理、基金经理。曾任易方达基金管理有限公司行业研究员、投资经理、基金经理助理、研究部副总经理、副总经理级高级管理人员。')}
                    {renderItem('管理年限', '8年')}
                    {renderItem('历史业绩', '历史业绩介绍')}
                </div>
            </div>
        </div>
    </div>
}
function renderItem(name: string, value: any) {
    return <div class='text-sm leading-[22px] flex !items-baseline !justify-start pb-4'>
        <div class='text-nowrap min-w-[70px]'>{name}：</div>
        <div class='color-secondary pl-6'>{value || '- -'}</div>
    </div>
}