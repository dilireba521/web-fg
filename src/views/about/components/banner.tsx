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
      const _img = 'https://rta1.oss-cn-hangzhou.aliyuncs.com/web-bg/web-headbg/head-connect.png'
      return (
        <div onClick={jump} class={[style.banner, data?.link && 'cursor-pointer']}>
          <img class='w-full h-full' src={_img} alt=" " onError={(e) => (e.target.src = logoImg)} />
          {/* {
            !!data ? <img class='w-full h-full' src={data?.image?.image} alt=" " onError={(e) => (e.target.src = logoImg)} />
              : <img class='w-100 h-full m-auto' src={logoImg} alt=" " />
          } */}
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
