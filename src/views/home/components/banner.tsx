import { defineComponent, onMounted, ref } from 'vue'
import { Carousel, Button, ConfigProvider } from 'ant-design-vue'
import logoImg from '@/assets/icons/logo.svg'
import style from '../index.module.less'
import { useEventBus } from '@vueuse/core'
import { useUserStore } from '@/store/modules/user'
import { useGetSliders } from '@/api/user'

export default defineComponent({
  props: {
    // record: {
    //   type: Array,
    //   default: () => []
    // }
  },
  setup(props) {
    const dataSource = ref()
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
      const _style = {
        'background-image': `url(${data?.image?.image})`,
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        height: '100%',
      }
      return (
        <div onClick={jump}
          class={[style.banner, data?.link && 'cursor-pointer']}>
          <div style={_style}></div>
        </div>
      )
    }
    async function useGetSlidersFn() {
      try {
        const { data } = await useGetSliders()
        console.log('22222=', data)
        if (data.value?.retCode == 0) {
          dataSource.value = data.value?.data
        }
      } catch (error) { }
    }
    onMounted(() => {
      useGetSlidersFn()
    })
    return () => {
      // console.log('props?.record===', props?.record)
      return (
        <div>
          <Carousel class="mx-auto" autoplay autoplaySpeed={8000}>
            {dataSource.value?.length > 0
              ? dataSource.value
                ?.sort((a, b) => (a?.order || 0) - (b?.order || 0))
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
