
import { defineComponent } from 'vue'
import './modules.less'

export const StepRender = defineComponent({
    props: {
        current: {
            type: Number,
            default: 0
        },
        hasError: {
            type: Boolean,
            default: false
        },
        steps: {
            type: Array,
            default: () => []
        }
    },
    setup(props: any, { emit }: any) {
        return () => (
            <div class="cur-step-record">
                {props.steps.map((item: any, index: number) => {
                    return (
                        <div
                            class={[
                                'step-item',
                                index === props.current ? 'is-active' : '',
                                index < props.current ? 'is-finished' : '',
                                props.hasError && index === props.current ? 'is-error' : ''
                            ]}
                        >
                            <div class="step-line"></div>
                            <div class="step-dot"></div>
                            <div class="step-title">{item?.title}</div>
                            <div class="step-desc">{item?.desc}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
})