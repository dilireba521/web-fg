import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import * as userApi from '@/api/user'
import { WEB_BG_HEAD } from '@/utils/resources'
import"./index.less"

export default defineComponent({
  setup(props, ctx) {
    const dataPosition = ref({})

    const handleHireDetail = () => {
      let data = localStorage.getItem('currentHireDetail')
      let dataJobs = JSON.parse(data || '{}')
      let content = dataJobs.content;
            // 使用正则表达式为p标签添加类名
            content = content.replace(/<span style="font-size:14px">/g, '<span class="mb-8px font-h7 font-color-colorTextSecondary">');
            content = content.replace(/<span style="font-size:20px">/g, '<span class="mb-4 font-h5 font-color-colorText font-medium">');
            dataJobs.content = content;
      console.log('职位详情页数据', dataPosition.value)
      dataPosition.value = dataJobs
    }

    onMounted(() => {
      handleHireDetail()
    })
    return () => (
      <div>
        <div class="w-full h-80 bg-cover px-80 pt-20 bg-center bg-no-repeat" style={{ backgroundImage: `url(${WEB_BG_HEAD}/head-recruit.png)` }}>
          <div class="font-h2 text-black font-medium mb-4">{((dataPosition.value as { title?: string })?.title) || ''}</div>
          <div class="mb-6 flex">
            <div class="hire-detail-label px-4 py-5px font-h7 text-centen">{((dataPosition.value as { label?: string })?.label) || ''}</div>
            <div class="hire-detail-label px-4 py-5px font-h7 text-centen ml-4">{((dataPosition.value as { category?: { title: string } })?.category?.title) || ''}</div>
          </div>
          <div class="font-h7 font-color-colorTextSecondary">{((dataPosition.value as { remark?: string })?.remark) || ''}</div>
        </div>
        <div class="w-full background-colorBgLayout px-80 pt-12">
          <div class="w-full background-white p-12">
            <div v-html={((dataPosition.value as { content?: string })?.content) || ''}></div>
          </div>
        </div>
      </div>
    )
  }
})
