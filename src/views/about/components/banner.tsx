import { defineComponent } from 'vue'
import { Carousel, Button, ConfigProvider } from 'ant-design-vue'
import logoImg from '@/assets/icons/logo.svg'
import style from '../index.module.less'
import { useEventBus } from '@vueuse/core'
import { useUserStore } from '@/store/modules/user'

export default defineComponent({
  props: {
    record: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    // const userStore = useUserStore()

    // const eventBus = useEventBus('login')

    // function handleClick(params: any) {
    //   eventBus.emit(params)
    // }
    function renderImg(data?: any) {
      function jump() {
        if (!data?.link) return
        window.open(data?.link, '_blank')
      }
      const _img = 'https://rta1.oss-cn-hangzhou.aliyuncs.com/fundFg/about.png'
      const _style = {
        'background-image': `url(${_img})`,
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        height: '100%',
      }
      return (
        <div onClick={jump} class={[style.banner, data?.link && 'cursor-pointer']}>
          <div style={_style}></div>
        </div>
      )
    }
    return () => {
      console.log('props?.record===', props?.record)
      return (
        <div>
          <Carousel class="mx-auto" autoplay autoplaySpeed={8000}>
            {props?.record.length > 0
              ? props?.record
                ?.sort((a, b) => a?.order - b?.order)
                .map((item: any) => {
                  return renderImg(item)
                })
              : renderImg()}
          </Carousel>
        </div>
      )
    }
  }
})
