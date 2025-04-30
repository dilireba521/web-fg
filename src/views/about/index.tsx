import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue'
import './idnex.less'
import { SubTitle } from '@/components/Icon'
import personalCard from './components/personalCard.vue'
import DevelopCourse from './components/developCourse.vue'
import { WEB_BG_HEAD } from '@/utils/resources'
import { useScreenStore } from '@/store/modules/screen'
import { useRoute } from 'vue-router'

import iconRtaLarge from '@/assets/about-rta-large.svg'
import aboutRtaFund from '@/assets/about-rta-fund.svg'

const arrAboutCatalogue = ref(['公司介绍', '企业文化', '发展历程', '核心团队']) // '合作机构'

export default defineComponent({
  components: {
    SubTitle,
    personalCard,
    DevelopCourse
  },

  setup(props, ctx) {
    const screenStore = useScreenStore()
    const route = useRoute()
    // 定义各个部分的ref引用
    const companyIntroRef = ref(null)
    const companyCultureRef = ref(null)
    const developCourseRef = ref(null)
    const coreTeamRef = ref(null)
    const partnerRef = ref(null)

    // 当前激活的索引
    const activeIndex = ref(0)

    // 处理SubTitle点击事件
    const handleSubTitleClick = (index: number) => {
      const refs = [companyIntroRef, companyCultureRef, developCourseRef, coreTeamRef, partnerRef]
      if (refs[index].value) {
        ;(refs[index].value as any).scrollIntoView({ behavior: 'smooth' })
      }
    }

    // 监听滚动事件，更新activeIndex
    const handleScroll = () => {
      const refs = [companyIntroRef, companyCultureRef, developCourseRef, coreTeamRef, partnerRef]
      const scrollPosition = window.scrollY + 100 // 添加一些偏移量，使切换更自然

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

    return () => (
      <div>
        {screenStore.isMobile ? (
          <div
            class="w-full h-390px pt-24 pl-8 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${WEB_BG_HEAD}/mobile-head-about.png)` }}
          >
            <img class="w-170px h-58px" src={aboutRtaFund} />
          </div>
        ) : (
          <div class="w-full relative">
            <img class="w-full h-480px" src={`${WEB_BG_HEAD}/head-about.png`} alt="关于我们" />
            <img class="w-60 h-82px absolute top-199px left-80" src={aboutRtaFund} />
          </div>
        )}
        <SubTitle
          arrTitle={arrAboutCatalogue.value}
          activeIndex={activeIndex.value}
          onItemClick={handleSubTitleClick}
        />
        {/* 公司介绍 */}
        {screenStore.isMobile ? (
          <div ref={companyIntroRef} id="company-intro" class="pt-10 px-6 pb-8 background-white">
            <div class="font-h1 font-medium mb-6 font-color-colorText text-center">公司介绍</div>
            <div class="font-h5 font-color-colorTextSecondary mb-4">
              诺言私募基金管理有限公司成立于 2025 年，致力于为多元化的客
              户群体提供高质量金融增值服务，依托自主构建的宏微观研究框架和
              全天候风控能力，建立了以数据驱动的基金投资、科学稳健的量化赋 能策略决策体系结构。
            </div>
            <div class="font-h5 font-color-colorTextSecondary">
              公司总部位于厦门，业务涵盖了股票、债券、期货、期权等多个
              金融衍生品领域。公司将秉持以客户利益为核心的买方思维，在波动
              市场中持续创造超额收益。协助企业客户、机构客户、高净值客户实 现其资产可持续发展目标。
            </div>
          </div>
        ) : (
          <div ref={companyIntroRef} id="company-intro" class="w-full px-80 py-24 background-white">
            <div class="font-h3 mb-8 text-center">公司介绍</div>
            <div
              class="font-h5 font-normal text-left max-w-250 mx-auto"
              style={{ fontSize: '18px' }}
            >
              <div class="mb-7">
                诺言私募基金管理有限公司成立于 2025 年，致力于为多元化的客
                户群体提供高质量金融增值服务，依托自主构建的宏微观研究框架和
                全天候风控能力，建立了以数据驱动的基金投资、科学稳健的量化赋 能策略决策体系结构。
              </div>
              <div>
                公司总部位于厦门，业务涵盖了股票、债券、期货、期权等多个
                金融衍生品领域。公司将秉持以客户利益为核心的买方思维，在波动
                市场中持续创造超额收益。协助企业客户、机构客户、高净值客户实
                现其资产可持续发展目标。
              </div>
            </div>
          </div>
        )}
        {/* 企业文化 */}
        {screenStore.isMobile ? (
          <div
            ref={companyCultureRef}
            id="company-culture"
            class="pt-10 px-6 pb-8 background-white"
          >
            <div class="font-h3 mb-6 font-bold text-center font-color-colorText">企业文化</div>
            <div class="font-h5 mb-4 text-center font-color-colorText">核心理念</div>
            <div class="font-h3 mb-6 font-bold text-center font-color-colorText mb-8">
              <span>信义为本·锐意创变</span>
              <span>协同共生·极致超越</span>
            </div>
            <div class="relative h-110px mb-8">
              {/* 文本内容放在单独的容器中，不受背景透明度影响 */}
              <div class="ml-2 pt-4 font-color-colorText absolute z-10">
                <div class="font-h5 mb-3">企业愿景</div>
                <div class="font-h4">打造亿级管理规模，成就国内卓越私募</div>
              </div>
              {/* 背景容器单独设置透明度 */}
              <div class="compny-wish-wrapper w-full h-110px absolute top-0 left-0"></div>
              <img class="w-326px h-69px absolute bottom-0 right-0" src={iconRtaLarge} alt="" />
            </div>
            <div class="font-h5 w-full">
              <div class="font-h5 font-color-colorText mb-4 text-center">发展指引</div>
              <div class="mobile-develo-guid-blue h-54px flex items-center mb-2 font-color-colorTextSecondary px-4">
                坚持党的领导，为公司发展提供坚强政治保障
              </div>
              <div class="mobile-develo-guid-blue h-54px flex items-center mb-2 font-color-colorTextSecondary px-4">
                坚持践行国家战略和经营宗旨
              </div>
              <div class="mobile-develo-guid-puerple h-54px flex items-center font-color-colorTextSecondary mb-2 px-4">
                坚持以客户为中心、与客户共成长的经营方针
              </div>
              <div class="mobile-develo-guid-puerple h-54px flex items-center font-color-colorTextSecondary mb-2 px-4">
                坚持合规经营、严控风险的经营理念
              </div>
              <div class="mobile-develo-guid-puerple h-54px flex items-center font-color-colorTextSecondary mb-2 px-4">
                坚持创新、保持坚韧的进取精神
              </div>
              <div class="mobile-develo-guid-pink h-54px flex items-center mb-2 font-color-colorTextSecondary px-4">
                坚持以人为本、市场化管理的人才强企战略
              </div>
              <div class="mobile-develo-guid-pink h-54px flex items-center font-color-colorTextSecondary px-4">
                坚持和发扬公司的优秀企业文化和传统
              </div>
            </div>
          </div>
        ) : (
          <div
            ref={companyCultureRef}
            id="company-culture"
            class="flex items-center justify-center"
          >
            <div class="w-480 h-1005px px-80 background-white">
              <div class="font-color-colorText text-center mb-39px">
                <div class="font-h3 mb-12">企业文化</div>
                <div class="font-h5 mb-4">核心理念</div>
                <div class="font-h2">信义为本·锐意创变·协同共生·极致超越</div>
              </div>
              <div class="relative h-50 mb-12">
                {/* 文本内容放在单独的容器中，不受背景透明度影响 */}
                <div class="ml-20 pt-12 font-color-colorText absolute z-10">
                  <div class="font-h5 mb-6">企业愿景</div>
                  <div class="font-h4">打造亿级管理规模，成就国内卓越私募</div>
                </div>
                {/* 背景容器单独设置透明度 */}
                <div class="compny-wish-wrapper w-full h-50 absolute top-0 left-0"></div>
                <img class="w-946px h-50 absolute top-0 right-0" src={iconRtaLarge} alt="" />
              </div>
              <div class="text-center">
                <div class="font-h5 font-color-colorText font-normal mb-5">发展指引</div>
                <div class="font-color-colorTextSecondary text-center font-h5">
                  <div class="flex justify-between items-center mb-4">
                    <div class="develo-guid-blue h-22 flex items-center justify-center">
                      坚持党的领导，为公司发展提供坚强政治保障
                    </div>
                    <div class="develo-guid-blue h-22 flex items-center justify-center">
                      坚持践行国家战略和经营宗旨
                    </div>
                  </div>
                  <div class="flex justify-between items-center mb-4">
                    <div class="develo-guid-puerple h-22 flex items-center justify-center">
                      坚持以客户为中心、与客户共成长的经营方针
                    </div>
                    <div class="develo-guid-puerple h-22 flex items-center justify-center">
                      坚持合规经营、严控风险的经营理念
                    </div>
                    <div class="develo-guid-puerple h-22 flex items-center justify-center">
                      坚持创新、保持坚韧的进取精神
                    </div>
                  </div>
                  <div class="flex justify-between items-center">
                    <div class="develo-guid-pink h-22 flex items-center justify-center">
                      坚持以人为本、市场化管理的人才强企战略
                    </div>
                    <div class="develo-guid-pink h-22 flex items-center justify-center">
                      坚持和发扬公司的优秀企业文化和传统
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* 发展历程 */}
        <div
          ref={developCourseRef}
          id="develop-course"
          class="flex justify-center background-colorBgLayout"
        >
          <div class="max-w-480">
            <developCourse />
          </div>
        </div>
        {/* 核心团队 */}
        {screenStore.isMobile ? (
          <div ref={coreTeamRef} id="core-team" class="w-full pt-10 px-6 pb-8 text-center">
            <div class="font-h3 mb-6 font-medium font-color-colorText">核心团队</div>
            <personalCard />
            <personalCard />
          </div>
        ) : (
          <div ref={coreTeamRef} id="core-team" class="flex justify-center">
            <div class="max-w-480 px-80 py-24 text-center">
              <div class="font-h3 mb-8 font-medium">核心团队</div>
              <div class="flex flex-wrap">
                <div class="w-2/4">
                  <personalCard />
                </div>
                <div class="w-2/4">
                  <personalCard />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* 合作机构 */}
        {/* {screenStore.isMobile ? (
          <div
            ref={partnerRef}
            id="partner"
            class="w-full h-228px pt-10 px-6 pb-8 background-colorBgLayout"
          >
            <div class="text-center mb-6 font-h3 font-color-colorText">合作机构</div>
            <div class="flex flex-wrap justify-between">
              <img class="mobile-cooperative-agency h-12 bg-white mb-1" src={aboutRtaFund} alt="" />
              <img class="mobile-cooperative-agency h-12 bg-white mb-1" src={aboutRtaFund} alt="" />
              <img class="mobile-cooperative-agency h-12 bg-white mb-1" src={aboutRtaFund} alt="" />
              <img class="mobile-cooperative-agency h-12 bg-white mb-1" src={aboutRtaFund} alt="" />
              <img class="mobile-cooperative-agency h-12 bg-white mb-1" src={aboutRtaFund} alt="" />
              <img class="mobile-cooperative-agency h-12 bg-white mb-1" src={aboutRtaFund} alt="" />
            </div>
          </div>
        ) : (
          <div
            ref={partnerRef}
            id="partner"
            class="w-full h-99 px-80 py-24 background-colorBgLayout"
          >
            <div class="text-center mb-8 font-h3 font-color-colorText">合作机构</div>
            <div class="flex h-30 flex-wrap justify-between">
              <img class="w-84 h-30 bg-white" src={aboutRtaFund} alt="" />
              <img class="w-84 h-30 bg-white" src={aboutRtaFund} alt="" />
              <img class="w-84 h-30 bg-white" src={aboutRtaFund} alt="" />
            </div>
          </div>
        )} */}
      </div>
    )
  }
})
