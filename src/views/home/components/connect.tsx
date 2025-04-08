import { defineComponent, ref, onMounted } from 'vue'
import './index.less'
// 导入图片资源
import logoHomeBottom from '@/assets/logo-home-bottom.svg'

export default defineComponent({
  components: {},
  setup(props, ctx) {

    onMounted(() => {
      
    })

    return () => (
      <div class="connect-page w-full min-h-297px pt-64px px-320px flex">
        <div class="connect-box w-full flex justify-between">
            <div class="flex">
                <img class="w-96px h-86px mr-96px" src={logoHomeBottom} alt="" />
                <div>
                    <div class="connect-title font-normal text-base mb-24px">联系我们</div>
                    <div class="connect-info-item font-normal text-sm mb-16px">
                        <span class="mr-24px">地址</span><span>厦门市思明区波特曼财富中心</span>
                    </div>
                    <div class="connect-info-item font-normal text-sm mb-16px">
                        <span class="mr-24px">电话</span><span>0592-8888888</span>
                    </div>
                    <div class="connect-info-item font-normal text-sm mb-16px">
                        <span class="mr-24px">邮箱</span><span>rta@rta-fund.com</span>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="mr-32px text-center">
                    <div class="w-96px h-96px bg-white text-center flex justify-center items-center">
                        <div class="w-80px h-80px" style={{ backgroundColor: '#f5f5f5' }}></div>
                    </div>
                    <div class="connect-code-text mt-8px font-normal text-sm">微信公众号</div>
                </div>
                <div class="text-center">
                    <div class="w-96px h-96px bg-white flex justify-center items-center">
                        <div class="w-80px h-80px" style={{ backgroundColor: '#f5f5f5' }}></div>
                    </div>
                    <div class="connect-code-text mt-8px font-normal text-sm">微信小程序</div>
                </div>
            </div>
        </div>
      </div>
    )
  }
})
