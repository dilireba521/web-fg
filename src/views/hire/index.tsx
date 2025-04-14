import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { WEB_BG_HEAD } from '@/utils/resources'
import { SubTitle } from '@/components/Icon'

const arrHireTitle = ref(['社会招聘', '校园招聘'])

export default defineComponent({
  components: {
    SubTitle
  },
  setup(props, ctx) {
    // 定义各个部分的ref引用
    const societyHireRef = ref(null)
    const campusHireRef = ref(null)

    // 处理SubTitle点击事件
    const handleSubTitleClick = (index: number) => {
      const refs = [societyHireRef, campusHireRef]
      if (refs[index]?.value) {
        (refs[index].value as HTMLElement).scrollIntoView({ behavior: 'smooth' })
      }
    }

    return () => (
      <div>
        <div class="w-full h-120 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${WEB_BG_HEAD}/head-join.jpg)` }}></div>
        <SubTitle arrTitle={arrHireTitle.value}  onItemClick={handleSubTitleClick} />
      </div>
    )
  }
})
