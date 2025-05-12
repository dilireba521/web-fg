import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { WEB_BG_HEAD } from '@/utils/resources'
import * as userApi from '@/api/user'
import { useGo } from '@/hooks/web/usePage'
import { useScreenStore } from '@/store/modules/screen'
import './index.less'
// antd
import { Pagination, Breadcrumb } from 'ant-design-vue'
import newsInfo from '@/assets/news-info.png'
import rtaChinese from '@/assets/rta-chinese.png'
import rtaEnglish from '@/assets/rta-english.png'
import rtaLogoGold from '@/assets/rta-logo-gold.png'

export default defineComponent({
  setup(props, ctx) {
    const screenStore = useScreenStore()
    const { go } = useGo()
    const arrNews = ref([])
    const current = ref(1)
    const pageSize = ref(12)
    const total = ref(0)

    const handleNewsInfo = async () => {
      try {
        // categoryId:2 新闻资讯, categoryId:3 公司公告
        const res = await userApi.useGetNewsInfo({
          categoryId: 2,
          pageIndex: current.value,
          pageSize: pageSize.value
        })
        // 获取数据，数据在data的_value中
        let data = res.data.value
        if (data && data.retCode == 0) {
          for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].releaseDate) {
              const dateParts = data.data[i].releaseDate.split('-')
              data.data[i].releaseDateYear = dateParts[0] || '-'
              data.data[i].releaseDateMonth = dateParts[1] || '-'
              data.data[i].releaseDateDate = dateParts[2] || '-'
            } else {
              data.data[i].releaseDateYear = '-'
              data.data[i].releaseDateMonth = '-'
              data.data[i].releaseDateDate = '-'
            }
          }
          arrNews.value = data.data
          current.value = data.pageIndex || 1
          total.value = data.total || data.data.length || 0
        }
      } catch (error) {
        console.log(error)
      }
    }

    // 分页变化处理函数
    const handlePageChange = (page: number, pageSize: number) => {
      current.value = page
      handleNewsInfo()
      // 这里可以添加重新获取数据的逻辑
    }

    const handleArticleDetail = (item: any) => {
      localStorage.setItem('currentArticleDetail', JSON.stringify(item))
      go(`/newsDetail?source=report`)
    }

    onMounted(() => {
      handleNewsInfo()
    })

    return () => (
      <div>
        {/* <div class="news-item-head w-full h-80 px-80 py-45px text-center">
          <img class="w-15 h-54px mb-10 block mx-auto" src={rtaLogoGold} alt="" />
          <img class="w-100 h-85px mb-18px block mx-auto" src={rtaEnglish} alt="" />
          <img class="w-162px h-33px block mx-auto" src={rtaChinese} alt="" />
        </div> */}
        {!screenStore.isMobile && (
          <div
            class="w-full h-80 px-80 py-134px bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${WEB_BG_HEAD}/head-information.png)` }}
          ></div>
        )}
        <div
          class={`${screenStore.isMobile ? '' : 'news-tab'} w-full background-colorBgLayout font-h7 font-color-colorTextTertiary`}
        >
          <div class={`max-w-480 mx-auto ${screenStore.isMobile ? 'px-8 py-4' : 'h-16 px-80 pt-6 pb-18px'}`}>
            {/* 首页 / 新闻信息 / 投资观察 */}
          <Breadcrumb>
            <Breadcrumb.Item>
              <a
                onClick={() => {
                  go('/home')
                }}
              >
                首页
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a
                onClick={() => {
                  go('/news')
                }}
              >
                信息资讯
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>投资观察</Breadcrumb.Item>
          </Breadcrumb>
          </div>
        </div>
        <div class="background-colorBgLayout w-full">
          <div
            class={`${screenStore.isMobile ? '' : 'min-h-100vh px-80 py-12 max-w-480 mx-auto'} flex flex-col`}
          >
            {!screenStore.isMobile && <div class="font-h4 font-medium mb-6">投资观察</div>}
            <div class={`${screenStore.isMobile ? 'px-8' : 'flex flex-wrap'} w-full`}>
              {arrNews.value.map((item, index) => (
                <div
                  class={`${screenStore.isMobile ? 'mb-8' : 'news-observe-item mb-6 mr-4'}`}
                  onClick={() => handleArticleDetail(item)}
                >
                  <img
                    class="w-full h-231px object-cover"
                    src={(item as any).image?.image || newsInfo}
                    alt=""
                  />
                  <div
                    class={`${screenStore.isMobile ? 'text-base custom-font' : 'px-2 font-h6'} w-full h-17 news-item-foot background-colorBgLayout pt-3 pb-2 font-color-colorTextSecondary`}
                  >
                    <div
                      class="news-item-title line-clamp-2 w-full overflow-hidden"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {(item as { title: string }).title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div class={`${screenStore.isMobile ? 'pb-8' : ''} flex justify-end mt-auto`}>
              <Pagination
                current={Number(current.value)}
                pageSize={Number(pageSize.value)}
                total={Number(total.value)}
                onChange={(page) => {
                  current.value = page
                  handleNewsInfo()
                }}
                showSizeChanger={false}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
})
