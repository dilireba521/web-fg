import { defineComponent, ref, onMounted } from 'vue'
import './index.less'
import { useScreenStore } from '@/store/modules/screen'
// 导入图片资源
import logoHomeBottom from '@/assets/logo-home-bottom.svg'

export default defineComponent({
  components: {},
  setup(props, ctx) {
    const screenStore = useScreenStore()
    onMounted(() => {})

    return () => (
      <div>
        {screenStore.isMobile ? (
          <div class="connect-mobile-box p-6 background-colorBgLayout">
            <div class="mb-4 font-h4 font-color-colorTextSecondary">联系我们</div>
            <div class="mb-2 font-h5 font-color-colorTextTertiary">
              <span class="mr-4">地址</span>
              <span>厦门市思明区波特曼财富中心</span>
            </div>
            <div class="mb-2 font-h5 font-color-colorTextTertiary">
              <span class="mr-4">电话</span>
              <span>0592-5775575</span>
            </div>
            <div class="mb-2 font-h5 font-color-colorTextTertiary">
              <span class="mr-4">邮箱</span>
              <span>service@rta-fund.com</span>
            </div>
            {/* <div class="flex mt-6">
              <div class="mr-32px text-center">
                <div class="w-24 h-24 bg-white text-center flex justify-center items-center">
                  <div class="w-20 h-20" style={{ backgroundColor: '#f5f5f5' }}></div>
                </div>
                <div class="connect-code-text mt-8px font-normal font-h5">微信公众号</div>
              </div>
              <div class="text-center">
                <div class="w-24 h-24 bg-white text-center flex justify-center items-center">
                  <div class="w-20 h-20" style={{ backgroundColor: '#f5f5f5' }}></div>
                </div>
                <div class="connect-code-text mt-8px font-normal font-h5">微信公众号</div>
              </div>
            </div> */}
          </div>
        ) : (
          <div class="flex items-center justify-center connect-page">
            <div class="w-320 h-297px pt-64px flex">
            <div class="connect-box w-full flex justify-between">
              <div class="flex">
                <img class="w-96px h-86px mr-96px" src={logoHomeBottom} alt="" />
                <div>
                  <div class="connect-title font-normal font-h6 mb-24px">联系我们</div>
                  <div class="connect-info-item font-normal font-h7 mb-16px">
                    <span class="mr-24px">地址</span>
                    <span>厦门市思明区波特曼财富中心</span>
                  </div>
                  <div class="connect-info-item font-normal font-h7 mb-16px">
                    <span class="mr-24px">电话</span>
                    <span>0592-5775575</span>
                  </div>
                  <div class="connect-info-item font-normal font-h7 mb-16px">
                    <span class="mr-24px">邮箱</span>
                    <span>service@rta-fund.com</span>
                  </div>
                </div>
              </div>
              {/* <div class="flex pt-12">
                <div class="mr-32px text-center">
                  <div class="w-96px h-96px bg-white text-center flex justify-center items-center">
                    <div class="w-80px h-80px" style={{ backgroundColor: '#f5f5f5' }}></div>
                  </div>
                  <div class="connect-code-text mt-8px font-normal font-h7">微信公众号</div>
                </div>
                <div class="text-center">
                  <div class="w-96px h-96px bg-white flex justify-center items-center">
                    <div class="w-80px h-80px" style={{ backgroundColor: '#f5f5f5' }}></div>
                  </div>
                  <div class="connect-code-text mt-8px font-normal font-h7">微信小程序</div>
                </div>
              </div> */}
            </div>
          </div>
          </div>
        )}
      </div>
    )
  }
})
