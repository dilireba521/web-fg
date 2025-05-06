<template>
  <div class="w-936px m-auto pt-16">
    <Tabs :tabBarGutter="24" size="small">
      <Tabs.TabPane key="1">
        <template #tab
          ><Badge size="small" class="text-inherit" :count="6">申赎审核</Badge></template
        >
        <Review></Review>
      </Tabs.TabPane>
      <Tabs.TabPane key="2" tab="基金报告">
        <Review></Review>
      </Tabs.TabPane>
      <Tabs.TabPane key="3" tab="公告通知">
        <Review></Review>
      </Tabs.TabPane>
    </Tabs>
  </div>
</template>
<script lang="jsx" setup>
import { ref } from 'vue'
import { Badge, Tabs, Empty } from 'ant-design-vue'
import { Review } from './components/modules'
const tabs = ref([
  { label: '申赎审核', key: '1', count: 6 },
  { label: '基金报告', key: '2', count: 0 },
  { label: '公告通知', key: '3', count: 0 }
])
</script>
