import { defineComponent, ref } from 'vue'
import { SubTitle } from '@/components/Icon'

import investFramework from '@/assets/invest-framework.png'
import InvestConcept from '@/views/home/components/InvestConcept'

const webBgHead = 'https://rta1.oss-cn-hangzhou.aliyuncs.com/web-bg/web-headbg'

const arrAboutCatalogue = ref(['投资框架','投资理念','投资研究','投资风控'])

export default defineComponent({
  components: {
    SubTitle,
    InvestConcept
  },

  setup(props, ctx) {
    return () => (
      <div>
        <div class="w-full">
          <img class="w-full h-480px" src={`${webBgHead}/head-invest.jpg`} alt="关于我们" />
        </div>
        <SubTitle arrTitle={arrAboutCatalogue.value} />
        <div class="w-full h-895px text-center pt-24">
          <div class="font-h3 font-medium font-color-colorBlack">投资框架</div>
          <img class="w-983px h-757px" src={investFramework} alt="投资框架" />
        </div>
        <InvestConcept themeBgColor={"gray"}/>
        <div class="w-full px-80 py-24 background-white">
          <div></div>
        </div>
      </div>
    )
  }
})
