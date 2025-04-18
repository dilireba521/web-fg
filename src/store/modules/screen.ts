import { defineStore } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'

// 定义屏幕尺寸断点
export const enum ScreenSize {
  XS = 'xs', // 超小屏幕 (手机竖屏)
  SM = 'sm', // 小屏幕 (手机横屏)
  MD = 'md', // 中等屏幕 (平板)
  LG = 'lg', // 大屏幕 (桌面)
  XL = 'xl' // 超大屏幕
}

// 定义断点宽度
const breakpoints = {
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1600
}

export const useScreenStore = defineStore('screen', () => {
  // 当前屏幕尺寸
  const screenSize = ref<ScreenSize>(ScreenSize.LG)
  // 是否为移动设备
  const isMobile = ref(false)
  // 屏幕宽度
  const screenWidth = ref(window.innerWidth)
  // 屏幕高度
  const screenHeight = ref(window.innerHeight)

  // 更新屏幕尺寸信息
  const updateScreenSize = () => {
    // 使用视口宽度而不是窗口宽度
    screenWidth.value = document.documentElement.clientWidth || window.innerWidth
    screenHeight.value = document.documentElement.clientHeight || window.innerHeight
    // 根据宽度判断当前屏幕尺寸
    if (screenWidth.value < breakpoints.xs) {
      screenSize.value = ScreenSize.XS
    } else if (screenWidth.value < breakpoints.sm) {
      screenSize.value = ScreenSize.SM
    } else if (screenWidth.value < breakpoints.md) {
      screenSize.value = ScreenSize.MD
    } else if (screenWidth.value < breakpoints.lg) {
      screenSize.value = ScreenSize.LG
    } else {
      screenSize.value = ScreenSize.XL
    }

    // 判断是否为移动设备
    isMobile.value = screenWidth.value < breakpoints.md
  }

  // 初始化
  const init = () => {
    // 立即更新一次
    updateScreenSize()

    // 添加各种事件监听
    window.addEventListener('resize', updateScreenSize)
    window.addEventListener('orientationchange', updateScreenSize)

    // 在 DOMContentLoaded 后再次更新，确保获取正确的尺寸
    if (document.readyState !== 'loading') {
      setTimeout(updateScreenSize, 100)
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(updateScreenSize, 100)
      })
    }
  }

  // 清理
  const cleanup = () => {
    window.removeEventListener('resize', updateScreenSize)
    window.removeEventListener('orientationchange', updateScreenSize)
  }

  return {
    screenSize,
    isMobile,
    screenWidth,
    screenHeight,
    init,
    cleanup
  }
})
