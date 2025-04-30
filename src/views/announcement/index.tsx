import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { WEB_BG_HEAD } from '@/utils/resources'
import * as userApi from '@/api/user'
import { useGo } from '@/hooks/web/usePage'
import { Breadcrumb } from 'ant-design-vue'
import { useScreenStore } from '@/store/modules/screen'
import './index.less'
// antd
import { Pagination } from 'ant-design-vue'

export default defineComponent({
  setup(props, ctx) {
    const { go } = useGo()
    const screenStore = useScreenStore()
    const arrAnnouncement = ref([])
    const current = ref(1)
    const pageSize = ref(10)
    const total = ref(0)

    const handleNewsInfo = async () => {
      try {
        // categoryId:2 新闻资讯, categoryId:3 公司公告
        const res = await userApi.useGetNewsInfo({
          categoryId: 3,
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
          arrAnnouncement.value = data.data
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
      go(`/newsDetail?source=annuncement`)
    }

    onMounted(() => {
      handleNewsInfo()
    })

    return () => (
      <div>
        {!screenStore.isMobile && (
          <div
            class="w-full h-80 px-80 py-134px bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${WEB_BG_HEAD}/head-information.png)` }}
          ></div>
        )}
        <div
          class={`w-full h-16 ${screenStore.isMobile ? 'px-6 pt-6' : 'px-85 pt-6 announcement-tab'} pb-18px background-colorBgLayout font-h7 font-color-colorTextTertiary`}
        >
          {/* 首页 / 新闻信息 / 资讯公告 */}
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
            <Breadcrumb.Item>资讯公告</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        {screenStore.isMobile ? (
          <div class="px-6 pb-30px background-colorBgLayout">
            {arrAnnouncement.value.map((item, index) => (
              <div
                class="p-4 background-white flex flex-col mb-2 min-h-144px p-4"
                onClick={() => {
                  handleArticleDetail(item)
                }}
              >
                <div>
                  <div class="text-base font-bold font-color-colorBlack">{(item as any).title}</div>
                  <div class="font-h5 font-color-colorTextSecondary">{(item as any).label}</div>
                </div>
                <div class="flex justify-between mt-auto">
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
          <div class="w-full min-h-100vh px-120 pt-12 pb-8 background-colorBgLayout flex flex-col">
            <div class="font-h4 font-medium mb-6">资讯公告</div>
            <div class="flex-1">
              {arrAnnouncement.value.map((item, index) => (
                <div
                  class="announcement-item bg-white px-8 py-6 h-40 mb-4 flex"
                  onClick={() => {
                    handleArticleDetail(item)
                  }}
                >
                  <div
                    class="h-112px w-110px flex flex-col justify-center pr-8"
                    style={{ borderRight: '1px solid rgba(0, 0, 0, 0.1)' }}
                  >
                    <div class="flex items-start">
                      <div class="font-h4 mr-2px font-color-colorText">
                        {(item as any).releaseDateDate}
                      </div>
                      <div class="font-h4 mr-1 font-color-colorTextSecondary">/</div>
                      <div class="font-h7 font-color-colorTextSecondary">
                        <div>{(item as any).releaseDateMonth}月</div>
                        <div>{(item as any).releaseDateYear}</div>
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 pl-8 overflow-hidden flex flex-col">
                    <div class="announcement-item-title truncate mb-2 font-h6 w-full font-color-colorText">
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
                    <div class="font-h8 mt-auto" style={{ color: '#C1272D' }}>
                      查看详情
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div
          class={`flex justify-end background-colorBgLayout pb-8 ${screenStore.isMobile ? 'px-8' : 'px-120'}`}
        >
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
    )
  }
})
