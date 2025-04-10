import { defineComponent, ref, onMounted } from 'vue'
import './index.less'
// 导入图片资源
import iconRightRed from '@/assets/icon-right-red.png'

export default defineComponent({
  components: {},
  setup(props, ctx) {
    onMounted(() => {
      
    })
    
    return () => (
      <div class="info-page w-full min-h-706px pt-96px pb-120px px-320px">
        <div class="mb-40px flex justify-between">
            <div class="font-medium text-black flex font-h3">信息资讯</div>
            <div class="text-sm font-normal flex">
                <div class="mr-4px info-more">了解更多</div>
                <img class="w-22px h-22px ml-4px" src={iconRightRed} alt="了解更多" />
            </div>
        </div>
        <div class="flex flex-wrap justify-between">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} class="info-item mb-30px">
                    <div class="info-item-line w-296px h-2px mb-22px"></div>
                    <div class="info-item-type font-normal text-xs mb-4px">类型</div>
                    <div class="info-item-date font-normal text-base mb-32px">3月14日 2025</div>
                    <div class="info-item-title max-w-296px font-medium text-base mb-16px">体验游戏的未来：腾讯游戏携创新游戏技术亮相2025年游戏开发者大会</div>
                    <div class="info-item-img w-296px h-222px"></div>
                </div>
            ))}
        </div>
      </div>
    )
  }
})
