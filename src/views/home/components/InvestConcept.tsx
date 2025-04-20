import { defineComponent, ref, onMounted } from 'vue'
import './index.less'
import { useScreenStore } from '@/store/modules/screen'
// 导入图片资源
import iconBuyerMindset from '@/assets/icons/icon-buyer-mindset.svg'
import buyerMindset from '@/assets/icons/buyer-mindset.svg'
import iconAssetAllocation from '@/assets/icons/icon-asset-allocation.svg'
import assetAllocation from '@/assets/icons/asset-allocation.svg'
import iconDataDriven from '@/assets/icons/icon-data-driven.svg'
import dataDriven from '@/assets/icons/data-driven.svg'
import iconRiskControl from '@/assets/icons/icon-risk-control.svg'
import riskControl from '@/assets/icons/risk-control.svg'

export default defineComponent({
  components: {},

  props: {
    themeBgColor: {
      type: String,
      default: 'white'
    }
  },

  setup(props, ctx) {
    const screenStore = useScreenStore()
    const arrInvestConcept = [
      {
        icon: iconBuyerMindset,
        iconActive: buyerMindset,
        title: '买方思维',
        desc: '秉持买方思维，以客户利益为核心，超越短期目标，建立与客户之间深厚的纽带。'
      },
      {
        icon: iconAssetAllocation,
        iconActive: assetAllocation,
        title: '资产配置',
        desc: '在不断变化的市场环境中，动态调整、选择有效的配置方法。'
      },
      {
        icon: iconDataDriven,
        iconActive: dataDriven,
        title: '风险控制',
        desc: '通过对冲规避风险资产暴露带来的重大损失，优化投资组合表现。'
      },
      {
        icon: iconRiskControl,
        iconActive: riskControl,
        title: '数据驱动',
        desc: '以稳健的数据分析为基础，提升增厚产品收益效率。'
      }
    ]
    const currentHoverIndex = ref(0)
    const bgColor = ref('')

    onMounted(() => {
      bgColor.value = props.themeBgColor
    })

    const handleMouseEnter = (index: number) => {
      // 鼠标移入时，显示对应的目标描述
      currentHoverIndex.value = index
    }

    return () => (
      <div>
        {screenStore.isMobile ? (
          <div class="w-full  px-6 py-8 background-colorBgLayout">
            <div class="font-h1 font-bold mb-6 font-color-colorText text-center">投资理念</div>
            {arrInvestConcept.map((item, index) => (
              <div class="flex w-full min-h-27 items-center mb-2 background-white p-4">
                <img class="w-8 h-8 mr-4" src={item.icon} />
                <div class="flex flex-col h-full justify-between">
                  <div class="text-base font-color-colorText mb-2">{item.title}</div>
                  <div class="font-h5 font-color-colorTextSecondary">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            class={`invest-page w-full min-h-534px pt-24 pb-96px px-320px ${bgColor.value == 'white' ? 'background-white' : 'background-colorBgLayout'}`}
          >
            <div class="invest-page-title mb-32px">投资理念</div>
            <div class="flex justify-between">
              {arrInvestConcept.map((item, index) => (
                <div
                  class={`w-308px h-144px text-center pt-32px ${currentHoverIndex.value === index ? 'invest-item-active' : ''} ${bgColor.value == 'white' ? 'background-colorBgLayout' : 'background-white'}`}
                  onMouseenter={() => handleMouseEnter(index)}
                >
                  <img
                    class="max-w-48px h-48px mb-12px"
                    src={currentHoverIndex.value === index ? item.iconActive : item.icon}
                    alt={item.title}
                  />
                  <div class={`invest-item-title font-normal font-h5 text-center`}>
                    {item.title}
                  </div>
                  {currentHoverIndex.value === index ? (
                    <div
                      class={`invest-item-target ${bgColor.value == 'white' ? 'item-target-gray' : 'item-target-white'}`}
                    ></div>
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </div>
            <div
              class={`invest-item-desc w-full h-92px px-32px py-34px font-h6 font-normal mt-32px ${bgColor.value == 'white' ? 'background-colorBgLayout' : 'background-white'}`}
            >
              {arrInvestConcept[currentHoverIndex.value].desc}
            </div>
          </div>
        )}
      </div>
    )
  }
})
