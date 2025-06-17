import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGetNews, usePostNews } from '@/api/news'
import { formatToDateTime } from '@/utils/dateUtil'

export default defineComponent({
  setup() {
    const route = useRoute()
    
    const record = ref()
    async function useGetNewsFn() {
      try {
        const { data } = await useGetNews({id:route?.query?.id})
        if (data.value?.retCode == 0) {
          record.value = data.value?.data
        }
        // console.log(data.value)
      } catch (error) {}
    }
    async function usePostNewsFn() {
      try {
        const { data } = await usePostNews({id:route?.query?.id})
        // console.log(data.value)
      } catch (error) {}
    }
    onMounted(()=>{
      usePostNewsFn()
      useGetNewsFn()
    })
    return () => {
      return (
        <div class="container">
          <div class="mt-[70px] text-2xl text-center">{record.value?.title}</div>
          <div class="mt-10 flex justify-center items-center">
            <div class="h-[1px] bg-white/10 flex-1 mr-2"></div>
            <div class="text-white/60">
              {record.value?.createTime && formatToDateTime(record.value?.createTime)}
            </div>
          </div>
          <div class="mt-4 mb-15" v-html={record.value?.content}></div>
        </div>
      )
    }
  }
})
