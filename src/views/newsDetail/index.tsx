import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
export default defineComponent({
  setup(props, ctx) {
    const dataArticle = ref({})

    const handleArticleDetail = async () => {
      let data = localStorage.getItem('currentArticleDetail')
      dataArticle.value = JSON.parse(data || '{}')
    }

    onMounted(() => {
      handleArticleDetail()
    })

    return () => (
      <div>
        <div class="w-full h-16 px-85 pt-6 pb-18px background-colorBgLayout news-tab font-h7 font-color-colorTextTertiary">
          首页 / 新闻信息 / 投资观察 / 文章详情
        </div>
        <div class="w-full px-120 pt-24 pb-94px background-white">
          <div class="w-full mb-16">
          <div class="font-h3 font-medium mb-6 pb-4" style={{ borderBottom: '1px solid #000000'}}>
              {(dataArticle.value as any).title}
            </div>
            <div class="mb-4 font-h7 font-color-colorTextSecondary">
              {(dataArticle.value as any).releaseDateYear}.
              {(dataArticle.value as any).releaseDateMonth}.
              {(dataArticle.value as any).releaseDateDate}
            </div>
          </div>
          <div v-html={(dataArticle.value as any).content}></div>
        </div>
      </div>
    )
  }
})
