import { defineComponent, onMounted, onUnmounted } from 'vue'
import MapVue from '@/components/map'
import Banner from './components/banner'

export default defineComponent({
  setup(props, ctx) {
    return () => (
      <div>
        <Banner />
        <div class="container">
          <div class="w-full flex py-24">
            <div class="w-96 shrink-0 text-left pt-8 pr-8">
              <div class="font-h5 mb-6">诺言（湖北）私募基金管理有限公司</div>
              <div class="font-h6 color-secondary">
                <div class="mb-2">地址：厦门市思明区波特曼财富中心</div>
                <div class="mb-2">电话：0592-5775575</div>
                <div>邮箱：service@rta-fund.com</div>
              </div>
            </div>
            <div class="w-full ">
              <MapVue></MapVue>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
