<script setup lang="ts">
import { KeepAlive } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
const colorMap = {
  colorPrimary: '#C1272D',
  colorBgElevated: '#F5F5F5FF',
  paddingMD: 16,
  paddingContentHorizontalLG: 16,
}

const themeConfig: ThemeConfig = {
  token: {
    fontFamily: 'MiSans',
    colorPrimary: colorMap.colorPrimary,
    borderRadius: 4
  },
  components: {
    List: {
      colorSplit: '#00000014'
    },
    Modal: {
      paddingMD: colorMap.paddingMD,
      paddingContentHorizontalLG: colorMap.paddingContentHorizontalLG,
      colorBgElevated: colorMap.colorBgElevated
    }
  }
}
</script>

<template>
  <ConfigProvider :locale="zhCN" :autoInsertSpaceInButton="false" :theme="themeConfig">
    <RouterView />
    <!-- <RouterView>
      <template #default="{ Component, route }">
        <transition name="fade-slide" mode="out-in" appear>
          <KeepAlive v-if="route.meta?.keepAlive">
            <component :is="Component" :key="route.fullPath" />
          </KeepAlive>
          <component v-else :is="Component" :key="route.fullPath" />
        </transition>
      </template>
    </RouterView> -->
  </ConfigProvider>
</template>
