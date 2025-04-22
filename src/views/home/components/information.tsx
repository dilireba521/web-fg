import { defineComponent, ref, onMounted, handleError } from 'vue'
import { useGo } from '@/hooks/web/usePage'
import { useScreenStore } from '@/store/modules/screen'
import './index.less'

// 导入图片资源
import iconRightRed from '@/assets/icon-right-red.png'
// 导入API
import * as userApi from '@/api/user'
import { first } from 'lodash-es'

export default defineComponent({
  components: {},
  setup(props, ctx) {
    const screenStore = useScreenStore()
    const { go } = useGo()
    // 创建响应式引用存储新闻数据
    const newsData = ref([])
    const firstNews = ref({})
    const loading = ref(false)

    onMounted(async () => {
      try {
        loading.value = true
        // 使用正确的API函数名称
        const res = await userApi.useGetNewsInfo({ isHome: true })
        let data = res.data.value
        if (data && data.retCode == 0) {
          newsData.value = data.data.slice(0, 4)
          firstNews.value = data.data[0]
        }
      } catch (error) {
        console.error('获取新闻数据失败:', error)
      } finally {
        loading.value = false
      }
    })

    const formatDate = (dateStr: string) => {
      const [year, month, day] = dateStr.split('-')
      return `${parseInt(month, 10)}月${parseInt(day, 10)}日 ${year}`
    }

    const goInformaton = () => {
      go('/news')
    }

    const handleNewsDetail = (item: any) => {
      localStorage.setItem('currentArticleDetail', JSON.stringify(item))
      go('/newsDetail')
    }

    return () => (
      <div>
        {screenStore.isMobile ? (
          <div class="px-8 pt-12 pb-8 background-white">
            <div class="flex justify-between items-center mb-6">
              <div class="font-h3 font-medium">信息资讯</div>
              <div class="flex items-center" onClick={goInformaton}>
                <div class="font-h5 font-color-colorRed">了解更多</div>
                <img class="w-22px h-22px ml-4px" src={iconRightRed} alt="了解更多" />
              </div>
            </div>
            <div class="info-item w-full pt-23px" onClick={()=>{handleNewsDetail(firstNews.value )}}>
              <div class="info-item-type font-normal font-h8 mb-1">
                {(firstNews.value as any).category?.name || '未分类'}
              </div>
              <div class="info-item-date font-normal font-h6 mb-6">
                {formatDate((firstNews.value as any)?.releaseDate || '')}
              </div>
              <div class="info-item-title h-12 font-medium font-h6 mb-4 line-clamp-2">
                {(firstNews.value as any).title}
              </div>
              <div class="info-item-img w-full h-244px"></div>
            </div>
          </div>
        ) : (
          <div class="info-page w-full min-h-706px pt-96px pb-120px px-320px">
            <div class="mb-40px flex justify-between">
              <div class="font-medium text-black flex font-h3">信息资讯</div>
              <div class="font-h7 font-normal flex" onClick={goInformaton}>
                <div class="mr-4px info-more">了解更多</div>
                <img class="w-22px h-22px ml-4px" src={iconRightRed} alt="了解更多" />
              </div>
            </div>
            <div class="flex flex-wrap justify-between">
              {newsData.value.map((item, index) => (
                <div key={index} class="info-item mb-30px" onClick={()=>{handleNewsDetail(item)}}>
                  <div class="info-item-line w-296px h-2px mb-22px"></div>
                  <div class="info-item-type font-normal font-h8 mb-4px">
                    {(item as any).category?.name || '未分类'}
                  </div>
                  <div class="info-item-date font-normal font-h6 mb-32px">
                    {formatDate((item as any)?.releaseDate || '')}
                  </div>
                  <div class="info-item-title max-w-296px h-12 font-medium font-h6 mb-16px line-clamp-2">
                    {(item as any).title}
                  </div>
                  <div class="info-item-img w-296px h-222px"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
})
