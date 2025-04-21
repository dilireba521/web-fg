import { defineComponent, ref, onMounted } from 'vue'
import { useGo } from '@/hooks/web/usePage'
import './index.less'
import { useScreenStore } from '@/store/modules/screen'
// 导入图片资源
import iconMouse from '@/assets/icon-mouse.png'
import iconDown from '@/assets/icon-down.png'
import iconRightRed from '@/assets/icon-right-red.png'
import rtaChinese from '@/assets/rta-chinese.png'
import rtaEnglish from '@/assets/rta-english.png'
import rtaLogoGold from '@/assets/rta-logo-gold.png'
import homeMobileCompany from '@/assets/home-mobile-company.png'
// 组件引入
import Information from '@/views/home/components/information'
import InvestConcept from '@/views/home/components/InvestConcept'
import { SvgIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    Information,
    InvestConcept,
    SvgIcon
  },
  setup(props, ctx) {
    const { go } = useGo()
    const screenStore = useScreenStore()
    const videoRef = ref<HTMLVideoElement | null>(null)
    let rtaIntro1 = `诺言（湖北）私募基金管理有限公司成立于 2025 年，致力于为多元化的客户群体提供高质量金融增值服务，建立了以数据驱动的基金投资、资产管理和托管等全方位发展的均衡业务结构。`
    let rtaIntro2 = `公司总部位于厦门，业务涵盖了证券、基金、期货、外汇和大宗商品等多个领域，为国内外企业客户、机构客户、高净值客户提供各类金融服务解决方案，公司将秉持以客户为中心，协助客户实现其资产可持续发展目标。`

    onMounted(() => {
      if (videoRef.value) {
        // 预加载视频
        videoRef.value.preload = 'auto'
        // 设置视频缓冲策略
        videoRef.value.addEventListener('canplay', () => {
          videoRef.value?.play()
        })
      }
    })

    const understandMore = () => {
      go('/about')
    }

    return () => (
      <div class="">
        {/* class="mt-[-60px]" */}
        <div>
          <div class="video w-full">
            <video
              ref={videoRef}
              class={{"w-full": true, "h-full": screenStore.isMobile, "h-100vh object-cover": !screenStore.isMobile}}
              autoplay
              loop
              muted
              playsinline
              preload="auto"
              webkit-playsinline
              x5-playsinline
              x-webkit-airplay="allow"
              x5-video-player-type="h5"
              x5-video-player-fullscreen="true"
              src="https://rta1.oss-cn-hangzhou.aliyuncs.com/uni/static/v2.mp4"
            ></video>
            {screenStore.isMobile ? null : (
              <div>
                <img class="video-bottom-icons up float-animation" src={iconMouse} alt="鼠标图标" />
                <img
                  class="video-bottom-icons down float-animation-delay"
                  src={iconDown}
                  alt="向下图标"
                />
              </div>
            )}
          </div>
          {screenStore.isMobile ? (
            <div class="home-mobile-company h-451px relative px-6 pt-10">
              <div class="font-h3 font-medium mb-6">走进诺言私募</div>
              <div class="font-h5 font-color-colorText">
                <p class="mb-28px">{rtaIntro1}</p>
                <p>{rtaIntro2}</p>
              </div>
              <img
                class="absolute w-324px h-291px bottom-0 left-24px"
                src={homeMobileCompany}
                alt=""
              />
              <div class="flex absolute left-8 bottom-22px items-center" onClick={understandMore}>
                <div class="font-h5 font-color-colorRed">了解更多</div>
                <img class="w-22px h-22px ml-4px" src={iconRightRed} alt="了解更多" />
              </div>
            </div>
          ) : (
            <div class="w-full min-h-800px pt-160px pb-281px justify-center flex">
              <div>
                <div class="home-intro-title font-medium font-h2 mb-32px">走进诺言私募</div>
                <div class="home-intro-content max-w-720px font-normal text-xl mb-57px">
                  <p class="mb-28px">{rtaIntro1}</p>
                  <p>{rtaIntro2}</p>
                </div>
                <div class="home-intro-more text-sm font-normal flex" onClick={understandMore}>
                  <div>了解更多</div>
                  <img class="w-22px h-22px ml-4px" src={iconRightRed} alt="了解更多" />
                </div>
              </div>
              <div class="ml-126px flex flex-col items-center pt-96px">
                <img class="w-60px h-54px mb-40px" src={rtaLogoGold} alt="" />
                <img class="w-400px h-85px mb-18px" src={rtaEnglish} alt="" />
                <img class="w-162px h-33px" src={rtaChinese} alt="" />
              </div>
            </div>
          )}
          <Information />
          {screenStore.isMobile ? null : <InvestConcept themeBgColor={'white'} />}
        </div>
      </div>
    )
  }
})
