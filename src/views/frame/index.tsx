import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue'
import { SubTitle,BackgroundHeader } from '@/components/Icon'
import './index.less'
import InvestConcept from '@/views/home/components/InvestConcept'
import { WEB_BG_HEAD } from '@/utils/resources'
import { useScreenStore } from '@/store/modules/screen'
import { useRoute } from 'vue-router'

import investFramework from '@/assets/invest-framework.png'
import investRisk from '@/assets/invest-risk.png'
import mobileFrameBg from '@/assets/mobile-frame-bg.png'
import mobileFrameCulture from '@/assets/mobile-frame-culture.png'
import mobileFrameMachine from '@/assets/mobile-frame-machine.png'
import mobileFrameSystem from '@/assets/mobile-frame-system.png'

const arrAboutCatalogue = ref(['投资框架', '投资理念', '投资研究', '投资风控'])
const riskControlCurrent = ref('left')

export default defineComponent({
  components: {
    SubTitle,
    InvestConcept,
    BackgroundHeader
  },

  setup(props, ctx) {
    const screenStore = useScreenStore()
    const route = useRoute()
    const investFrameRef = ref(null)
    const investIdeaRef = ref(null)
    const investStudyRef = ref(null)
    const investControlRef = ref(null)

    // 处理SubTitle点击事件
    const handleSubTitleClick = (index: number) => {
      const refs = [investFrameRef, investIdeaRef, investStudyRef, investControlRef]
      if (refs[index]?.value) {
        ;(refs[index].value as any).scrollIntoView({ behavior: 'smooth' })
      }
    }

    // 当前激活的索引
    const activeIndex = ref(0)

    // 监听滚动事件，更新activeIndex
    const handleScroll = () => {
      const refs = [investFrameRef, investIdeaRef, investStudyRef, investControlRef]
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

    // 监听路由变化
    // watch(() => route.hash, (newHash) => {
    //   if(screenStore.isMobile) {
    //     // 去掉开头的 # 字符再转换为数字
    //     const index = newHash ? Number(newHash.substring(1)) : 0
    //     setTimeout(() => {
    //       handleSubTitleClick(index)
    //     }, 200)
    //   }
    // }, { immediate: true, deep: true })

    // 组件挂载时添加滚动监听
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      // 初始化时执行一次，确保初始状态正确
      handleScroll()
    })

    // 组件卸载时移除滚动监听
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    const handleMouseEnter = (type: 'left' | 'right' | 'bottom'): void => {
      riskControlCurrent.value = type
    }

    // 添加三角形悬停状态
    const triangleHover = ref<'left' | 'right' | 'top' | null>('left')

    // 处理三角形悬停事件
    const handleTriangleHover = (type: 'left' | 'right' | 'top'): void => {
      triangleHover.value = type
    }

    return () => (
      <div>
        <BackgroundHeader 
          backgroundImage={`${WEB_BG_HEAD}/head-invest.png`}
          mobileBackgroundImage={`${WEB_BG_HEAD}/mobile-head-invest.png`}
        >
          {screenStore.isMobile ? null : (
            <div class="font-h3 font-normal pt-219px pl-80 text-left">
                INVESTMENT FRAMEWORK
            </div>
          )}
        </BackgroundHeader>
        <SubTitle
          arrTitle={arrAboutCatalogue.value}
          activeIndex={activeIndex.value}
          onItemClick={handleSubTitleClick}
        />
        {screenStore.isMobile ? (
          <div
            ref={investFrameRef}
            id="invest-frame"
            class="w-full h-75 pt-10 px-6 flex flex-col items-center"
          >
            <div class="font-h3 font-bold font-color-colorText text-center mb-6">投资框架</div>
            <img class="w-65 h-50" src={investFramework} alt="投资框架" />
          </div>
        ) : (
          <div ref={investFrameRef} id="invest-frame" class="w-full h-895px text-center pt-24">
            <div class="font-h3 font-bold font-color-colorText text-center">投资框架</div>
            <img class="w-983px h-757px" src={investFramework} alt="投资框架" />
          </div>
        )}
        <div ref={investIdeaRef} id="invest-idea">
          <InvestConcept themeBgColor={'gray'} />
        </div>
        {screenStore.isMobile ? (
          <div
            ref={investStudyRef}
            id="invest-study"
            class="w-full px-6 py-8 background-white text-center"
          >
            <div class="font-h1 font-color-colorText mb-6">投资研究</div>
            <div class="font-h5 font-color-colorText mb-4">业务介绍</div>
            <div class="font-color-colorTextSecondary font-h5 mb-8 text-left">
              我们的研究团队关注各类市场，对宏观政策、市场经济、资产配置、股票等领域进行研究和投资分析，并向客户提供研究服务。凭借广泛的覆盖范围、严谨的研究方法、独立客观的态度、透彻前瞻的观点和完善的专业服务体系，积极开展各项行研工作，全方位打造严谨前瞻性的私募投研品牌。
            </div>
            <div class="font-h5 font-color-colorText mb-4">研究范围</div>
            <div
              class="font-h5 font-bold font-color-colorText p-4 text-left mb-2"
              style={{ background: 'linear-gradient( 180deg, #F4F9FF 0%, #EEF6FF 100%)' }}
            >
              宏观经济·大宗商品·资产配置
            </div>
            <div
              class="font-h5 font-bold font-color-colorText p-4 text-left"
              style={{ background: 'linear-gradient( 180deg, #FFF8F8 0%, #FFEEEE 100%)' }}
            >
              投资策略·量化策略·外汇
            </div>
          </div>
        ) : (
          <div
            ref={investStudyRef}
            id="invest-study"
            class="w-full px-80 py-24 background-white text-center max-w-480 mx-auto"
          >
            <div class="font-h3 font-bold font-color-colorBlack mb-34px">投资研究</div>
            <div class="w-full h-425px px-30 py-12 text-center background-lightBlue">
              <div class="font-h4 font-bold font-color-colorBlack mb-6">业务介绍</div>
              <div class="max-w-200 font-h6 font-color-colorTextSecondary text-left mx-auto mb-16">
              我们的研究团队关注各类市场，对宏观政策、市场经济、资产配置、股票等领域进行研究和投资分析，并向客户提供研究服务。凭借广泛的覆盖范围、严谨的研究方法、独立客观的态度、透彻前瞻的观点和完善的专业服务体系，积极开展各项行研工作，全方位打造严谨前瞻性的私募投研品牌。
              </div>
              <div class="research-scope-container mx-auto">
                <div class="research-title font-h4 font-color-colorBlack">研究范围</div>
                <div class="research-line">
                  <div class="research-item font-h5 font-color-colorText top">宏观经济</div>
                  <div class="research-item font-h5 font-color-colorText bottom">
                    大宗商品
                  </div>
                  <div class="research-item font-h5 font-color-colorText top">资产配置</div>
                  <div class="research-item font-h5 font-color-colorText bottom">
                    投资策略
                  </div>
                  <div class="research-item font-h5 font-color-colorText top">量化策略</div>
                  <div class="research-item font-h5 font-color-colorText bottom">外汇</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {screenStore.isMobile ? (
          <div
            ref={investControlRef}
            id="invest-control"
            class="w-full min-h-474px px-6 py-10 pb-8 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${mobileFrameBg}` }}
          >
            <div class="font-h1 font-color-colorText mb-6 text-center">投资风控</div>
            <div>
              <div
                class="w-full min-h-110px bg-cover bg-center bg-no-repeat p-4 mb-2"
                style={{ backgroundImage: `url(${mobileFrameCulture}` }}
              >
                <div class="font-h4 font-color-colorText mb-2">风控文化</div>
                <div class="font-h5 font-color-colorTextSecondary">
                  公司贯彻全员风控理念，坚守底线，坚持合规化发展，建立良好的全员风控文化。
                </div>
              </div>
              <div
                class="w-full min-h-110px bg-cover bg-center bg-no-repeat p-4 mb-2"
                style={{ backgroundImage: `url(${mobileFrameMachine}` }}
              >
                <div class="font-h4 font-color-colorText mb-2">风控机制</div>
                <div class="font-h5 font-color-colorTextSecondary">
                  公司在募投管退各个环节严格执行内控制度，始终贯彻合规专业化运营方针。
                </div>
              </div>
              <div
                class="w-full min-h-110px bg-cover bg-center bg-no-repeat p-4"
                style={{ backgroundImage: `url(${mobileFrameSystem}` }}
              >
                <div class="font-h4 font-color-colorText mb-2">风控系统</div>
                <div class="font-h5 font-color-colorTextSecondary">
                  构建智能风控系统，实时识别和监测，保障投资策略高效运行。
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            ref={investControlRef}
            id="invest-control"
            class="w-full h-714px relative px-80 py-24 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${investRisk})` }}
          >
            <div class="font-h3 font-bold font-color-colorBlack text-center pb-24">投资风控</div>
            <div>
              <div class="flex justify-center">
                <div
                  class="flex relative risk-control-left"
                  onMouseenter={() => handleTriangleHover('left')}
                >
                  <div class="flex items-center max-w-90 font-h6 font-color-colorTextSecondary mr-2 text-left flex items-end">
                    公司贯彻全员风控理念，坚守底线，坚持合规化发展，建立良好的全员风控文化。
                  </div>
                  <div>
                    <div class="font-h4 font-bold font-color-colorBlack mb-8 ml-4">风控文化</div>
                    <div
                      class={`w-64px h-58px ${triangleHover.value == 'left' ? 'risk-line-active' : 'risk-item-line'}`}
                    ></div>
                  </div>
                </div>
                <div class="triangle-container">
                  <div class="main-triangle">
                    <div
                      class={`triangle-part triangle-left ${triangleHover.value === 'left' ? 'hover-active' : triangleHover.value === 'right' ? 'hover-light' : 'hover-gray'}`}
                      onMouseenter={() => handleTriangleHover('left')}
                    ></div>
                    <div
                      class={`triangle-part triangle-right ${triangleHover.value === 'right' ? 'hover-active' : triangleHover.value === 'left' ? 'hover-gray' : 'hover-light'}`}
                      onMouseenter={() => handleTriangleHover('right')}
                    ></div>
                    <div
                      class={`triangle-part triangle-top ${triangleHover.value === 'top' ? 'hover-active' : triangleHover.value === 'right' ? 'hover-gray' : 'hover-light'}`}
                      onMouseenter={() => handleTriangleHover('top')}
                    ></div>
                  </div>
                </div>
                <div
                  class="flex relative risk-control-right"
                  onMouseenter={() => handleTriangleHover('right')}
                >
                  <div>
                    <div class="font-h4 font-bold font-color-colorBlack mb-8 mr-4">风控机制</div>
                    <div
                      class={`w-64px h-58px ${triangleHover.value == 'right' ? 'risk-line-right-active' : 'risk-item-line-right'}`}
                    ></div>
                  </div>
                  <div class="flex items-center max-w-90 font-h6 font-color-colorTextSecondary ml-2 text-left flex items-end">
                    公司在募投管退各个环节严格执行内控制度，始终贯彻合规专业化运营方针。
                  </div>
                </div>
              </div>
              <div
                class="text-center relative risk-control-bottom"
                onMouseenter={() => handleTriangleHover('top')}
              >
                <div
                  class={`mb-2 mt-2 risk-bottom-line-mar ${triangleHover.value == 'top' ? 'risk-line-center-active' : 'risk-item-line-center'}`}
                ></div>
                <div class="font-h4 font-bold font-color-colorBlack mb-15px">风控系统</div>
                <div class="font-color-colorTextSecondary font-h6">
                  构建智能风控系统，实时识别和监测，保障投资策略高效运行。
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
})
