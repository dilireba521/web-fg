import { defineComponent,ref } from 'vue'
import './idnex.less'
import { SubTitle } from '@/components/Icon'
import Connect from '@/views/home/components/connect'
import personalCard from './components/personalCard.vue'
import DevelopCourse from './components/developCourse.vue'
import { WEB_BG_HEAD } from '@/utils/resources';

import iconRtaLarge from '@/assets/about-rta-large.svg'
import aboutRtaFund from '@/assets/about-rta-fund.svg'

const arrAboutCatalogue = ref(['公司介绍','企业文化','发展历程','核心团队','合作机构'])

export default defineComponent({
  components: {
    SubTitle,
    Connect,
    personalCard,
    DevelopCourse
  },

  setup(props, ctx) {
    // 定义各个部分的ref引用
    const companyIntroRef = ref(null)
    const companyCultureRef = ref(null)
    const developCourseRef = ref(null)
    const coreTeamRef = ref(null)
    const partnerRef = ref(null)

    // 处理SubTitle点击事件
    const handleSubTitleClick = (index: number) => {
      const refs = [companyIntroRef, companyCultureRef, developCourseRef, coreTeamRef, partnerRef]
      if (refs[index]?.value) {
        (refs[index].value as HTMLElement).scrollIntoView({ behavior: 'smooth' })
      }
    }

    return () => (
      <div>
        <div class="w-full relative">
          <img class="w-full h-480px" src={`${WEB_BG_HEAD}/head-about.png`} alt="关于我们" />
          <img class="w-60 h-82px absolute top-199px left-80" src={aboutRtaFund} />
        </div>
        <SubTitle arrTitle={arrAboutCatalogue.value} onItemClick={handleSubTitleClick} />
        {/* 公司介绍 */}
        <div ref={companyIntroRef} id="company-intro" class="w-full h-394px px-80 py-24 background-white">
          <div class="font-h3 mb-8">公司介绍</div>
          <div class="font-h5 text-xl font-normal text-left">
            <div class="mb-7">诺言私募基金管理有限公司成立于 2025 年，致力于为多元化的客户群体提供高质量金融增值服务，依托自主构建的宏微观研究框架和
                  全天候风控能力，建立了以数据驱动的基金投资、科学稳健的量化赋能策略决策体系结构。</div>
            <div>公司总部位于厦门，业务涵盖了股票、债券、期货、期权等多个金融衍生品领域。公司将秉持以客户利益为核心的买方思维，在波动
                  市场中持续创造超额收益。协助国内外企业客户、机构客户、高净值客户实现其资产可持续发展目标。</div>
          </div>
        </div>
        {/* 企业文化 */}
        <div ref={companyCultureRef} id="company-culture" class="w-full h-1005px px-80 py-24 background-white">
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
            <div class="font-color-colorTextSecondary text-center">
              <div class="flex justify-between items-center mb-4">
                <div class="develo-guid-blue w-158 h-22 flex items-center justify-center">坚持党的领导，为公司发展提供坚强政治保障</div>
                <div class="develo-guid-blue w-158 h-22 flex items-center justify-center">坚持践行国家战略和经营宗旨</div>
              </div>
              <div class="flex justify-between items-center mb-4">
                <div class="develo-guid-puerple w-104 h-22 flex items-center justify-center">坚持以客户为中心、与客户共成长的经营方针</div>
                <div class="develo-guid-puerple w-104 h-22 flex items-center justify-center">坚持合规经营、严控风险的经营理念</div>
                <div class="develo-guid-puerple w-104 h-22 flex items-center justify-center">坚持创新、保持坚韧的进取精神</div>
              </div>
              <div class="flex justify-between items-center">
                <div class="develo-guid-pink w-158 h-22 flex items-center justify-center">坚持以人为本、市场化管理的人才强企战略</div>
                <div class="develo-guid-pink w-158 h-22 flex items-center justify-center">坚持和发扬公司的优秀企业文化和传统</div>
              </div>
            </div>
          </div>

        </div>
        {/* 发展历程 */}
        <div ref={developCourseRef} id="develop-course">
          <developCourse />
        </div>
        {/* 核心团队 */}
        <div ref={coreTeamRef} id="core-team" class="w-full px-80 py-24 text-center">
          <div class="font-h3 mb-8 font-medium">核心团队</div>
          <div class="flex flex-wrap">
            <div class="w-2/4"><personalCard /></div>
            <div class="w-2/4"><personalCard /></div>
          </div>
        </div>
        {/* 合作机构 */}
        <div ref={partnerRef} id="partner" class="w-full h-99 px-80 py-24 background-colorBgLayout">
            <div class="text-center mb-8 font-h3 font-color-colorText">合作机构</div>
            <div class="flex h-30 flex-wrap justify-between">
                <img class="w-84 h-30 bg-white" src={aboutRtaFund} alt="" />
                <img class="w-84 h-30 bg-white" src={aboutRtaFund} alt="" />
                <img class="w-84 h-30 bg-white" src={aboutRtaFund} alt="" />
                <img class="w-84 h-30 bg-white" src={aboutRtaFund} alt="" />
                <img class="w-84 h-30 bg-white" src={aboutRtaFund} alt="" />
                <img class="w-84 h-30 bg-white" src={aboutRtaFund} alt="" />
            </div>
        </div>
        <Connect />
      </div>
    )
  }
})
