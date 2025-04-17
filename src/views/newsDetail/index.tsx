import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { Breadcrumb } from 'ant-design-vue'
import { useGo } from '@/hooks/web/usePage'
import { useRoute } from 'vue-router'
export default defineComponent({
  setup(props, ctx) {
    const { go } = useGo()
    const route = useRoute()
    const dataArticle = ref({})
    const sourcePage = ref('')

    const handleArticleDetail = async () => {
      let data = localStorage.getItem('currentArticleDetail')
      dataArticle.value = JSON.parse(data || '{}')
    }

    onMounted(() => {
      handleArticleDetail()
      if (route.query.source) {
        sourcePage.value = route.query.source as string
      }
    })

    return () => (
      <div>
        <div class="w-full h-16 px-85 pt-6 pb-18px background-colorBgLayout news-tab font-h7 font-color-colorTextTertiary">
          {/* 首页 / 新闻信息 / 投资观察 / 文章详情 */}
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
                新闻信息
              </a>
            </Breadcrumb.Item>
            {sourcePage.value == 'annuncement' ? (
              <Breadcrumb.Item>
                <a
                  onClick={() => {
                    go('/announcement')
                  }}
                >
                  资讯公告
                </a>
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item>
                <a
                  onClick={() => {
                    go('/reportPage')
                  }}
                >
                  投资观察
                </a>
              </Breadcrumb.Item>
            )}
            <Breadcrumb.Item>文章详情</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div class="w-full px-120 pt-24 pb-94px background-white">
          <div class="w-full mb-16">
            <div
              class="font-h3 font-medium mb-6 pb-4"
              style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}
            >
              <div>{(dataArticle.value as any).title}</div>
              <div class="mt-6 font-h7 font-color-colorTextSecondary">
                {(dataArticle.value as any).releaseDateYear}.
                {(dataArticle.value as any).releaseDateMonth}.
                {(dataArticle.value as any).releaseDateDate}
              </div>
            </div>
          </div>
          <div v-html={(dataArticle.value as any).content}></div>
        </div>
      </div>
    )
  }
})
