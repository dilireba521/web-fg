<template>
  <div
    class="cursor-pointer h-full flex justify-center items-center w-10 text-center hover:bg-dark/4"
  >
    <Dropdown :destroyPopupOnHide="true" v-model:visible="open">
      <div class="h-full flex justify-center items-center w-full">
        <Badge size="small" :count="countAll">
          <BellOutlined class="cursor-pointer" :style="{ fontSize: '24px' }" />
        </Badge>
      </div>

      <template  #overlay>
        <div class="notice-cont">
          <Tabs v-model:activeKey="activeKey" :tabBarGutter="24" size="small">
            <Tabs.TabPane v-for="item in tabs" :key="item.key">
              <template #tab>
                <Badge size="small" class="text-inherit" :count="item.count">{{
                  item.label
                }}</Badge>
              </template>
              <component :is="renderReview(item)"></component>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </template>
    </Dropdown>
  </div>
</template>
<script lang="tsx" setup>
import { ref, computed, watch } from 'vue'
import { Badge, Dropdown, Tabs, Empty } from 'ant-design-vue'
import { BellOutlined, RightOutlined } from '@ant-design/icons-vue'
import { useGo } from '@/hooks/web/usePage'
import { useNoticeCategory } from '@/utils/options/useBasicOptions'
import { useGetNotice } from '@/api/notice'
import { useUserStore } from '@/store/modules/user'
import { BasicSkeleton } from '@/components/skeleton'

const userStore = useUserStore()

const open = ref(false)
const { options } = useNoticeCategory()
const { go } = useGo()
const activeKey = ref()
const tabs = computed(() => {
  const noticeNotRead = userStore.getUserInfo?.noticeNotRead || []
  return options.value?.map((item) => {
    const _item = noticeNotRead.find((notice) => notice.categoryId == item.value)
    return {
      label: item.label,
      key: item.value,
      count: _item?.count || 0
    }
  })
})
// 通知数据列表数据-字典格式
const noticeMap = ref<any>({})
watch(
  tabs,
  (cur) => {
    if (cur?.length && !activeKey.value) {
      activeKey.value = cur[0].key
    }
  },
  { immediate: true }
)
const countAll = computed(() => {
  return tabs.value?.reduce((pre, cur) => {
    return pre + cur.count
  }, 0)
})
function jump(params?: any) {
  go({
    path: '/mail',
    query: params
  })
}
watch(activeKey, (cur) => {
  useGetNoticeFn({ categoryId: cur, isRead: 0, pageSize: 5 })
})
watch(()=> countAll.value,()=>{
  useGetNoticeFn({ categoryId: activeKey.value, isRead: 0, pageSize: 5 })
})
async function useGetNoticeFn(params: any) {
  const { data } = await useGetNotice(params)
  if (data.value?.retCode == 0) {
    noticeMap.value[params.categoryId] = data.value?.data
  }
  // console.log('useGetNoticeFn----', data)
}

// 申赎审核
function renderReview(params: any) {
  const _data = noticeMap.value[params.key]
  // console.log("renderReview----", _data);

  return (
    <div>
      <div class="h-270px overflow-auto">
        <BasicSkeleton
          paragraph={{ rows: 6 }}
          emptyProps={{
            description: '暂无消息'
          }}
          loading={!Array.isArray(_data) && !_data?.length}
          showEmpty={!_data?.length}
        >
          {_data?.map((item: any, index: number) => {
            return (
              <div
                onClick={() => jump({ activeKey: params.key, id: item?.id })}
                class="list-item  text-black/65 hover:text-black/88  cursor-pointer"
              >
                <div class="flex-1 truncate mr-4">{item?.title}</div>
                <div class="text-black/45">{item?.createTime}</div>
              </div>
            )
          })}
        </BasicSkeleton>
      </div>
      <div class="flex justify-between items-center h-54px w-full text-black/25 ">
        <div class="cursor-pointer hover:text-black/88">{/* 全部已读 */}</div>
        <div
          onClick={() => jump({ activeKey: params.key })}
          class="cursor-pointer hover:text-black/88"
        >
          查看全部
          <RightOutlined />
        </div>
      </div>
    </div>
  )
}
</script>
<style lang="less" scoped>
.notice-cont {
  width: 480px;
  height: 380px;
  padding: 8px 16px;
  border-radius: 2px;
  background-color: @colorBgBase;
  box-shadow:
    0px 5px 12px 4px rgba(0, 0, 0, 0.09),
    0px 3px 6px 0px rgba(0, 0, 0, 0.12),
    0px 1px 2px -2px rgba(0, 0, 0, 0.16);
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 54px;
  border-bottom: 1px solid @colorBgModule;
}
</style>
