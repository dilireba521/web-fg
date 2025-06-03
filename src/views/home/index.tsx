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
    let rtaIntro1 = `诺言私募基金管理有限公司成立于2025年，是一家专注于为多元化投资者提供专业服务的机构。公司构建了宏观经济与微观产业深度融合的研究体系，并配备全周期的风险管理能力，建立了以数据为驱动、量化模型为核心的投资决策体系。`
    let rtaIntro2 = `公司总部位于厦门，业务涵盖了股票、债券、期货、期权等多个金融衍生品领域。公司秉持以投资者长期利益为导向的专业买方视角，致力于在复杂市场环境中挖掘投资机会，助力机构投资者、企业客户及高净值个人实现其资产的长期增值目标。`

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
              class={{
                'w-full': true,
                'h-100vh object-cover': true, // 基础样式：占满视口高度
                'object-cover': !screenStore.isMobile // 桌面端可以添加其他特定样式
              }}
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
            <div class="background-colorBgLayout h-451px relative px-6 pt-10">
              <div class="font-h3 font-medium mb-6">走进诺言私募</div>
              <div class="font-h5 font-color-colorText relative z-10">
                <p class="mb-28px">{rtaIntro1}</p>
                <p>{rtaIntro2}</p>
              </div>
              <img
                class="absolute w-324px h-291px bottom-0 left-24px z-1"
                src={homeMobileCompany}
                alt=""
              />
              <div
                class="flex absolute left-8 bottom-22px items-center z-10"
                onClick={understandMore}
              >
                <div class="font-h5 font-color-colorRed">了解更多</div>
                <img class="w-22px h-22px ml-4px" src={iconRightRed} alt="了解更多" />
              </div>
            </div>
          ) : (
            <div class="w-full min-h-800px pt-160px pb-281px justify-center flex">
              <div>
                <div class="home-intro-title font-medium font-h2 mb-32px">走进诺言私募</div>
                <div class="home-intro-content max-w-720px font-normal text-xl custom-font mb-57px font-h5">
                  <p class="mb-28px">{rtaIntro1}</p>
                  <p>{rtaIntro2}</p>
                </div>
                <div class="home-intro-more text-sm custom-font font-normal flex" onClick={understandMore}>
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
