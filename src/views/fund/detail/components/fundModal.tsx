import { defineComponent, reactive, ref, onMounted } from 'vue'
import { Modal, Input, Button, Checkbox, message } from 'ant-design-vue'
import './fundModal.less'

export default defineComponent({
  props: {
    hasFund: { // 是否有基金
      type: Boolean,
      default: false
    }
  },
  setup(props: any, { emit, expose }: any) {
    const config = reactive({
      visible: false,
      title: '基金申购',
      footer: null,
      width: 1440 // width: 1440,
    })
    const searchInfo = reactive({
      current: 0,
      checked: false,
      value: null
    })
    const steps = [
      {
        title: '填写申购金额',
        content: '1'
      },
      {
        title: '确认申购信息',
        content: '2'
      },
      {
        title: '等待审核',
        content: '3'
      }
    ]
    const riskModalRef = ref()
    function renderItem(name: string, value: any) {
      return (
        <div class="flex !items-baseline !justify-start pb-6">
          <div class="color-secondary text-nowrap min-w-24">{name}</div>
          <div class="font-500">{value || '- -'}</div>
        </div>
      )
    }
    function handleClick(e: any, params?: any) {
      e.preventDefault()
      if (params?.type == 'risk') {
        riskModalRef.value.openModal()
      }
    }
    function handleClickSubmit() {
      if (searchInfo.current === 0) {
        if (searchInfo.value) {
          searchInfo.current = 1
        } else {
          message.error('请输入正确的金额')
        }
      } else if (searchInfo.current === 1) {
        searchInfo.current = 2
      } else {
        config.visible = false
      }
    }
    function handleClickUp() {
      searchInfo.current = 0
    }
    function openModal() {
      config.visible = true
    }
    expose({
      openModal
    })
    return () => (
      <Modal
        width={config.width}
        v-model:open={config.visible}
        title={config.title}
        footer={config.footer}
        centered={true}
      >
        <div class="bg-white">
          <div class="pt-10 pb-6 text-center w-470px m-auto ">
            <StepRender current={searchInfo.current} steps={steps}></StepRender>
          </div>
        </div>
        <div class="mt-1 bg-white px-12 pt-12 pb-8">
          <div
            class={[
              'border-b-[#00000014] border-b-1 border-b-solid',
              searchInfo.current >= 1 ? 'h-93' : ''
            ]}
          >
            {searchInfo.current < 2 ? (
              <>
                {renderItem('基金名称', '经典CTA-2号私募投资基金')}
                {renderItem('基金代码', 'QAZ123')}
                {renderItem('最新净值', '3.456')}
                {renderItem('风险等级', '中高风险(R4)')}
                {searchInfo.current == 0 ? (
                  <div class="flex !items-baseline !justify-start pb-12">
                    <div class="color-secondary text-nowrap min-w-24">购买金额</div>
                    <div class="font-500">
                      <Input
                        v-model:value={searchInfo.value}
                        size="large"
                        placeholder="≥1"
                        class="w-80"
                      >
                        {{
                          suffix: () => <div class="color-tertiary">元</div>
                        }}
                      </Input>
                    </div>
                  </div>
                ) : (
                  renderItem('购买金额', searchInfo.value)
                )}
              </>
            ) : (
              renderWaitReview()
            )}
          </div>
          {searchInfo.current == 0 ? (
            <div class="pt-8">
              <Checkbox v-model:checked={searchInfo.checked}>
                <div class="flex color-secondary">
                  已阅读
                  <div onClick={(e) => handleClick(e, { type: 'risk' })} class="text-#c1272d">
                    基金风险揭示书、
                  </div>
                  <div onClick={handleClick} class="text-#c1272d">
                    基金产品资料概要、
                  </div>
                  <div onClick={handleClick} class="text-#c1272d">
                    基金合同、
                  </div>
                  <div onClick={handleClick} class="text-#c1272d">
                    招募说明书
                  </div>
                  等法律文件，确认是本人自主决定购买，符合本人投资目标
                </div>
              </Checkbox>
            </div>
          ) : (
            ''
          )}

          <div class="flex justify-center pt-8 gap-6">
            {searchInfo.current == 1 ? (
              <Button
                onClick={handleClickUp}
                class="min-w-20 border-color-[#c1272d] text-[#c1272d]"
              >
                上一步
              </Button>
            ) : (
              ''
            )}

            <Button
              onClick={handleClickSubmit}
              type="primary"
              class="min-w-20"
              disabled={searchInfo.checked ? false : true}
            >
              {searchInfo.current == 1 ? '确认并提交' : searchInfo.current == 2 ? '关闭' : '提交'}
            </Button>
          </div>
        </div>
        <RiskModal ref={riskModalRef}></RiskModal>
      </Modal>
    )
  }
})

// 基金风险揭示书
const RiskModal = defineComponent({
  setup(props, { expose }) {
    const config = reactive({
      visible: false,
      title: '基金风险揭示书',
      footer: null,
      width: 1440 // width: 1440,
    })
    const htmlContent = ref('')

    onMounted(async () => {
      const response = await fetch('/static/risk.html')
      htmlContent.value = await response.text()
    })
    function openModal() {
      config.visible = true
    }
    expose({
      openModal
    })
    return () => (
      <Modal
        width={config.width}
        v-model:open={config.visible}
        footer={config.footer}
        centered={true}
      >
        {{
          title: () => <div class="font-h5 text-center font-500">{config.title}</div>,
          default: () => <div class="h-120 overflow-auto" v-html={htmlContent.value}></div>
        }}
      </Modal>
    )
  }
})
function renderWaitReview() {
  const OSSURL = import.meta.env.VITE_GLOB_OSS
  return (
    <div class="pt-[106px] text-center">
      <img src={OSSURL + '/fund/fund-review.png'} class="w-20"></img>
      <div class="pt-6">申购申请已提交，等待审核…</div>
      <div class="text-[#C1272DFF] text-sm pt-6">审核记录</div>
    </div>
  )
}

export const StepRender = defineComponent({
  props: {
    current: {
      type: Number,
      default: 0
    },
    steps: {
      type: Array,
      default: () => []
    }
  },
  setup(props: any, { emit }: any) {
    return () => (
      <div class="cur-step">
        {props.steps.map((item: any, index: number) => {
          return (
            <div
              class={[
                'step-item',
                index === props.current ? 'is-active' : '',
                index < props.current ? 'is-finished' : ''
              ]}
            >
              <div class="step-line"></div>
              <div class="step-dot"></div>
              <div class="step-title">{item?.title}</div>
            </div>
          )
        })}
      </div>
    )
  }
})
