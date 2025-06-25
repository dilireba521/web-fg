import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGetNewsInfo, usePostNewsInfo } from '@/api/news'
import { formatToDateTime } from '@/utils/dateUtil'
import { BasicSkeleton } from '@/components/skeleton'

export default defineComponent({
  setup() {
    const route = useRoute()
    const loading = ref(true)
    const record = ref()
    async function useGetNewsInfoFn() {
      try {
        const { data } = await useGetNewsInfo({ id: route?.query?.id })
        if (data.value?.retCode == 0) {
          record.value = data.value?.data
        }
        // console.log(data.value)
      } finally {
        loading.value = false
      }
    }
    async function usePostNewsInfoFn() {
      try {
        const { data } = await usePostNewsInfo({ id: route?.query?.id })
        // console.log(data.value)
      } catch (error) {}
    }
    onMounted(() => {
      usePostNewsInfoFn()
      useGetNewsInfoFn()
    })
    return () => {
      return (
        <div class="w-960px m-auto  min-h-100">
          <BasicSkeleton loading={loading.value} paragraph={{rows: 10}}>
            <div class="mt-[96px] text-32px font-500">{record.value?.title}</div>
            <div class="mt-6 pb-4 color-secondary font-h7 flex items-center border-b border-b-solid border-b-black/3">
              <div>{record.value?.releaseTime && formatToDateTime(record.value?.releaseTime)}</div>
            </div>
            <div class="mt-4 mb-15" v-html={record.value?.content}></div>
          </BasicSkeleton>
        </div>
      )
    }
  }
})
