import { defineComponent, ref, onMounted } from 'vue'
import './index.less'
export default defineComponent({
  components: {},
  setup(props, ctx) {
    const videoRef = ref<HTMLVideoElement | null>(null)

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
          222
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          222
          <br />
          <br />
          <br />
        </div>
      </div>
    )
  }
})
