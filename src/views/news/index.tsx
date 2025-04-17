import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { WEB_BG_HEAD } from '@/utils/resources'
import { useGo } from '@/hooks/web/usePage'
import './index.less'
import { SubTitle } from '@/components/Icon'
import * as userApi from '@/api/user'

import iconRightGray from '@/assets/icon-right-gray.png'
import iconRightRed from '@/assets/icon-right-red.png'

const arrNewsTitle = ref(['公司公告', '新闻资讯'])

export default defineComponent({
  components: {
    SubTitle
  },
  setup(props, ctx) {
    const { go } = useGo()
    // 定义各个部分的ref引用
    const companyAnnouncementRef = ref(null)
    const informationRef = ref(null)
    const arrNews = ref([]) // 新闻资讯
    const arrAnnouncement = ref([]) // 公司公告
    const firstNews = ref({})

    // 当前激活的索引
    const activeIndex = ref(0)
    // 控制新闻资讯的activeIndex
    const activeNewsIndex = ref(-1)

    // 处理SubTitle点击事件
    const handleSubTitleClick = (index: number) => {
      const refs = [companyAnnouncementRef, informationRef]
      if (refs[index]?.value) {
        ;(refs[index].value as HTMLElement).scrollIntoView({ behavior: 'smooth' })
      }
    }

    // 监听滚动事件，更新activeIndex
    const handleScroll = () => {
      const refs = [companyAnnouncementRef, informationRef]
      const scrollPosition = window.scrollY + 500 // 添加一些偏移量，使切换更自然

      // 找到当前在视口中的元素
      for (let i = refs.length - 1; i >= 0; i--) {
        if (refs[i]?.value) {
          const element = refs[i].value as unknown as HTMLElement
          const offsetTop = element.offsetTop

          if (scrollPosition >= offsetTop) {
            activeIndex.value = i
            break
          }
        }
      }
    }

    const handleNewsInfo = async (type: string) => {
      try {
        // categoryId:2 新闻资讯, categoryId:3 公司公告
        const res = await userApi.useGetNewsInfo({ categoryId: type })
        // 获取数据，数据在data的_value中
        let data = res.data.value
        if (data && data.retCode == 0) {
          for (let i = 0; i < data.data.length; i++) {
            data.data[i].releaseDateYear = data.data[i].releaseDate.split('-')[0]
            data.data[i].releaseDateMonth = data.data[i].releaseDate.split('-')[1]
            data.data[i].releaseDateDate = data.data[i].releaseDate.split('-')[2]
          }
          if (type == '2') {
            // 新闻资讯
            firstNews.value = data.data[0]
            console.log('信息资讯数据获取', data.data.slice(1, 3))
            arrNews.value = data.data.slice(1, 3)
          } else {
            // 公司公告
            arrAnnouncement.value = data.data.slice(0, 4)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    const handleArticleDetail = (item: any) => {
      localStorage.setItem('currentArticleDetail', JSON.stringify(item))
      go('/newsDetail')
    }

    const handleMouseEnter = (index: number) => {
      // 鼠标进入时，更新activeIndex
      activeNewsIndex.value = index
    }

    // 组件挂载时添加滚动监听
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      // 初始化时执行一次，确保初始状态正确
      handleScroll()
      handleNewsInfo('3')
      handleNewsInfo('2')
    })

    // 组件卸载时移除滚动监听
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    const handleAnnounce = () => {
      // 跳转到公司公告页面
      go('/announcement')
    }

    const handleNews = () => {
      // 跳转到公司公告页面
      go('/reportPage')
    }

    return () => (
      <div>
        <div class="w-full h-120">
          <img class="w-full h120" src={`${WEB_BG_HEAD}/head-news.png`} />
        </div>
        <SubTitle
          arrTitle={arrNewsTitle.value}
          activeIndex={activeIndex.value}
          onItemClick={handleSubTitleClick}
        />
        <div
          ref={companyAnnouncementRef}
          id="company-announcement"
          class="w-full h-618px px-80 py-24 bg-gray-100"
        >
          <div class="mb-12 flex justify-between items-baseline">
            <div class="font-h3 font-bold text-black">公司公告</div>
            <div class="flex items-center" onClick={handleAnnounce}>
              <div class="font-h7 font-color-colorTextTertiary mr-9px">查看全部</div>
              <img class="w-22px h-22px" src={iconRightGray} />
            </div>
          </div>
          <div class="w-full flex flex-wrap justify-between">
            {arrAnnouncement.value.map((item, index) => (
              <div
                class="news-item bg-white px-8 py-6 h-40 mb-4 flex"
                onClick={() => {
                  handleArticleDetail(item)
                }}
              >
                <div class="h-112px w-110px flex pr-8" style={{ borderRight: '1px solid #979797' }}>
                  <div class="font-h4 mr-2px font-color-colorText">
                    {(item as any).releaseDateDate}
                  </div>
                  <div class="font-h4 mr-1 font-color-colorTextSecondary">/</div>
                  <div class="font-h7 font-color-colorTextSecondary">
                    <div>{(item as any).releaseDateMonth}月</div>
                    <div>{(item as any).releaseDateYear}</div>
                  </div>
                </div>
                <div class="compny-announcement flex-1 pl-8 overflow-hidden">
                  <div class="compny-announcement-title truncate mb-2 font-h6 w-full font-color-colorText">
                    {(item as any).title}
                  </div>
                  <div
                    class="line-clamp-2 font-color-colorTextSecondary mb-4 font-h7 w-full overflow-hidden"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {(item as any).label}
                  </div>
                  <div class="font-h8" style={{ color: '#C1272D' }}>
                    查看详情
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div ref={informationRef} id="information" class="w-full h-602px px-80 py-24 bg-white">
          <div class="mb-12 flex justify-between items-baseline">
            <div class="font-h3 font-bold text-black">新闻资讯</div>
            <div class="flex items-center" onClick={handleNews}>
              <div class="font-h7 font-color-colorTextTertiary mr-9px">查看全部</div>
              <img class="w-22px h-22px" src={iconRightGray} />
            </div>
          </div>
          <div class="w-full flex justify-between h-80">
            <div
              class="news-item bg-gray-100 pt-6 pb-4 px-8 flex flex-col justify-between"
              onClick={() => {
                handleArticleDetail(firstNews.value)
              }}
            >
              <div class="ml-auto text-white">
                <div class="font-h4 text-right">{(firstNews.value as any).releaseDateDate}</div>
                <div class="font-h7 text-right">
                  {(firstNews.value as any).releaseDateMonth}.
                  {(firstNews.value as any).releaseDateYear}
                </div>
              </div>
              <div class="font-h5 text-left text-white font-color-colorText">
                {(firstNews.value as any).title}
              </div>
            </div>
            <div class="news-item bg-white flex justify-between">
              {arrNews.value.map((item, index) => (
                <div
                  class="news-item-container news-item h-full bg-gray-100 px-8 pt-6 pb-8 flex flex-col"
                  onMouseenter={() => handleMouseEnter(index)}
                  onMouseleave={() => handleMouseEnter(-1)}
                  onClick={() => {
                    handleArticleDetail(item)
                  }}
                >
                  <div class="news-item-title line-clamp-2 font-h6 mb-6">{(item as any).title}</div>
                  <div class="line-clamp-3 font-h7 font-color-colorTextSecondary">
                    {(item as any).label}
                  </div>
                  <div class="mt-auto flex justify-between items-end">
                    <div>
                      <div class="font-h4 font-color-colorTextSecondary">
                        {(item as any).releaseDateDate}
                      </div>
                      <div class="font-h7 font-color-colorTextSecondary">
                        {(item as any).releaseDateYear}.{(item as any).releaseDateMonth}
                      </div>
                    </div>
                    {activeNewsIndex.value === index ? (
                      <img class="w-22px h-22px" src={iconRightRed} />
                    ) : (
                      <img class="w-22px h-22px" src={iconRightGray} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
})
