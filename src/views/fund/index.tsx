import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { WEB_BG_HEAD } from '@/utils/resources'
import stepNav from './components/stepNav.vue'
import { SubTitle } from '@/components/Icon'
import { useScreenStore } from '@/store/modules/screen'

const arrFundTitle = ref(['申赎流程', '旗下产品'])

export default defineComponent({
  components: {
    stepNav,
    SubTitle
  },
  setup(props, ctx) {
    const screenStore = useScreenStore()
    // 定义各个部分的ref引用
    const applicationProcessRef = ref(null)
    const subordinateProductsRef = ref(null)

    // 处理SubTitle点击事件
    const handleSubTitleClick = (index: number) => {
      const refs = [applicationProcessRef, subordinateProductsRef]
      if (refs[index]?.value) {
        ;(refs[index].value as HTMLElement).scrollIntoView({ behavior: 'smooth' })
      }
    }

    // 当前激活的索引
    const activeIndex = ref(0)

    // 监听滚动事件，更新activeIndex
    const handleScroll = () => {
      const refs = [applicationProcessRef, subordinateProductsRef]
      const scrollPosition = window.scrollY + 300 // 添加一些偏移量，使切换更自然

      // 找到当前在视口中的元素
      for (let i = refs.length - 1; i >= 0; i--) {
        if (refs[i]?.value) {
          const element = refs[i].value as unknown as HTMLElement
          const offsetTop = element.offsetTop

          if (scrollPosition >= offsetTop) {
            activeIndex.value = i
            break
          }
        }
      }
    }

    // 组件挂载时添加滚动监听
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      // 初始化时执行一次，确保初始状态正确
      handleScroll()
      if (screenStore.isMobile) {
        let target_index = localStorage.getItem('MOBILE_SCOLL_TARGET') || 0
        handleSubTitleClick(Number(target_index))
      }
    })

    // 组件卸载时移除滚动监听
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

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
        {screenStore.isMobile ? (
          <div
            class="w-full h-390px pt-12 pl-8 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${WEB_BG_HEAD}/mobile-head-fund.png)` }}
          >
            <div class="font-color-colorText" style={{ fontSize: '32px' }}>
              基金产品
            </div>
          </div>
        ) : (
          <div class="w-full h-120">
            <img class="w-full h120" src={`${WEB_BG_HEAD}/head-fund.png`} alt="" />
          </div>
        )}
        <SubTitle
          arrTitle={arrFundTitle.value}
          activeIndex={activeIndex.value}
          onItemClick={handleSubTitleClick}
        />
        {screenStore.isMobile ? (
          <div ref={applicationProcessRef} id="application-process">
            <stepNav currentStep={currentStep} />
          </div>
        ) : (
          <div
            ref={applicationProcessRef}
            id="application-process"
            class="w-full h-1042px px-80 py-24 bg-white"
          >
            <stepNav currentStep={currentStep} />
          </div>
        )}
        {screenStore.isMobile ? (
          <div class="w-full px-6 pt-10 pb-8 background-colorBgLayout">
            <div class="font-h3 font-color-colorText font-bold mb-6 text-center">赎回流程</div>
            {redemptionProcess.value.map((item, index) => {
              const backgrounds = [
                'linear-gradient(180deg, #F4F9FF 0%, #EEF6FF 100%)',
                'linear-gradient(180deg, #F7F8FF 0%, #EEF0FF 100%)',
                'linear-gradient(180deg, #FFF8F8 0%, #FFEEEE 100%)',
                'linear-gradient(180deg, #F1FDF6 0%, #DEFAE9 100%)'
              ]
              return (
                <div class="w-full min-h-30 p-4 mb-2" style={{ background: backgrounds[index] }}>
                  <div class="text-base font-color-colorText font-bold mb-4 text-center">
                    {item.title}
                  </div>
                  <div class="font-h5 font-color-colorTextSecondary text-left">{item.desc}</div>
                </div>
              )
            })}
          </div>
        ) : (
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
                      <div class="font-h6 font-color-colorText font-bold mb-8">{item.title}</div>
                      <div class="font-h7 font-color-colorTextSecondary text-left">{item.desc}</div>
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
        )}
        {screenStore.isMobile ? (
          <div
            ref={subordinateProductsRef}
            id="subordinate-products"
            class="w-full px-6 pt-10 pb-8 background-white"
          >
            <div class="font-h3 font-color-colorText font-bold mb-6 text-center">旗下产品</div>
            <div class="w-full min-h-50 background-colorBgLayout px-4 py-6">
              <div class="font-h4 font-color-colorText mb-12 text-center">
                跳转到RTA基金管理平台查看
              </div>
              <div
                class="w-30 h-6 rounded text-white font-h5 mx-auto flex items-center justify-center"
                style={{ background: '#C1272D' }}
              >
                去基金管理平台
              </div>
            </div>
          </div>
        ) : (
          <div
            ref={subordinateProductsRef}
            id="subordinate-products"
            class="w-full h-602px px-80 py-24 bg-white text-center"
          >
            <div class="font-h3 text-black font-bold mb-12">旗下产品</div>
            <div class="w-full h-80 px-24 bg-gray-100 text-center pt-24">
              <div class="font-h4 font-color-colorText mb-12">跳转到RTA基金管理平台查看</div>
              <div
                class="w-40 h-12 rounded text-white font-h6 mx-auto flex items-center justify-center"
                style={{ background: '#C1272D' }}
              >
                去基金管理平台
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
})
