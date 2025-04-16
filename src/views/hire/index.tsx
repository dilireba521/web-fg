import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { WEB_BG_HEAD } from '@/utils/resources'
import { SubTitle } from '@/components/Icon'
import * as userApi from '@/api/user'
import './index.less'

const arrHireTitle = ref(['社会招聘', '校园招聘'])

export default defineComponent({
  components: {
    SubTitle
  },
  setup(props, ctx) {
    // 定义各个部分的ref引用
    const hireType = ref(1)
    const arrSocietyHire = ref([])
    const arrCampusHire = ref([])

    // 处理SubTitle点击事件
    const handleSubTitleClick = (index: number) => {
      console.log('点击了第', index, '个标题')
      // const refs = [societyHireRef, campusHireRef]
      // if (refs[index]?.value) {
      //   (refs[index].value as HTMLElement).scrollIntoView({ behavior: 'smooth' })
      // }
    }

    const handleHireInfo = async () => {
      try {
        // categoryId:1 社会招聘, categoryId:2 校园招聘
        const res = (await userApi.useGetHireInfo({categoryId: hireType.value}))
        console.log('招聘信息数据获取', res.data.value)
        // 获取数据，数据在data的_value中
        let data = res.data.value
        if (data && data.retCode == 0) {
             if( hireType.value == 1 ){
              arrSocietyHire.value = data.data
             }else{
              arrCampusHire.value = data.data
            }
        }
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(() => {
      handleHireInfo()
    })

    return () => (
      <div>
        <div class="w-full h-120 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${WEB_BG_HEAD}/head-join.jpg)` }}></div>
        <SubTitle arrTitle={arrHireTitle.value}  onItemClick={handleSubTitleClick} />
        <div class="w-full px-80 pt-24 flex background-colorBgLayout">
          <div class="hire-type-box w-304px h-full pr-8">
            <div class="hire-type-clear flex justify-between py-4">
              <div>筛选</div>
              <div>清除</div>
            </div>
            <div class="pt-6">
              <div>职位类别</div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    )
  }
})
