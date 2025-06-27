<template>
  <div class="h-14 w-full"></div>
  <div :style="headerStyle" :class="['header min-w-1480px', { black: tabType == 'black' }]">
    <img @click="go('/')" :src="LogoImg" alt="logo" class="absolute left-10 top-3 w-24 cursor-pointer" />
    <div class="container flex justify-center items-center">
      <TabsVue :list="items" v-model:active="selectedKey" :type="tabType" @change="change"></TabsVue>
    </div>
    <div class="absolute right-0 pr-6 top-0 h-14 flex items-center ">
      <!-- 通知 -->
      <NoticeVue></NoticeVue>
      <!-- 用户 -->
      <UserVue></UserVue>
    </div>

  </div>
  <!-- 面包屑 -->
  <BreadCrumbVue :breadcrumb="breadcrumb"></BreadCrumbVue>
</template>
<script lang="ts" setup>
import { watch, ref, nextTick, onMounted, onUnmounted } from 'vue'
import TabsVue from './components/tabs/index.vue'
import { useGo } from '@/hooks/web/usePage'
import { useRoute, useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { routebasicModuleList } from '@/router/routes'
import LogoImg from '@/assets/icons/logo.svg'
import BreadCrumbVue from './components/breadcrumb.vue'
import NoticeVue from './components/notice.vue'
import UserVue from './components/user.vue'

const { go } = useGo()

const route = useRoute()
const router = useRouter()

const breadcrumb = ref()
const items = ref()
const selectedKey = ref()
const tabType = ref('black')
const headerStyle = ref({})
const isScrollDown = ref(true)

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
          // console.log('item===', item)

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
// 更新导航栏样式的函数
function updateHeaderStyle(scrollTop = 0) {
  let _style = {}
  if (scrollTop <= 1) {
    isScrollDown.value = true
    _style = {
      position: 'absolute'
    }
  } else {
    isScrollDown.value = false
    _style = {
      transform: 'translateY(0px)',
      position: 'fixed'
    }
  }
  headerStyle.value = _style
}
function handleWheel(e: WheelEvent) {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  let _style = {}
  if (scrollTop <= 1) {
    isScrollDown.value = true
    _style = {
      position: 'absolute'
    }
  } else {
    if (e.deltaY > 0) {
      _style = {
        position: 'fixed',
        transform: 'translateY(-56px)',
        display: isScrollDown.value ? 'none' : 'block'
      }
    } else {
      isScrollDown.value = false
      _style = {
        transform: 'translateY(0px)',
        position: 'fixed'
      }
    }
  }
  headerStyle.value = _style
}
// 监听路由变化
router.afterEach((to, from) => {
  // 路由变化后，重置导航栏样式
  nextTick(() => {
    // 确保DOM已更新
    setTimeout(() => {
      updateHeaderStyle(0)
    }, 100)
  })
})

onMounted(() => {
  // 初始化时设置正确的样式
  updateHeaderStyle(window.pageYOffset || document.documentElement.scrollTop)
   // 桌面设备添加滚轮事件监听
   document.addEventListener('wheel', handleWheel)
})
onUnmounted(() => {
  // 移除滚轮事件监听
  document.removeEventListener('wheel', handleWheel)
})
</script>
<style lang="less" scoped>
.header {
  height: 56px;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  z-index: 999;
  transition: all 0.2s linear;

  &.black {
    background: rgba(255, 255, 255, 0.8);
  }
}
</style>
