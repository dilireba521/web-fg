import { defineComponent, ref, onMounted } from 'vue'
import './index.less'
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
      },
    ]
    const currentHoverIndex = ref(0);
    const bgColor = ref('')

    onMounted(() => {
      bgColor.value = props.themeBgColor
    })
    
    const handleMouseEnter = (index: number) => {
      // 鼠标移入时，显示对应的目标描述
      currentHoverIndex.value = index
    }

    return () => (
      <div class={`invest-page w-full min-h-534px pt-24 pb-96px px-320px ${bgColor.value == 'white' ? 'background-white' : 'background-colorBgLayout'}`}>
        <div class="invest-page-title mb-32px">投资理念</div>
        <div class="flex justify-between">
            {arrInvestConcept.map((item, index) => (
                <div 
                  class={`w-308px h-144px text-center pt-32px ${currentHoverIndex.value === index ? 'invest-item-active' : ''} ${bgColor.value == 'white' ? 'background-colorBgLayout' : 'background-white'}`}
                  onMouseenter={() => handleMouseEnter(index)}
                >
                    <img class="max-w-48px h-48px mb-12px" src={ currentHoverIndex.value === index ? item.iconActive : item.icon } alt={item.title} />
                    <div class={`invest-item-title font-normal text-xl text-center`}>{item.title}</div>
                    {currentHoverIndex.value === index ? <div class={`invest-item-target ${bgColor.value == 'white' ? 'item-target-gray':'item-target-white'}`}></div> : ''}
                </div>
            ))}        
        </div>      
        <div class={`invest-item-desc w-full h-92px px-32px py-34px text-base font-normal mt-32px ${bgColor.value == 'white' ? 'background-colorBgLayout' : 'background-white'}`}>{arrInvestConcept[currentHoverIndex.value].desc}</div>
      </div>
    )
  }
})
