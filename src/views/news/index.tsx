import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { WEB_BG_HEAD } from '@/utils/resources'
import './index.less'
import { SubTitle } from '@/components/Icon'

const arrNewsTitle = ref(['公司公告', '新闻资讯'])

export default defineComponent({
  components: {
    SubTitle
  },
  setup(props, ctx) {
    // 定义各个部分的ref引用
    const companyAnnouncementRef = ref(null)
    const informationRef = ref(null)

    // 当前激活的索引
    const activeIndex = ref(0)

    // 处理SubTitle点击事件
    const handleSubTitleClick = (index: number) => {
      const refs = [companyAnnouncementRef, informationRef]
      if (refs[index]?.value) {
        (refs[index].value as HTMLElement).scrollIntoView({ behavior: 'smooth' })
      }
    }

    // 监听滚动事件，更新activeIndex
    const handleScroll = () => {
      const refs = [companyAnnouncementRef, informationRef]
      const scrollPosition = window.scrollY + 500// 添加一些偏移量，使切换更自然
      
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
    
    // 组件挂载时添加滚动监听
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      // 初始化时执行一次，确保初始状态正确
      handleScroll()
    })
    
    // 组件卸载时移除滚动监听
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return () => (
      <div>
        <div class="w-full h-120">
          <img class="w-full h120" src={`${WEB_BG_HEAD}/head-news.jpg`} />
        </div>
        <SubTitle arrTitle={arrNewsTitle.value} activeIndex={activeIndex.value} onItemClick={handleSubTitleClick} />
        <div ref={companyAnnouncementRef} id="company-announcement" class="w-full h-618px px-80 py-24 bg-gray-100">
          <div class="mb-12 flex justify-between items-baseline">
            <div class="font-h3 font-bold text-black">公司公告</div>
            <div class="flex">
                <div class="font-h7 text-black/45 mr-9px">查看全部</div>
                <div class="font-h7 text-black/45">{'>'}{'>'}{'>'}</div>
            </div>
          </div>
          <div class="w-full flex flex-wrap justify-between">
            {
              Array.from({ length: 4 }).map((item, index) => (
                <div class="news-item bg-white px-8 py-6 h-40 mb-4 flex">
                    <div class="h-112px w-110px flex pr-8" style={{ borderRight: '1px solid #979797'}}>
                        <div class="font-h4 font-bold mr-2px">18</div>
                        <div class="font-h4 font-bold mr-1" style={{ color: 'rgba(0,0,0,0.65)' }}>/</div>
                        <div class="font-h7" style={{ color: 'rgba(0,0,0,0.65)' }}>
                            <div>03月</div>
                            <div>2025</div>
                        </div>
                    </div>
                    <div class="flex-1 pl-8 overflow-hidden">
                        <div class="truncate font-bold mb-2 font-h6 w-full">敬告投资者书敬告投资者书敬告投资者书敬告投资者书敬告投资者书敬告投资者书敬告投资者书</div>
                        <div class="line-clamp-2 text-black/70 mb-4 font-h7 w-full overflow-hidden" style={{ 
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>尊敬的投资者:深圳正圆投资有限公司（以下简称"我司"）成立于2015年，一直秉持"守正、圆融、合作、共赢"的经营理念
                        尊敬的投资者:深圳正圆投资有限公司（以下简称"我司"）成立于2015年，一直秉持"守正、圆融、合作、共赢"的经营理念</div>
                        <div class="font-h8" style={{ color: '#C1272D' }}>查看详情</div>
                    </div>
                </div>
              )) 
            }
          </div>
        </div>
        <div ref={informationRef} id="information" class="w-full h-602px px-80 py-24 bg-white">
          <div class="mb-12 flex justify-between items-baseline">
            <div class="font-h3 font-bold text-black">新闻资讯</div>
            <div class="flex">
                <div class="font-h7 text-black/45 mr-9px">查看全部</div>
                <div class="font-h7 text-black/45">{'>'}{'>'}{'>'}</div>
            </div>
          </div>
          <div class="w-full flex justify-between h-80">
            <div class="news-item bg-gray-100 pt-6 pb-4 px-8 flex flex-col justify-between">
                <div class="ml-auto text-white">
                    <div class="font-h4 text-right">18</div>
                    <div class="font-h7 text-right">2025.03</div>
                </div>
                <div class="font-h5 font-bold text-left text-white" style={{ color: 'rgba(255,255,255,0.88)' }}>敬告投资者书</div>
            </div>
            <div class="news-item bg-white flex justify-between">
                <div class="news-item h-full bg-gray-100 px-8 pt-6 pb-8 flex flex-col">
                    <div class="line-clamp-2 font-h6 font-bold mb-6">敬告投资者书敬告投资者书敬告投资者书敬告投资者书</div>
                    <div class="line-clamp-3 font-h7" style={{ color: 'rgba(0,0,0,0.65);' }}>
                        尊敬的投资者:深圳正圆投资有限公司（以下简称“我司”）成立于2015年，一直秉持“守正、圆融、合作、共赢”的经营理念…
                        尊敬的投资者:深圳正圆投资有限公司（以下简称“我司”）成立于2015年，一直秉持“守正、圆融、合作、共赢”的经营理念…
                        尊敬的投资者:深圳正圆投资有限公司（以下简称“我司”）成立于2015年，一直秉持“守正、圆融、合作、共赢”的经营理念…
                    </div>
                    <div class="mt-auto flex justify-between items-end">
                        <div>
                            <div class="font-h4 font-bold" style={{ color: 'rgba(255,255,255,0.88)' }}>18</div>
                            <div class="font-h7" style={{ color: 'rgba(0,0,0,0.65);' }}>2025.03</div>
                        </div>
                        <div>{'>'}{'>'}{'>'}</div>
                    </div>
                </div>
                <div class="news-item h-full bg-gray-100"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
