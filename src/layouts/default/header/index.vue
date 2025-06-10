<template>
  <div :class="['header', { black: tabType == 'black' }]">
    <img :src="LogoImg" alt="logo" class="absolute left-10 top-3 w-24" />
    <div class="container flex justify-center items-center">
      <TabsVue
        :list="items"
        v-model:active="selectedKey"
        :type="tabType"
        @change="change"
      ></TabsVue>
    </div>
    <div class="absolute right-6 top-0 h-14 flex items-center">
      <!-- 通知 -->
      <NoticeVue></NoticeVue>
    </div>
    
  </div>
  <!-- 面包屑 -->
  <BreadCrumbVue :breadcrumb="breadcrumb"></BreadCrumbVue>
</template>
<script lang="ts" setup>
import { watch, ref } from 'vue'
import TabsVue from './components/tabs/index.vue'
import { useGo } from '@/hooks/web/usePage'
import { useRoute } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { routebasicModuleList } from '@/router/routes'
import LogoImg from '@/assets/icons/logo.svg'
import BreadCrumbVue from './components/breadcrumb.vue'
import NoticeVue from './components/notice.vue'

const { go } = useGo()

const route = useRoute()
const breadcrumb = ref()
const items = ref()
const selectedKey = ref()
const tabType = ref('black')

const itemsFn = () => {
  return sortRoutes(routebasicModuleList).map((item) => {
    return {
      ...item,
      label: item.meta?.title || item.path,
      value: item.redirect || item.path
    }
  })
}
watch(
  () => route.path,
  () => {
    const _len = route.matched?.length
    const _item = route.matched[_len - 1]
    const { matched } = route
    console.log('matched===', matched)
    if (matched[_len - 1].meta.parentPath) {
      breadcrumb.value = matched
        .filter((item) => !item.meta?.nobBreadcrumb)
        .map((item) => {
          console.log('item===', item)

          return {
            title: item.meta.title,
            path: item.path
          }
        })
    } else {
      breadcrumb.value = []
    }
    selectedKey.value = _item.meta?.active || _item.path
    items.value = itemsFn()
  },
  { immediate: true }
)

// watch(() => selectedKey.value, (val) => {
//     tabType.value = val == '/home/index' ? 'default' : 'black'
// }, { immediate: true })
console.log('header==')

function change(params: any) {
  // 如发现导航样式回选，可以写个定时器，延时对selectedKey赋值
  go({
    path: params
  })
}
// 排序
function sortRoutes(routes: RouteRecordRaw[]) {
  return routes.sort((a: RouteRecordRaw, b: RouteRecordRaw) => {
    if (a.meta?.orderNo && b.meta?.orderNo) {
      // @ts-ignore
      return a.meta?.orderNo - b.meta?.orderNo
    } else if (a.meta?.orderNo) {
      return -1
    } else if (b.meta?.orderNo) {
      return 1
    } else {
      return 0
    }
  })
}
</script>
<style lang="less" scoped>
.header {
  height: 56px;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0px 1px 0px 0px rgba(0,0,0,0.1);
  &.black {
    background: rgba(255, 255, 255, 0.8);
  }
}
</style>
