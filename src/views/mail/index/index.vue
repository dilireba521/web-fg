<template>
  <div class="w-936px min-h-120 m-auto pt-16 pb-10">
    <Tabs v-model:activeKey="activeKey" :tabBarGutter="24" size="small">
      <Tabs.TabPane v-for="item in tabs" :key="item.key">
        <template #tab>
          <Badge size="small" class="text-inherit" :count="item.count">{{ item.label }}</Badge>
        </template>
        <Review :categoryId="item.key"></Review>
      </Tabs.TabPane>
    </Tabs>
  </div>
</template>
<script lang="tsx" setup>
import { ref, computed, watch } from 'vue'
import { Badge, Tabs, Empty } from 'ant-design-vue'
import { Review } from './components/modules'
import { useNoticeCategory } from '@/utils/options/useBasicOptions'
import { useGetNotice } from '@/api/notice'
import { useUserStore } from '@/store/modules/user'
import { useGo } from '@/hooks/web/usePage'
import { useRoute } from 'vue-router'
import { nextTick } from 'vue'
const userStore = useUserStore()
const userInfo = userStore.getUserInfo
const route = useRoute()
const { options } = useNoticeCategory()

const activeKey = ref()
const tabs = computed(() => {
  const noticeNotRead = userStore.getUserInfo?.noticeNotRead || []
  return options.value?.map((item) => {
    const _item = noticeNotRead.find((notice) => notice.categoryId == item.value)
    return {
      label: item.label,
      key: item.value.toString(),
      count: _item.count || 0
    }
  })
})

watch(
  tabs,
  (cur) => {
    if (cur?.length && !activeKey.value) {
      activeKey.value = cur[0].key
    }
  },
  { immediate: true }
)

watch(() => route.query, (curV) => {
  if (curV?.activeKey && curV?.activeKey != activeKey.value) {
    nextTick(()=>{
      activeKey.value = curV?.activeKey
    })

  }
},{immediate: true})
</script>
