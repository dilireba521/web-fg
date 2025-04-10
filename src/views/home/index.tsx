import { defineComponent, ref, onMounted } from 'vue'
import './index.less'
// 导入图片资源
import iconMouse from '@/assets/icon-mouse.png'
import iconDown from '@/assets/icon-down.png'
import iconRightRed from '@/assets/icon-right-red.png'
import rtaChinese from '@/assets/rta-chinese.png'
import rtaEnglish from '@/assets/rta-english.png'
import rtaLogoGold from '@/assets/rta-logo-gold.png'
// 组件引入
import Information from '@/views/home/components/information'
import InvestConcept from '@/views/home/components/InvestConcept'
import Connect from '@/views/home/components/connect'
import { SvgIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    Information,
    InvestConcept,
    Connect,
    SvgIcon
  },
  setup(props, ctx) {
    const videoRef = ref<HTMLVideoElement | null>(null)
    let rtaIntro1 = `诺言私募基金管理有限公司成立于 2025 年，致力于为多元化的客户群体提供高质量金融增值服务，
    依托自主构建的宏微观研究框架和全天候风控能力，建立了以数据驱动的基金投资、科学稳健的量化赋能策略决策体系结构。`
    let rtaIntro2 = `公司总部位于厦门，业务涵盖了股票、债券、期货、期权等多个金融衍生品领域。公司将秉持以客户利益为核心的买方思维，
    在波动市场中持续创造超额收益。协助国内外企业客户、机构客户、高净值客户实现其资产可持续发展目标。`

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
    return () => (
      <div class="">
        <div class="mt-[-60px]">
          <div class="video">
            <video
              ref={videoRef}
              class="w-full h-full"
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
            <img class="video-bottom-icons up float-animation" src={iconMouse} alt="鼠标图标" />
            <img class="video-bottom-icons down float-animation-delay" src={iconDown} alt="向下图标" />
          </div>
          <div class="w-full min-h-800px pt-160px pb-281px justify-center flex">
            <div>
              <div class="home-intro-title font-medium font-h2 mb-32px">走进诺言私募</div>
              <div class="home-intro-content max-w-720px font-normal text-xl mb-57px">
                <p class="mb-28px">{rtaIntro1}</p>
                <p>{rtaIntro2}</p>
              </div>
              <div class="home-intro-more text-sm font-normal flex">
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
          <Information />
          <InvestConcept themeBgColor={"white"} />
          <Connect />
        </div>
      </div>
    )
  }
})
