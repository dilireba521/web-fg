import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { Breadcrumb } from 'ant-design-vue'
import { useGo } from '@/hooks/web/usePage'
import { useRoute } from 'vue-router'
import { useScreenStore } from '@/store/modules/screen'
export default defineComponent({
  setup(props, ctx) {
    const screenStore = useScreenStore()
    const { go } = useGo()
    const route = useRoute()
    const dataArticle = ref({})
    const sourcePage = ref('')
    const articleType = ref('')

    const handleArticleDetail = async () => {
      let data = JSON.parse(localStorage.getItem('currentArticleDetail') || '{}')
      let content = data.content
      content = content.replace(/<img/g, '<img class="w-full" style="width: 100%; height: auto" ')
      data.content = content
      articleType.value = data.category.id
      dataArticle.value = data
    }

    onMounted(() => {
      handleArticleDetail()
      if (route.query.source) {
        sourcePage.value = route.query.source as string
      }
    })

    return () => (
      <div>
        <div
          class={`w-full background-colorBgLayout news-tab font-h7 font-color-colorTextTertiary`}
        >
          <div
            class={`max-w-480 mx-auto ${screenStore.isMobile ? 'px-8 py-4' : 'h-16 px-80 pt-6 pb-18px'}`}
          >
            {/* 首页 / 新闻信息 / 投资观察 / 文章详情 */}
            <Breadcrumb>
              <Breadcrumb.Item>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setTimeout(() => {
                      go('/home');
                    }, 50);
                  }}
                >
                  首页
                </a>
              </Breadcrumb.Item>
              {sourcePage.value !== 'home' && (
                <Breadcrumb.Item>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setTimeout(() => {
                        go('/news');
                      }, 50);
                    }}
                  >
                    信息资讯
                  </a>
                </Breadcrumb.Item>
              )}
              {sourcePage.value == 'report' || sourcePage.value == 'annuncement' ? (
                articleType.value == '3' ? (
                  <Breadcrumb.Item>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setTimeout(() => {
                          go('/announcement');
                        }, 50);
                      }}
                    >
                      资讯公告
                    </a>
                  </Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setTimeout(() => {
                          go('/reportPage');
                        }, 50);
                      }}
                    >
                      投资观察
                    </a>
                  </Breadcrumb.Item>
                )
              ) : null}
              <Breadcrumb.Item>文章详情</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div class="w-full background-white">
          <div
            class={`${screenStore.isMobile ? 'px-6 pt-10 pb-8' : 'px-120 pt-24 pb-94px max-w-480 mx-auto'}`}
          >
            <div class={`w-full ${screenStore.isMobile ? '' : 'mb-16'}`}>
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
            <div
              class={`${screenStore.isMobile ? 'rich-text-mobile' : 'rich-text-style '}`}
              v-html={(dataArticle.value as any).content}
            ></div>
          </div>
        </div>
      </div>
    )
  }
})
