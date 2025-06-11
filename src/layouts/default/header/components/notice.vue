<template>
  <div class="cursor-pointer h-full flex justify-center items-center w-10 text-center hover:bg-dark/4">
    <Dropdown>
      <div class="  h-full flex justify-center items-center w-full">
        <Badge size="small" :count="6">
        <BellOutlined class="cursor-pointer" :style="{ fontSize: '24px' }" />
      </Badge>
      </div>
     
      <template #overlay>
        <div class="notice-cont">
          <Tabs :tabBarGutter="24" size="small">
            <Tabs.TabPane key="1">
              <template #tab
                ><Badge size="small" class="text-inherit" :count="6">申赎审核</Badge></template
              >
              <component :is="renderReview()"></component>
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab="基金报告">
              <component :is="renderReview()"></component
            ></Tabs.TabPane>
            <Tabs.TabPane key="3" tab="公告通知">
              <component :is="renderReview()"></component
            ></Tabs.TabPane>
          </Tabs>
        </div>
      </template>
    </Dropdown>
  </div>
</template>
<script lang="jsx" setup>
import { ref } from 'vue'
import { Badge, Dropdown, Tabs, Empty } from 'ant-design-vue'
import { BellOutlined, RightOutlined } from '@ant-design/icons-vue'
import { useGo } from '@/hooks/web/usePage'

const { go } = useGo()
const tabs = ref([
  { label: '申赎审核', key: '1', count: 6 },
  { label: '基金报告', key: '2', count: 0 },
  { label: '公告通知', key: '3', count: 0 }
])
function jump(params) {
    go({
        path: '/mail'
    })
}
// 申赎审核
function renderReview() {
  return (
    <div>
      <div class="h-270px overflow-auto">
        <div onClick={jump} class="list-item  text-black/65 hover:text-black/88  cursor-pointer">
          <div class="flex-1 truncate">您的申购申请审核已通过通过…</div>
          <div class="text-black/45">2025-03-08</div>
        </div>
        <div class="list-item  text-black/65 hover:text-black/88  cursor-pointer">
          <div class="flex-1 truncate">您的申购申请审核已通过通过…</div>
          <div class="text-black/45">2025-03-08</div>
        </div>
        <div class="list-item  text-black/65 hover:text-black/88  cursor-pointer">
          <div class="flex-1 truncate">您的申购申请审核已通过通过…</div>
          <div class="text-black/45">2025-03-08</div>
        </div>
        <div class="list-item  text-black/65 hover:text-black/88  cursor-pointer">
          <div class="flex-1 truncate">您的申购申请审核已通过通过…</div>
          <div class="text-black/45">2025-03-08</div>
        </div>
        <div class="list-item  text-black/65 hover:text-black/88  cursor-pointer">
          <div class="flex-1 truncate">您的申购申请审核已通过通过…</div>
          <div class="text-black/45">2025-03-08</div>
        </div>
        {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty> */}
      </div>
      <div class="flex justify-between items-center h-54px w-full text-black/25 ">
        <div class="cursor-pointer hover:text-black/88">全部已读</div>
        <div class="cursor-pointer hover:text-black/88">
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
