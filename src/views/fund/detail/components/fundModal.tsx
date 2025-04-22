import { defineComponent, reactive } from "vue";
import { Modal } from "ant-design-vue";
import './fundModal.less'
export default defineComponent({
    setup(props: any, { emit }: any) {
        const config = reactive({
            visible: true,
            title: "基金申购",
            footer: null,
            width: 1440, // width: 1440,
            bodyStyle: {
                bckgroundColor: "red"
            }
        })
        const searchInfo = reactive({
            current: 1
        })
        const steps = [
            {
                title: '填写申购金额',
                content: 'First-content',
            },
            {
                title: '确认申购信息',
                content: 'Second-content',
            },
            {
                title: '等待审核',
                content: 'Last-content',
            }
        ]
        return () =>(<Modal 
        width={config.width}
        v-model:open={config.visible} title={config.title} bodyStyle={config.bodyStyle} footer={config.footer}>
            <div class='pt-10 pb-6 text-center w-470px m-auto'>
            <StepRender current={searchInfo.current} steps={steps}></StepRender>
            </div>
            2
        </Modal>)
    }
})

export const StepRender = defineComponent({
    props: {
        current:{
            type: Number,
            default: 0
        },
        steps: {
            type: Array,
            default: () => []
        }
    },
    setup(props: any, { emit }: any) {
        return () => (<div class="cur-step">
            {props.steps.map((item: any, index: number) => {
                return (<div class={['step-item',
                index === props.current ? 'is-active' : '',
                index < props.current ? 'is-finished' : '',

                ]}>
                    <div class='step-line'></div>
                    <div class='step-dot'></div>
                    <div class='step-title'>{item?.title}</div>
                    </div>)
            })}
        </div>)
     }
})