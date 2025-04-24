import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import * as userApi from '@/api/user'
import { WEB_BG_HEAD } from '@/utils/resources'
import { useScreenStore } from '@/store/modules/screen'
import './index.less'
import { Breadcrumb } from 'ant-design-vue'
import { useGo } from '@/hooks/web/usePage'

export default defineComponent({
  setup(props, ctx) {
    const { go } = useGo()
    const dataPosition = ref({})
    const screenStore = useScreenStore()
    const handleHireDetail = () => {
      let data = localStorage.getItem('currentHireDetail')
      let dataJobs = JSON.parse(data || '{}')
      let content = dataJobs.content
      // 使用正则表达式为p标签添加类名
      content = content.replace(
        /<span style="font-size:14px">/g,
        '<span class="mb-8px font-h7 font-color-colorTextSecondary">'
      )
      content = content.replace(
        /<span style="font-size:20px">/g,
        '<span class="mb-4 font-h5 font-color-colorText font-medium">'
      )
      dataJobs.content = content
      console.log('职位详情页数据', dataPosition.value)
      dataPosition.value = dataJobs
    }

    onMounted(() => {
      handleHireDetail()
    })
    return () => (
      <div>
        {screenStore.isMobile ? (
          <div class="w-full px6 pt-10 pb-6 background-colorBgLayout">
            <div class="font-h1 text-black font-medium mb-2">
              {(dataPosition.value as { title?: string })?.title || ''}
            </div>
            <div class="flex">
              <div class="hire-detail-label px-3 font-h6 text-centen">
                {(dataPosition.value as { label?: string })?.label || ''}
              </div>
              <div class="hire-detail-label px-3 font-h6 text-centen ml-2">
                {(dataPosition.value as { category?: { title: string } })?.category?.title || ''}
              </div>
            </div>
          </div>
        ) : (
          <div
            class="w-full h-80 bg-cover px-80 pt-20 bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${WEB_BG_HEAD}/head-recruit.png)` }}
          >
            <div class="font-h2 text-black font-medium mb-4">
              {(dataPosition.value as { title?: string })?.title || ''}
            </div>
            <div class="mb-6 flex">
              <div class="hire-detail-label px-4 py-5px font-h7 text-centen">
                {(dataPosition.value as { label?: string })?.label || ''}
              </div>
              <div class="hire-detail-label px-4 py-5px font-h7 text-centen ml-4">
                {(dataPosition.value as { category?: { title: string } })?.category?.title || ''}
              </div>
            </div>
            <div class="font-h7 font-color-colorTextSecondary">
              {(dataPosition.value as { remark?: string })?.remark || ''}
            </div>
          </div>
        )}
        {screenStore.isMobile ? null : (
          <div class="w-full h-16 px-85 pt-6 pb-18px background-colorBgLayout news-tab font-h7 font-color-colorTextTertiary">
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
                    go('/hire')
                  }}
                >
                  招贤纳士
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>招聘信息</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        )}
        {screenStore.isMobile ? (
          <div
            class="w-full px-6 pb-8 background-colorBgLayout"
            style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}
          >
            <div class="w-full background-white px-4 py-6">
              <div v-html={(dataPosition.value as { content?: string })?.content || ''}></div>
            </div>
          </div>
        ) : (
          <div class="w-full background-colorBgLayout px-80 pb-12">
            <div class="w-full background-white p-12">
              <div v-html={(dataPosition.value as { content?: string })?.content || ''}></div>
            </div>
          </div>
        )}
      </div>
    )
  }
})
