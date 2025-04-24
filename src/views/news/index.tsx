import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue'
import { WEB_BG_HEAD } from '@/utils/resources'
import { useGo } from '@/hooks/web/usePage'
import './index.less'
import { SubTitle } from '@/components/Icon'
import * as userApi from '@/api/user'
import { useScreenStore } from '@/store/modules/screen'
import { useRoute } from 'vue-router'

import iconRightGray from '@/assets/icon-right-gray.png'
import iconRightRed from '@/assets/icon-right-red.png'
import newsInfo from '@/assets/news-info.png'

const arrNewsTitle = ref(['公司公告', '新闻资讯'])

export default defineComponent({
  components: {
    SubTitle
  },
  setup(props, ctx) {
    const screenStore = useScreenStore()
    const { go } = useGo()
    const route = useRoute()
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
            if (data.data[i].releaseDate) {
              const dateParts = data.data[i].releaseDate.split('-');
              data.data[i].releaseDateYear = dateParts[0] || '-';
              data.data[i].releaseDateMonth = dateParts[1] || '-';
              data.data[i].releaseDateDate = dateParts[2] || '-';
            } else {
              data.data[i].releaseDateYear = '-';
              data.data[i].releaseDateMonth = '-';
              data.data[i].releaseDateDate = '-';
            }
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
      go('/newsDetail?source=news')
    }

    const handleMouseEnter = (index: number) => {
      // 鼠标进入时，更新activeIndex
      activeNewsIndex.value = index
    }

    // 监听路由变化
    // watch(() => route.hash, (newHash) => {
    //   if(screenStore.isMobile) {
    //     // 去掉开头的 # 字符再转换为数字
    //     const index = newHash ? Number(newHash.substring(1)) : 0
    //     setTimeout(() => {
    //       handleSubTitleClick(index)
    //     }, 200)
    //   }
    // }, { immediate: true, deep: true })

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
        {screenStore.isMobile ? (
          <div
            class="w-full h-390px bg-cover bg-center bg-no-repeat px-8 py-12"
            style={{ backgroundImage: `url(${WEB_BG_HEAD}/mobile-head-news.png)` }}
          >
            {/* <div class="font-color-colorText" style={{ fontSize: '32px' }}>
              信息资讯
            </div> */}
          </div>
        ) : (
          <div class="w-full h-120">
            <img class="w-full h120" src={`${WEB_BG_HEAD}/head-news.png`} />
          </div>
        )}
        <SubTitle
          arrTitle={arrNewsTitle.value}
          activeIndex={activeIndex.value}
          onItemClick={handleSubTitleClick}
        />
        {screenStore.isMobile ? (
          <div
            ref={companyAnnouncementRef}
            id="company-announcement"
            class="w-full px-6 pt-10 pb-8 background-colorBgLayout"
          >
            <div class="text-center font-bold font-h1 font-color-colorText mb-6">公司公告</div>
            {arrAnnouncement.value.map((item, index) => (
              <div
                class="w-full p-4 background-white mb-2"
                onClick={() => {
                  handleArticleDetail(item)
                }}
              >
                <div class="truncate mb-2 text-base font-color-colorText font-bold">
                  {(item as any).title}
                </div>
                <div
                  class="line-clamp-2 mb-4 font-color-colorTextSecondary font-h5"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {(item as any).label}
                </div>
                <div class="flex justify-between">
                  <div class="font-h6 font-color-colorRed">查看详情</div>
                  <div class="font-h6 font-color-colorTextSecondary">
                    {(item as any).releaseDateYear}.{(item as any).releaseDateMonth}.
                    {(item as any).releaseDateDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
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
                  <div
                    class="h-112px w-110px flex pr-8"
                    style={{ borderRight: '1px solid #979797' }}
                  >
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
        )}
        {screenStore.isMobile ? (
          <div
            ref={informationRef}
            id="information"
            class="background-white w-full px-6 pt-10 pb-8"
          >
            <div class="text-center font-bold font-h1 font-color-colorText mb-6">投资观察</div>
            <div
              class="w-full h-64 px-4 py-3 bg-center bg-no-repeat px-8 py-12 flex flex-col justify-between mb-2"
              style={{ backgroundImage: `url(${newsInfo})` }}
              onClick={() => {
                handleArticleDetail(firstNews.value)
              }}
            >
              <div class="font-color-colorTextWhite font-h6 ml-auto">
                {(firstNews.value as any).releaseDateYear}.
                {(firstNews.value as any).releaseDateMonth}.
                {(firstNews.value as any).releaseDateDate}
              </div>
              <div class="font-bold text-base font-color-colorTextWhite truncate">
                {(firstNews.value as any).title}
              </div>
            </div>
            {arrNews.value.map((item, index) => (
              <div
                class="background-colorBgLayout p-4 mb-2"
                onClick={() => {
                  handleArticleDetail(item)
                }}
              >
                <div class="line-clamp-2 font-bold text-base font-color-colorText mb-3">
                  {(item as any).title}
                </div>
                <div class="line-clamp-3 font-h5 font-color-colorTextSecondary mb-4">
                  {(item as any).label}
                </div>
                <div class="flex justify-between items-center">
                  <div class="font-h6 font-color-colorTextSecondary">
                    {(item as any).releaseDateYear}.{(item as any).releaseDateMonth}.
                    {(item as any).releaseDateDate}
                  </div>
                  <img class="w-5 h-5" src={iconRightGray} />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
                class="news-item bg-gray-100 flex flex-col justify-between"
                onClick={() => {
                  handleArticleDetail(firstNews.value)
                }}
              >
                <div class="ml-auto text-white w-104px h-94px flex flex-col justify-center pr-33px" style={{backgroundColor:"rgba(6,6,6,0.2)"}}>
                  <div class="font-h4 text-right">{(firstNews.value as any).releaseDateDate}</div>
                  <div class="font-h7 text-right">
                    {(firstNews.value as any).releaseDateMonth}.
                    {(firstNews.value as any).releaseDateYear}
                  </div>
                </div>
                <div class="font-h5 text-left text-white font-color-colorText truncate ml-8 mb-4">
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
                    <div class="news-item-title line-clamp-2 font-h6 mb-6">
                      {(item as any).title}
                    </div>
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
        )}
      </div>
    )
  }
})
