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
        <div class="container min-h-100">
          <BasicSkeleton loading={loading.value} paragraph={{rows: 10}}>
            <div class="mt-[70px] text-2xl text-center">{record.value?.title}</div>
            <div class="mt-10 flex justify-center items-center">
              <div class="h-[1px] bg-white/10 flex-1 mr-2"></div>
              <div>{record.value?.releaseTime && formatToDateTime(record.value?.releaseTime)}</div>
            </div>
            <div class="mt-4 mb-15" v-html={record.value?.content}></div>
          </BasicSkeleton>
        </div>
      )
    }
  }
})
