import { defineComponent, ref } from 'vue'
import stepNav from './components/stepNav.vue'

export default defineComponent({
  components: {
    stepNav
  },
  setup(props, ctx) {
    const currentStep = ref(0)
    const redemptionProcess = ref([
      {
        title: '赎回申请',
        desc: '基金赎回封闭期结束后，在开放日最少提前十个工作日提出赎回申请。'
      },
      {
        title: '资料提交',
        desc: '在管理人的协助下，准备并提交赎回所需材料。'
      },
      {
        title: '赎回确认',
        desc: '管理人会及时告知投资者基金份额赎回情况。'
      },
      {
        title: '资金到账',
        desc: '赎回资金通常在开放日后5-10个工作日内汇到投资者的银行账户，核对无误后即完成了基金的赎回。'
      }
    ])

    return () => (
      <div>
        <div class="w-full h-1042px px-80 py-24 bg-white">
          <stepNav currentStep={currentStep} />
        </div>
        <div class="w-full h-490px px-80 py-24 text-center bg-slate-200">
          <div class="font-h3 text-black font-bold mb-12">赎回流程</div>
          <div class="flex">
            {redemptionProcess.value.map((item, index) => {
              const backgrounds = [
                'linear-gradient(180deg, #F4F9FF 0%, #EEF6FF 100%)',
                'linear-gradient(180deg, #F7F8FF 0%, #EEF0FF 100%)',
                'linear-gradient(180deg, #FFF8F8 0%, #FFEEEE 100%)',
                'linear-gradient(180deg, #F1FDF6 0%, #DEFAE9 100%)'
              ]
              // 判断是否为最后一个元素
              const isLastItem = index === redemptionProcess.value.length - 1
              return (
                <div class="w-1/4 h-52 relative">
                  <div
                    class="px-20 h-full pt-8"
                    style={{
                      background: backgrounds[index],
                      borderRight: isLastItem ? 'none' : '1px dashed #979797'
                    }}
                  >
                    <div class="font-h6 text-black font-bold mb-8">{item.title}</div>
                    <div class="font-h7 text-black text-left">{item.desc}</div>
                  </div>
                  <div class="absolute h-full w-16 top-0 right--8">
                    {!isLastItem && (
                      <div class="relative h-full flex items-center z-10">
                        <div class="w-16 h-0.5 bg-gray-400"></div>
                        <div
                          class="absolute right-0"
                          style={{
                            width: 0,
                            height: 0,
                            borderTop: '8px solid transparent',
                            borderBottom: '8px solid transparent',
                            borderLeft: '12px solid #9ca3af'
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div class="w-full h-602px px-80 py-24 bg-white text-center">
          <div class="font-h3 text-black font-bold mb-12">旗下产品</div>
          <div class="w-full h-80 px-24 bg-gray-100 text-center pt-24">
            <div class="font-h4 font-bold mb-12">跳转到RTA基金管理平台查看</div>
            <div class="w-40 h-12 rounded text-white font-h6 mx-auto flex items-center justify-center" style={{ background: '#C1272D' }}>去基金管理平台</div>
          </div>
        </div>
      </div>
    )
  }
})
