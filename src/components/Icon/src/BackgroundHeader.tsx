import { defineComponent } from 'vue'
import { useScreenStore } from '@/store/modules/screen'

interface BackgroundHeaderProps {
  backgroundImage: string;
  mobileBackgroundImage?: string;
}

export default defineComponent({
  name: 'BackgroundHeader',
  props: {
    backgroundImage: {
      type: String,
      required: true
    },
    mobileBackgroundImage: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    const screenStore = useScreenStore()

    return () => (
      <>
        {screenStore.isMobile ? (
          <div
            class="w-full bg-cover bg-no-repeat h-390px"
            style={{ 
              backgroundImage: `url(${props.mobileBackgroundImage || props.backgroundImage})`
            }}
          >
            {slots.default?.()}
          </div>
        ) : (
          <div 
            class="w-full relative bg-cover bg-no-repeat h-120" 
            style={{ 
              backgroundImage: `url(${props.backgroundImage})`
            }}
          >
            <div class="max-w-480 mx-auto h-120">
              {slots.default?.()}
            </div>
          </div>
        )}
      </>
    )
  }
})