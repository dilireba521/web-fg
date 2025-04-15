import { defineComponent, ref, onMounted } from 'vue'
import { useGo } from "@/hooks/web/usePage";
import './index.less'
// 导入图片资源
import iconRightRed from '@/assets/icon-right-red.png'
// 导入API
import * as userApi from '@/api/user'

export default defineComponent({
  components: {},
  setup(props, ctx) {
    const { go } = useGo();
    // 创建响应式引用存储新闻数据
    const newsData = ref([])
    const loading = ref(false)
    
    onMounted(async () => {
      try {
        loading.value = true
        // 使用正确的API函数名称
        const res = await userApi.useGetNewsInfo({ isHome: true })
        let data = res.data.value
        if (data && data.retCode == 0) {
          newsData.value = data.data.slice(0,4)
          console.log('获取新闻数据成功:', data.data)
        }
      } catch (error) {
        console.error('获取新闻数据失败:', error)
      } finally {
        loading.value = false
      }
    })

    const formatDate = (dateStr: string) => {
      const [year, month, day] = dateStr.split('-');
      return `${parseInt(month, 10)}月${parseInt(day, 10)}日 ${year}`;
    }

    const goInformaton = () => {
      go("/news");
    }
    
    return () => (
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
                <div key={index} class="info-item mb-30px">
                    <div class="info-item-line w-296px h-2px mb-22px"></div>
                    <div class="info-item-type font-normal font-h8 mb-4px">{(item as any).category?.name || '未分类'}</div>
                    <div class="info-item-date font-normal font-h6 mb-32px">{formatDate((item as any)?.releaseDate || '')}</div>
                    <div class="info-item-title max-w-296px font-medium font-h6 mb-16px">{(item as any).title}</div>
                    <div class="info-item-img w-296px h-222px"></div>
                </div>
            ))}
        </div>
      </div>
    )
  }
})
