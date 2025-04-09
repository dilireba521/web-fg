import { defineComponent, ref } from 'vue'
import { SubTitle } from '@/components/Icon'

const webBgHead = 'https://rta1.oss-cn-hangzhou.aliyuncs.com/web-bg/web-headbg'

const arrAboutCatalogue = ref(['投资框架','投资理念','投资研究','投资风控'])

export default defineComponent({
  components: {
    SubTitle
  },

  setup(props, ctx) {
    return () => (
      <div>
        <div class="w-full">
          <img class="w-full h-480px" src={`${webBgHead}/head-invest.jpg`} alt="关于我们" />
        </div>
        <SubTitle arrTitle={arrAboutCatalogue.value} />
      </div>
    )
  }
})
