import { defineComponent, ref } from 'vue'
import { SubTitle } from '@/components/Icon'
import './index.less'
import InvestConcept from '@/views/home/components/InvestConcept'
import { WEB_BG_HEAD } from '@/utils/resources'

import investFramework from '@/assets/invest-framework.png'
import investRisk from '@/assets/invest-risk.png'

const arrAboutCatalogue = ref(['投资框架', '投资理念', '投资研究', '投资风控'])
const riskControlCurrent = ref('left')

export default defineComponent({
  components: {
    SubTitle,
    InvestConcept
  },

  setup(props, ctx) {
    const handleMouseEnter = (type: 'left' | 'right' | 'bottom'): void => {
      riskControlCurrent.value = type
    }

    return () => (
      <div>
        <div class="w-full relative">
          <img class="w-full h-480px" src={`${WEB_BG_HEAD}/head-invest.png`} alt="关于我们" />
          <div class="font-h3 font-normal absolute top-219px left-80 text-left">
            INVESTMENT FRAMEWORK
          </div>
        </div>
        <SubTitle arrTitle={arrAboutCatalogue.value} />
        <div class="w-full h-895px text-center pt-24">
          <div class="font-h3 font-bold font-color-colorBlack">投资框架</div>
          <img class="w-983px h-757px" src={investFramework} alt="投资框架" />
        </div>
        <InvestConcept themeBgColor={'gray'} />
        <div class="w-full px-80 py-24 background-white text-center">
          <div class="font-h3 font-bold font-color-colorBlack mb-34px">投资研究</div>
          <div class="w-full h-425px px-30 py-12 text-center background-lightBlue">
            <div class="font-h4 font-bold font-color-colorBlack mb-6">业务介绍</div>
            <div class="max-w-200 font-h6 font-color-colorTextSecondary text-left mx-auto mb-16">
              我们的研究团队关注全球市场，对宏观政策、市场经济、资产配置、股票等领域进行研究和投资分析，并向国内及国际客户提供研究服务。
              凭借广泛的覆盖范围、严谨的研究方法、独立客观的态度、透彻前瞻的观点和完善的专业服务体系，行研中心积极开展各项工作，全方位打造严谨前瞻性的私募研究品牌。
            </div>
            <div class="research-scope-container mx-auto">
              <div class="research-title font-h4 font-color-colorBlack">研究范围</div>
              <div class="research-line">
                <div class="research-item font-h5 font-color-colorText top">宏观经济（全球）</div>
                <div class="research-item font-h5 font-color-colorText bottom">
                  大宗商品（全球）
                </div>
                <div class="research-item font-h5 font-color-colorText top">资产配置</div>
                <div class="research-item font-h5 font-color-colorText bottom">
                  投资策略（全球）
                </div>
                <div class="research-item font-h5 font-color-colorText top">量化策略</div>
                <div class="research-item font-h5 font-color-colorText bottom">外汇（全球）</div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-full h-714px relative px-80 py-24 bg-cover bg-center bg-no-repeat flex justify-center"
          style={{ backgroundImage: `url(${investRisk})` }}
        >
          <div>
            <div class="font-h3 font-bold font-color-colorBlack text-center pb-24">投资风控</div>
            <div class="flex text-center">
              <div
                class="flex relative risk-control-left"
                onMouseenter={() => handleMouseEnter('left')}
              >
                <div class="max-w-90 font-h6 font-color-colorTextSecondary mr-2 text-left flex items-end">
                  公司贯彻全员风控理念，坚守底线，坚持合规化发展，建立良好的全员风控文化。
                </div>
                <div class="pb-34px">
                  <div class="font-h4 font-bold font-color-colorBlack mb-8 ml-4">风控文化</div>
                  <div
                    class={`w-64px h-58px ${riskControlCurrent.value == 'left' ? 'risk-line-active' : 'risk-item-line'}`}
                  ></div>
                </div>
                <div
                  class={`absolute ${riskControlCurrent.value == 'left' ? 'triangle-bottom-right-active' : riskControlCurrent.value == 'bottom' ? 'triangle-bottom-right-gray' : 'right-triangle-bottom-right'}`}
                ></div>
              </div>
              <div
                class="flex relative ml-300px risk-control-right"
                onMouseenter={() => handleMouseEnter('right')}
              >
                <div
                  class={`absolute ${riskControlCurrent.value == 'right' ? 'right-triangle-active' : riskControlCurrent.value == 'bottom' ? 'right-triangle-gray' : 'right-triangle'}`}
                ></div>
                <div class="pb-34px">
                  <div class="font-h4 font-bold font-color-colorBlack mb-8 mr-4">风控机制</div>
                  <div
                    class={`w-64px h-58px ${riskControlCurrent.value == 'right' ? 'risk-line-right-active' : 'risk-item-line-right'}`}
                  ></div>
                </div>
                <div class="max-w-90 font-h6 font-color-colorTextSecondary ml-2 text-left flex items-end">
                  公司在募投管退各个环节严格执行内控制度，始终贯彻合规专业化运营方针。
                </div>
              </div>
            </div>
            <div
              class="text-center relative risk-control-bottom"
              onMouseenter={() => handleMouseEnter('bottom')}
            >
              <div
                class={`absolute top-10px left-480px ${riskControlCurrent.value == 'bottom' ? 'right-triangle-bottom-active' : riskControlCurrent.value == 'left' ? 'right-triangle-bottom' : 'right-triangle-bottom-gray'}`}
              ></div>
              {/* 占位盒子 */}
              <div class="w-full h-94px"></div>
              <div
                class={`mb-2 mt-2 ml-629px ${riskControlCurrent.value == 'bottom' ? 'risk-line-center-active' : 'risk-item-line-center'}`}
              ></div>
              <div class="font-h4 font-bold font-color-colorBlack mb-15px">风控系统</div>
              <div class="font-color-colorTextSecondary font-h6">
                构建智能风控系统，实时识别和监测，保障投资策略高效运行。
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
